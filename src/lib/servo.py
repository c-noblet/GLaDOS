#!/usr/bin/python
from __future__ import division
import time
import sys
import math
import Adafruit_PCA9685

import RPi.GPIO as GPIO
GPIO.setmode(GPIO.BCM)
GPIO.setup(7,GPIO.OUT, initial=GPIO.HIGH)

pwm = Adafruit_PCA9685.PCA9685(address=0x41)
angle = int(sys.argv[1])
servo_min = 100  # Minimale Pulslaenge
servo_mid = 300
servo_max = 500  # Maximale Pulslaenge
channel = 0
ratio = (servo_max-servo_mid)/90
if angle >= 0:
    pulse = int(math.ceil(ratio * angle + servo_mid))
else:
    pulse = int(abs(math.ceil(ratio * abs(angle) - servo_mid)))
pwm.set_pwm_freq(50)
pwm.set_pwm(channel, 0, pulse)
print('moved')
sys.stdout.flush()