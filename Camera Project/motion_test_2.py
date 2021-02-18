
from gpiozero import MotionSensor
from picamera import PiCamera
import time
import datetime


# Sensor is connected to pin 25
pir = MotionSensor(4)
print("hi")
print("this is right before the camera just to be sure")
# Creating an object for the camera
camera = PiCamera()
print("we got to the camera")
# Function to make the file
def getFileName():
    return datetime.datetime.now().strftime("%Y-%m-%d_%H.%M.%s.h264")
while True:
   #Getting a file name
   fileName = getFileName()
   # Waiting for motion to be detected
   pir.wait_for_active
   #Printing test text to screen
   print("please for the love of god work")
   #preview the camera on screen
   camera.start_preview(alpha = 200)
   #start recording the video
   camera.start_recording(fileName)
   #record for 10 seconds
   camera.wait_recording(10)
   #Stopping preview and recording
   camera.stop_preview()
   camera.stop_recording()
   camera.close()
   #Closing the pins
   

