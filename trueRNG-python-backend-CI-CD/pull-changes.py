import subprocess as cmd
import time
from datetime import datetime


def pullGithubChanges():
    while True:

        cmd.run("git pull origin master", check=True, shell=True)
        print('completed pull')
        time.sleep(600)


pullGithubChanges()
