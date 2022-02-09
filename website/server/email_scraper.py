# imports
import imaplib
import email
import psycopg2
import re
import time
import os
from dotenv import load_dotenv
from datetime import datetime


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
def checkMail():
    # ACC CREDENTIALS
    username = os.getenv("EMAIL_USERNAME")
    password = os.getenv("EMAIL_KEY")

    # CREATE AN IMAP4 SERVER
    gmail_host= 'imap.gmail.com'

    # SET CONNECTION
    mail = imaplib.IMAP4_SSL(gmail_host)

    # LOGIN
    mail.login(username, password)

    # SELECT INBOX
    mail.select("INBOX")

    # SELECT SPECIFIC EMAILS
    _, selected_mails = mail.search(None, 'UNSEEN')

    # TOTAL NUMBER OF UNSEEN MAILS
    print("Total Unread Messages:" , len(selected_mails[0].split()))

    for num in selected_mails[0].split():
        _, data = mail.fetch(num , '(RFC822)')
        _, bytes_data = data[0]

        # CONVERT THE BYTE INTO MESSAGE
        email_message = email.message_from_bytes(bytes_data)
        

        values = formatEmail(email_message)
        
        
        connection = psycopg2.connect(host='localhost',
                                        database='teambanditdb',
                                        user='quinnmelssen',
                                        password='ZeroTwo02!')

        # SET UP CURSOR
        cur = connection.cursor()
    
        # CREATE QUERY STATEMENT
        query = "INSERT INTO messages (recipient, sender, subject, message, datetime) VALUES (%s, %s, %s, %s, %s)"

        cur.execute(query, values)
        
        connection.commit()


def executeQuery():
    """ TAKES IN VALUES GARNERED FROM OTHER FUNCTIONS AND
    EXECUTES QUERY TO INSERT INTO DATABASE """

def formatEmail(email_message):
    # FORMAT EMAIL ADDRESSES IF FIRST/NAME INCLUDED
        if '<' in email_message["to"]:
                # PATTERN TO SEARCH FOR
                pattern = "\<(.+?)\>"
                # SET RECIPITENT
                recipient = re.search(pattern, email_message["to"]).group(1)

        if '<' in email_message["from"]:
                # PATTERN TO SEARCH FOR
                pattern = "\<(.+?)\>"
                # SET SENDER
                sender = re.search(pattern, email_message["from"]).group(1)

        # ACCESS MESSSAGE
        for part in email_message.walk():
            if part.get_content_type()=="text/plain" or part.get_content_type()=="text/html":
                message = part.get_payload(decode=True)
                break

        # GET TIME IN CORRECT FORMAT
        time = email_message["date"]
        pattern = "\, (.+?)\ -"
        time = re.search(pattern, time).group(1)
        # FORMAT TIME
        time = datetime.strptime(time, "%d %b %Y %H:%M:%S")

        # GET SUBJECT
        subject = email_message["subject"]

        # RETURN VALUES FOR QUERY
        return (recipient, sender, subject, message, time)

if __name__ == '__main__':
    main()