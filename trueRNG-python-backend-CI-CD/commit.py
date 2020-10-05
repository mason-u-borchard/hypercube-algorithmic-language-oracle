import subprocess as cmd
import time
from datetime import datetime

commit_count = open('automation-test.txt', 'r')

commit_count_lines = commit_count.readlines()
print('commit_count_lines: %s' % commit_count_lines)
n = commit_count_lines[0]
print(n)


def updateGithub():
    while True:
        cmd.run("git add .", check=True, shell=True)
        global n
        global_n = int(n) + 1
        print(n, global_n)
        commit_cmd = "git commit -m 'NED_BYTES'" + str(n)
        cmd.run(f"" + commit_cmd, check=True, shell=True)
        cmd.run("git push origin master", check=True, shell=True)
        now = datetime.now()
        print('completed commit: ', now)
        cmd.run("git reset --hard", check=True, shell=True)
        now = datetime.now()
        print('completed reset: ', now)
        commit_tracker = open('automation-test.txt', 'w')
        commit_tracker.write(str(n) + '\n')
        commit_tracker.close()
        n = global_n
        time.sleep(10)


updateGithub()
