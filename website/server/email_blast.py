# IMPORTS
from email.header import Header
from smtplib import SMTP_SSL, SMTP_SSL_PORT
from inspect import Attribute
from operator import methodcaller
from typing import SupportsIndex
import uuid
import psycopg2
import re
import time
import os
import uuid
from dotenv import load_dotenv
from email.message import EmailMessage
from flask import Flask

"""
app = Flask(__name__)


@app.route("/email_blast")
def email_blast(organizer_name):
    return


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=8080, debug=True)
"""


dummy_list = [
    "Eck Doerry",
    [
        ("qjm7@nau.edu", "XXXX-XXXX-XXXX-XXXX"),
        ("qjmelssen@gmail.com", "YYYY-YYYY-YYYY-YYYY"),
        ("quinnmelssen@yahoo.com", "WWWW-WWWW-WWWW-WWWW"),
    ],
]


####################
####### MAIN #######
####################
def main():
    # LOAD ENV VARS
    load_dotenv()

    # GET PASSWORDS
    sendEmail(dummy_list)


def sendEmail(info):
    # ACC CREDENTIALS FROM .ENV FILE
    username = os.getenv("EMAIL_USERNAME")
    password = os.getenv("EMAIL_KEY")

    # CREATE AN IMAP4 SERVER
    gmail_host = "imap.gmail.com"

    # SET CONNECTION
    smtp_server = SMTP_SSL(gmail_host, port=SMTP_SSL_PORT)

    # LOGIN
    smtp_server.login(username, password)

    student_list = info[1]

    for i in student_list:
        from_email = "TeamBanditManager@gmail.com"
        to_email = i[0]

        if len(i[1]) == 19:
            body = (
                "Hello, \nThis is an automated message from TeamBandit to let you know that your organizer "
                + info[0]
                + " has created"
                + " an account for you. The email you will use to sign into this account is the same one you've received this message on, while"
                + " the password is the randomly generated UUID between the arrows below. \n\n"
                + "Password: <"
                + i[1]
                + ">\n"
                + "\nWe encourage you to log into your account and change this password immediately. We hope you enjoy TeamBandit!"
            )

        else:
            body = (
                "Hello, \nThis is an automated message from TeamBandit to let you know that your organizer "
                + info[0]
                + " has added you to a class in TeamBandit."
                + " The email you will use to sign into this account is the same one you've received this message on, while"
                + " your password has already been changed by you. \n\n"
                + "\nWe encourage you to log into your account and get familiar. We hope you enjoy TeamBandit!"
            )

        # FORMAT EMAIL
        email_message = EmailMessage()
        email_message.add_header("To", to_email)
        email_message.add_header("From", from_email)
        email_message.add_header("Subject", "TeamBandit Account Created")
        email_message.set_content(body)

        # SEND EMAI:
        smtp_server.sendmail(from_email, to_email, email_message.as_bytes())


###################
### MAIN DRIVER ###
###################
if __name__ == "__main__":
    main()
