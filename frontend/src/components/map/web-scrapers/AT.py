#import git
def log(string):
    infile = open('AT_Changelog.txt', 'a')
    infile.write(string)
    infile.close()

import os
#os.chdir('C:\\Users\\quall\\OneDrive\\Desktop\\SDP 2022-23')
log('Directory updated to sdp folder')
print(os.getcwd())
import subprocess as s
#os.system('Holdup.py')
print('all done')
from datetime import datetime
import Final_Scraper as F
p = datetime.today()
day = p.day
month = p.month
print(os.getcwd())
F.run()
print('All Done!')
'''
infile = open('Desktop_test.txt', 'w')
infile.write('Hurky Durky')
infile.close()
'''
os.chdir('../../../')
print(os.getcwd())

os.system('copy {} {}'.format('OneDrive\\Desktop\\\"SDP 2022-23\"\\Diner_menus.json', 'source\\repos\\univinfoFinal\\frontend\\src\\components\\map\\Diner_menus.json'))
os.system('copy {} {}'.format('OneDrive\\Desktop\\\"SDP 2022-23\"\\All_classes.json', 'source\\repos\\univinfoFinal\\frontend\\src\\components\\map\\All_classes.json'))
os.chdir('source\\repos\\univinfoFinal')
log('Directory changed to univinfoFinal')
print(os.getcwd())
commands = ['git init',
            'git pull',
        'git add {}'.format(os.getcwd()) + '\\frontend\\src\\components\\map\\Diner_menus.json',
        'git add {}'.format(os.getcwd()) + '\\frontend\\src\\components\\map\\All_classes.json',
        'git commit -m \"Icon info automation {}-{}\"'.format(month, day),
        'git branch -M alvin',
        'git remote add origin',
        #'https://github.com/seniordprojectG14/univinfoFinal.git',
        'git push -u origin alvin']
push_call = ''
for item in commands:
    push_call += item + '\n'
print(push_call)
for item in commands:
    print(item)
    print(s.call(item))
    log(item)
'''                           
os.system('git init')
os.system('git add {}'.format(os.getcwd() + 'frontend\\src\\components\\map\\dummy.json'))
os.system('git add {}'.format(os.getcwd() + 'frontend\\src\\components\\map\\dummy.json2'))
os.system('git commit -m \"Icon info TEST2 {}-{}\"'.format(month, day))
os.system('git branch -M alvin')
os.system('git remote add origin')
os.system('https://github.com/seniordprojectG14/univinfoFinal.git')
os.system('git push -u origin alvin')
'''
print(os.getcwd())
print('done')
log('finished')
