# GLaDOS /!\ Work in progress /!\

This is a home assistant based on the fictionnal character GLaDOS from the Portal series. 

The code may be ugly so feel free to teach me all the good ways to improve myself.

The project was inspired by this 2 tutorial :
- [A Fully 3D Printable GlaDOS Robotic Ceiling Arm Lamp](https://www.instructables.com/id/A-fully-3D-printable-GlaDOS-Robotic-ceiling-arm-la/)
- [GLADOS Home Automation (voice Recognition)](https://www.instructables.com/id/GLADOS-Home-Automation-voice-Recognition/)

## Installation & running

```
npm install
sudo node ./build
```

## Services

GLaDOS runs on Telegram, Discord and Express.

## Commands

### servo

Use the Adafruit_PCA9685 python libray to move the servomotor.
The servo python code can be found in /lib/servo.py

#### Allowed values

| Field | Type   | Description                                                      |
| ------|:------:| -----------------------------------------------------------------|
| Angle | String | Set the servomotor angle between -90 and 90 degrees (-90, 0, 90) |

#### Command example

To move the servomotor to position -90 degrees.

```
!servo -90
```

### lights

this method use the Philips Hue bridge API to work.

#### Allowed values

| Field       | Type    | Description                                             |
| ------------|:-------:| --------------------------------------------------------|
| lightsArray | Array   | Array of int id light to update                         |
| state       | Boolean | Set state on On (true) or Off (false) the lights        |
| saturation  | Number  | Set the Saturation (Intensity) of the lights (0 to 254) |
| brightness  | Number  | Set the Brightness of the lights (0 to 254)             |
| hue         | Number  | Set the color of the lights (0 to 65 535)               |

#### Command example

Set the lights 1 and 3 on.

```
!lights 3 blue 10

!lights 3 off
```

## To do

- Add testing
- Comment all methods
- Add Mi sensors compatibility
- Add MongoDB
- Add vocal commands recognition