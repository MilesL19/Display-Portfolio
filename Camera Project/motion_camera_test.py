from picamera import PiCamera
from gpiozero import MotionSensor
import time
import datetime

#creating a motionsensor object from pin 4
pir = MotionSensor(4)

#creating a camera object
camera = PiCamera()

#Function to create a new fileName from the date and time
def getFileName():
    return datetime.datetime.now().strftime("%Y-%m-%d_%H.%M.%Sjpg")

while True:
    #getting the file
    fileName = getFileName()
    
    #waiting for motion to be detected
    pir.wait_for_motion
    
    #Printing text 
    print("Please for the love of god freaking work i'm so desperate to have this thing work like you don't understand")
    
    camera.start_preview()
    camera.capture(fileName)
    camera.stop_preview()
    
    time.sleep(10)