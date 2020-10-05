#!/usr/bin/env python
# coding=utf-8
import os
import sys
import serial
import time
from time import sleep
#import sched
#from serial import Serial
from serial.tools import list_ports
import numpy as np
import scipy.stats

NEDspeed = 1000#max = 50000
TurboNEDspeed = 10000# max = 400000


ports=dict()  
ports_avaiable = list(list_ports.comports())


rngcomports = []
turbocom = None

for temp in ports_avaiable:
	if temp[1].startswith("TrueRNG"):
		if 'pro' in temp[1]:
			print ('found pro')
			turbocom = str(temp[0])
		else:
			print('Found:           ' + str(temp))
			rngcomports.append(str(temp[0]))
        
           
ser = []            
for a in range(0,len(rngcomports)):
	ser.append (serial.Serial(port=rngcomports[a],timeout=10))           
turboser= (serial.Serial(port=turbocom,timeout=10)) 


           
#print('Using com port:  ' + str(rng1_com_port))
#print('Using com port:  ' + str(rng2_com_port))
#print('==================================================')
sys.stdout.flush()

for a in range(0,len(rngcomports)):
	if(ser[a].isOpen() == False):
		ser[a].open()

	ser[a].setDTR(True)
	ser[a].flushInput()
if turboser.isOpen()==False:
    turboser.open()
turboser.setDTR(True)
turboser.flushInput()




sys.stdout.flush()


starttime = int(time.time()*1000)


# # outfile/outfileJava for leo's local device only # #
# outfile = open('C:/Users/Aslan/Documents/HALO Development/NED_Data/RNG_%d.txt'%(starttime),'w')
# outfileJava = open('C:/Users/Aslan/Documents/HALO Development/NED_BYTES/RNG_%d.txt'%(starttime),'w')


# # outfile/outfileJava if writing to this repo # #

outfile = open('NED_Data/RNG_%d.txt'%(starttime),'w')
outfileJava = open('NED_BYTES/RNG_%d.txt'%(starttime),'w')


all_file_names = open('all_file_names.txt','a')

# # all_file write script for leo's local device only # #

# all_file_names.write('C:/Users/Aslan/Documents/HALO Development/NED_BYTES/RNG_%d.txt'%(starttime) + '\n')


# # all_file write script if writing to this repo # #

all_file_names.write('NED_BYTES/RNG_%d.txt'%(starttime) + '\n')

all_file_names.close()


NedVal = np.zeros(len(rngcomports)+1)

print("Breathing...")
TotalRuns=0
while True:
           
    
    for a in range(0,len(rngcomports)):
        ser[a].flushInput()         
        node = ser[a].read(NEDspeed)
        bitct=0
        for b in range (0,len(node)):
            outfile.write('%d,'%(node[b]))
            strnode = str(bin(256+int(node[b])))[3:]
            bitct += int(strnode[0])+int(strnode[1])+int(strnode[2])+int(strnode[3])+int(strnode[4])+int(strnode[5])+int(strnode[6])+int(strnode[7])
        outfile.write('%d,%d\n'%(int(time.time()*1000),a))
        
        NedVal[a] += bitct
        #print(bitct)
    turboser.flushInput()
    supernode = turboser.read(TurboNEDspeed)
    bitct=0
    for b in range (0,len(supernode)):
        outfile.write('%d,'%(supernode[b]))
        strnode = str(bin(256+int(supernode[b])))[3:]
        bitct += int(strnode[0])+int(strnode[1])+int(strnode[2])+int(strnode[3])+int(strnode[4])+int(strnode[5])+int(strnode[6])+int(strnode[7])
    outfile.write('%d,T\n'%(int(time.time()*1000)))
    outfileJava.write('[%d %d %d %d %d %d %d %d]\n'%(int(strnode[0]),int(strnode[1]),int(strnode[2]),int(strnode[3]),int(strnode[4]),int(strnode[5]),int(strnode[6]),int(strnode[7])))
    outfileJava.flush()
    os.fsync(outfileJava.fileno())
    NedVal[-1] += bitct
    
    TotalRuns += 1
    Zcum=[]
    Pcum=[]
    for a in range (0,len(NedVal)-1):
        EX = NedVal[a]-(TotalRuns*NEDspeed*8*0.5)
        #print((TotalRuns*NEDspeed*8*0.5),NedVal[a])
        snpq = (TotalRuns*NEDspeed*8*0.25)**0.5
        Zval = EX/snpq
        #print(Zval)
        Zcum.append(Zval**2)
        pval = scipy.stats.norm.sf(np.abs(Zval)*2)
        Pcum.append(1/pval)
    
    CmbP = scipy.stats.chi2.sf(np.sum(Zcum),len(Zcum))
    MaxP = np.amax(Pcum)
    
    EX = NedVal[-1]-(TotalRuns*TurboNEDspeed*8*0.5)
    snpq = (TotalRuns*TurboNEDspeed*8*0.25)**0.5
    Zval = EX/snpq
    pval = scipy.stats.norm.sf(np.abs(Zval)*2)
    #print(Pcum,1/pval)
    
    
    print('%d | %.2f | %.2f | %.2f'%(TotalRuns,1/CmbP,MaxP,1/pval))
    
        
    if TotalRuns%600==0:
        outfileJava.close()
        outfileJava = open('C:/Users/Aslan/Documents/HALO Development/NED_BYTES/RNG_%d.txt'%(int(time.time()*1000)),'w')

    
    #print(NedVal)                                                          
 
    sleep(1)

            
"""
    bulb = devices[0]
    print("Selected {}".format(bulb.get_label()))

    # get original state
    print("Turning on all lights...")
    original_power = bulb.get_power()
    original_color = bulb.get_color()
    bulb.set_power("on")

    sleep(1) # for looks

    print("Flashy fast rainbow")
    rainbow(bulb, 0.1)

    print("Smooth slow rainbow")
    rainbow(bulb, 1, smooth=True)

    print("Restoring original power and color...")
    # restore original power
    bulb.set_power(original_power)
    # restore original color
    sleep(0.5) # for looks
    bulb.set_color(original_color)
"""


