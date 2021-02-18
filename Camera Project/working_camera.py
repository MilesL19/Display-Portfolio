import RPi.GPIO as GPIO
from picamera import PiCamera
import time
import datetime
GPIO.setwarnings(False)


GPIO.setmode(GPIO.BCM)
#Setting up the camera lights
blueLight = 27
GPIO.setup(blueLight, GPIO.OUT)
redLight = 17
GPIO.setup(redLight, GPIO.OUT)

#Setting up the buttons
startButton = 24
GPIO.setup(startButton, GPIO.IN)
stopButton = 23
GPIO.setup(stopButton, GPIO.IN)

#Setting up the camera
camera = PiCamera()
turnoff = True


#Function to get file name
def getFileName():
    return datetime.datetime.now().strftime("%Y-%m-%d_%H.%M.Yay.jpg")

while turnoff== True:
    #taking button input in 
    start = GPIO.input(startButton) 
    stop = GPIO.input(stopButton) 
    
    #does stuff when blue button is presssed specifically like take a picture
    if (start == True):
        #FLASH
        GPIO.output(blueLight, GPIO.HIGH)
        
        #taking the picture
        fileName = getFileName()
        camera.resolution = (1280, 1024)
        camera.rotation = 270
        camera.start_preview(alpha = 205)
        camera.annotate_text = "Smile!!!"
        camera.capture(fileName)
        camera.stop_preview()
        
        #BYE BYE FLASH
        GPIO.output(blueLight, GPIO.LOW)
        

    #does stuff when red button is pressed specfically shutdown the program
    if (stop == True):
        #FLASH
        GPIO.output(redLight,GPIO.HIGH)
        time.sleep(1)
        GPIO.output(redLight, GPIO.LOW)
        print("powering off")
        turnoff = False
        
        
GPIO.cleanup() 
camera.close()