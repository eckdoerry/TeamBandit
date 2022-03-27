# IMPORTS
from email.header import Header
import imaplib
import email
from inspect import Attribute
from operator import methodcaller
import uuid
import psycopg2
import re
import time
import os
import uuid
from dotenv import load_dotenv
from datetime import datetime
from dateutil import parser
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
        host=os.getenv("host"),
        database=os.getenv("database"),
        user=os.getenv("user"),
        password=os.getenv("password"),
    )

    # SET UP CURSOR
    cur = connection.cursor()

    print(values)
    # CREATE QUERY STATEMENT
    query = "INSERT INTO messages (recipient, sender, subject, message, datetime, attachment) VALUES (%s, %s, %s, %s, %s, %s)"

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
        recipient = regexParser(email_message["to"], "\<(.+?)\>")

    else:
        recipient = email_message["to"]

    if "<" in email_message["from"]:
        sender = regexParser(email_message["from"], "\<(.+?)\>")
    
    else:
        sender = email_message["from"]

    # SET HTML PREVENTION BOOL TO FALSE
    alreadyRead = False
    attachmentpayload = None

    # ACCESS MESSSAGE
    for part in email_message.walk():
        if (
            (part.get_content_type() == "text/plain"
            or part.get_content_type() == "text/html")
            and alreadyRead == False
        ):
            message = part.get_payload(decode=True).decode().strip()
            alreadyRead = True
            
        if (part.get_content_type() == 'application/pdf'):
            # PDF as bytes
            attachmentpayload = part.get_payload(decode=True)
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
    time = parser.parse(time)

    # GET SUBJECT
    subject = email_message["subject"]
    # PARSE OUT RE: FROM SUBJECT IN REPLY EMAILS
    subject = subject.replace("Re: ", "")

    # CHECK MESSAGE TO SEE IF ITS A REPLY
    message = EmailReplyParser.parse_reply(message)

    # SET COMPLETE PATH TO NULL
    complete_path = None

    # IF ATTACHMENTPAYLOAD EXISTS, CREATE UUID AND SAVE FILE
    if attachmentpayload:
        # PATH TO FOLDER
        save_path = 'public/emailAttachments'
        complete_path = os.path.join(save_path, sender.split('@')[0] + '-' + str(uuid.uuid4())+".pdf")

        with open(complete_path, 'wb+') as f:
            f.write(attachmentpayload)

    # RETURN VALUES FOR QUERY
    return [recipient, sender, subject, message, time, complete_path]


""" 
FORWARDED EMAILS HAVE A DIFFERENT FORMAT THAN REGULAR EMAILS,
AND AS SUCH MUST BE PARSED DUE TO META INFORMATION (SENDER, RECIPIENT, ETC)
BEING IN MESSAGE BODY AND NOT HEADER.
"""


def formatForwardedEmail(email_message):
    # SET HTML PREVENTION BOOL TO FALSE
    alreadyRead = False
    attachmentpayload = None

    # ACCESS MESSSAGE
    for part in email_message.walk():
        if (
            (part.get_content_type() == "text/plain"
            or part.get_content_type() == "text/html")
            and alreadyRead == False
        ):
            message = part.get_payload(decode=True).decode().strip()
            alreadyRead = True
            
        if (part.get_content_type() == 'application/pdf'):
            # PDF as bytes
            attachmentpayload = part.get_payload(decode=True)
            break

        
    # PARSE MESSAGE BODY FOR EMAIL META INFORMATION
    # SPLIT EMAIL BODY BY LINE
    messageLines = message.split("\n", 5)
    
    # ITERATE THROUGH EACH LINE LOOKING FOR KEYS
    for i in messageLines:
        if "To:" in i:
            recipient = regexParser(i, "\<(.+?)\>")
        elif "From:" in i:
            sender = regexParser(i, "\<(.+?)\>")
        elif "Subject:" in i:
            subject = i.replace("Subject: ", "").replace("\r", "")
        elif "Date:" in i:
            time = i.replace("Date: ", "")
            time = parser.parse(time)

    # MESSAGE ALWAYS LAST ITEM IN LIST
    message = messageLines[5].strip()

    # SET COMPLETE PATH TO NULL
    complete_path = None

    # IF ATTACHMENTPAYLOAD EXISTS, CREATE UUID AND SAVE FILE
    if attachmentpayload:
        # PATH TO FOLDER
        save_path = 'public/emailAttachments'
        complete_path = os.path.join(save_path, sender.split('@')[0] + '-' + str(uuid.uuid4())+".pdf")

        with open(complete_path, 'wb+') as f:
            f.write(attachmentpayload)

    return [recipient, sender, subject, message, time, complete_path]


""" 
SMALL DRY HELPER FUNCTION TO PARSE ANY GIVEN STRING USING PATTERN
PASSED IN.
"""


def regexParser(string, pattern):
    return re.search(pattern, string).group(1)


###################
### MAIN DRIVER ###
###################
if __name__ == "__main__":
    main()


"""
EMAIL DEV TIMELINE
- Wrote tech demo script
    - only had one organizer email so whichever email wasn't that one was the client,
    easy to simply add boolean for received or not due to one email being static
- Started rewriting demo script accounting for multiple client emails and multiple organizer emals
    - now added uncertainty as to which email is client and which is organizer
    - got rid of received boolean, decided to just dictate how to display messages on client side
    as it once again gets rid of confusion over which email is the organizer and which is the client
    (as the organizer email is easily accessible from the session information)
- Got simple one off emails working between gmail accounts, parsing information using python mail library
    - started testing with different clients (i.e. yahoo, outlook, hotmail, etc) but metadata is in different
    form and threw errors with my current parsing setup (for example, datetime timezone is in a different
    format on hotmail than google)
    - Got big 3 email clients working
- Began working on other edge cases (such as FWDed emails and replies)
    - Replies: 
        -Subject bar in replies had 'RE:' prior to normal subject, parsed this out in order to prevent
        seperate message chains being shown in email hub (message chains will be generated by a combination of
        client emails and unique subjects)
        - Replies also came with whole email chain (all prior messages) in message body, python email module has
        no way to seperate the final message from these, had to find python module (email_reply_parser) to do
        this for me, has worked for emails from most clients so far but can't be positive
    - FWD: Forwarded emails are tricky, as google inputs meta data such as to: and from: fields into
    body of email, significantly increasing complexity in gathering this info and creating more uncertainty
    on how different clients will work (as of now most/all emails will be forwarded to teambandit inbox from
    gmail but may need to be reworked in the future)
- KISS: Different email clients package emails, replies, etc in different ways, thus adding many edge cases
"""
