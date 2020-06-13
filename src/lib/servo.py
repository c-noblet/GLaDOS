#!/usr/bin/python
from __future__ import division
import time
import sys
import math
import Adafruit_PCA9685
import RPi.GPIO as GPIO

# Set up
channel = int(sys.argv[1]) # Target the servo motor
angle = int(sys.argv[2])

servo_min = 100  # Minimale Pulslaenge
servo_mid = 300
servo_max = 500  # Maximale Pulslaenge

# Connection to Talking pi board
GPIO.setmode(GPIO.BCM)
GPIO.setup(7,GPIO.OUT, initial=GPIO.HIGH)
pwm = Adafruit_PCA9685.PCA9685(address=0x41)

# Convert degrees into pulse width
ratio = (servo_max-servo_mid)/90
if angle >= 0:
    pulse = int(math.ceil(ratio * angle + servo_mid))
else:
    pulse = int(abs(math.ceil(ratio * abs(angle) - servo_mid)))

# Move the Servo motor
pwm.set_pwm_freq(50)
pwm.set_pwm(channel, 0, pulse)
print('moved')
sys.stdout.flush()