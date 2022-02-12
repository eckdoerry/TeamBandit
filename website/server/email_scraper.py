# IMPORTS
from email.header import Header
import imaplib
import email
from inspect import Attribute
from operator import methodcaller
import psycopg2
import re
import time
import os
from dotenv import load_dotenv
from datetime import datetime
from email_reply_parser import EmailReplyParser


#####################
### MAIN FUNCTION ###
#####################
def main():
    # LOAD ENV VARS
    load_dotenv()

    # INFINITE LOOP
    while True:
        checkMail()
        time.sleep(60)


########################
### HELPER FUNCTIONS ###
########################
""" 
FUNCTION NAME: checkMail()
FUNCTION DESCRIPTION: logs into email server using email username and password provided
in .env file, then calls helper functions to parse emails and put them into DB
INPUT: N/A
OUTPUT: N/A
"""


def checkMail():
    # ACC CREDENTIALS FROM .ENV FILE
    username = os.getenv("EMAIL_USERNAME")
    password = os.getenv("EMAIL_KEY")

    # CREATE AN IMAP4 SERVER
    gmail_host = "imap.gmail.com"

    # SET CONNECTION
    mail = imaplib.IMAP4_SSL(gmail_host)

    # LOGIN
    mail.login(username, password)

    # SELECT INBOX
    mail.select("INBOX")

    # SELECT SPECIFIC EMAILS
    _, selected_mails = mail.search(None, "UNSEEN")

    # TOTAL NUMBER OF UNSEEN MAILS
    print("Total Unread Messages:", len(selected_mails[0].split()))

    for num in selected_mails[0].split():
        _, data = mail.fetch(num, "(RFC822)")
        _, bytes_data = data[0]

        # CONVERT THE BYTE INTO MESSAGE
        email_message = email.message_from_bytes(bytes_data)

        # CHECK TO SEE IF EMAIL IS FWDED
        if "Fwd:" in email_message["subject"]:
            values = formatForwardedEmail(email_message)
        else:
            values = formatEmail(email_message)

        executeQuery(values)


""" 
FUNCTION NAME: executeQuery()
FUNCTION DESCRIPTION: Connects to DB, established cursor, and executes insertion query loaded with
values passed in from caller
INPUT: Values to be input into messages table
OUTPUT: N/A
"""


def executeQuery(values):
    connection = psycopg2.connect(
        host="localhost",
        database="teambanditdb",
        user="quinnmelssen",
        password="ZeroTwo02!",
    )

    # SET UP CURSOR
    cur = connection.cursor()

    print(values)
    # CREATE QUERY STATEMENT
    query = "INSERT INTO messages (recipient, sender, subject, message, datetime) VALUES (%s, %s, %s, %s, %s)"

    # EXECUTE STRING QUERY WITH VALUES PASSED INTO FUNCTION
    cur.execute(query, values)

    # COMMIT ALL CHANGES
    connection.commit()


""" 
FUNCTION NAME: formatEmail()
FUNCTION DESCRIPTION: Formats email messages passed in by caller in order to get plaintext strings
for database insertion
INPUT: email_message in encoded format
OUTPUT: Values extracted from email (recipient, sender, subject, message, time)
"""


def formatEmail(email_message):
    # FORMAT EMAIL ADDRESSES IF FIRST/NAME INCLUDED
    if "<" in email_message["to"]:
        # PATTERN TO SEARCH FOR
        pattern = "\<(.+?)\>"
        # SET RECIPITENT
        recipient = re.search(pattern, email_message["to"]).group(1)

    if "<" in email_message["from"]:
        # PATTERN TO SEARCH FOR
        pattern = "\<(.+?)\>"
        # SET SENDER
        sender = re.search(pattern, email_message["from"]).group(1)

    # ACCESS MESSSAGE
    for part in email_message.walk():
        if (
            part.get_content_type() == "text/plain"
            or part.get_content_type() == "text/html"
        ):
            message = part.get_payload(decode=True).decode()
            break

    # FORMAT TIME
    time = email_message["date"]
    # CHECK FOR TIMEZONES
    if "-" in time:
        time = time.split(" -", 1)
        time = time[0]

    elif "+" in time:
        time = time.split(" +", 1)
        time = time[0]

    time = datetime.strptime(time, "%a, %d %b %Y %H:%M:%S")

    # GET SUBJECT
    subject = email_message["subject"]
    # PARSE OUT RE: FROM SUBJECT IN REPLY EMAILS
    subject = subject.replace("Re: ", "")

    # CHECK MESSAGE TO SEE IF ITS A REPLY
    message = EmailReplyParser.parse_reply(message)

    # RETURN VALUES FOR QUERY
    return [recipient, sender, subject, message, time]


""" FORWARDED EMAILS HAVE A DIFFERENT FORMAT THAN REGULAR EMAILS,
AND AS SUCH MUST BE PARSED DUE TO META INFORMATION (SENDER, RECIPIENT, ETC)
BEING IN MESSAGE BODY AND NOT HEADER"""


def formatForwardedEmail(email_message):
    # ACCESS MESSSAGE
    for part in email_message.walk():
        if (
            part.get_content_type() == "text/plain"
            or part.get_content_type() == "text/html"
        ):
            message = part.get_payload(decode=True).decode()
            break

    # PARSE MESSAGE BODY FOR EMAIL META INFORMATION
    # SPLIT EMAIL BODY BY LINE
    messageLines = message.split("\n", 5)
    
    # PARSE SENDER FROM SECOND LINE
    s = 
    pattern = "AUG\|(.*?)\|UGA"

    substring = re.search(pattern, s).group(1)
    print(substring)


def regexParser():


if __name__ == "__main__":
    main()
