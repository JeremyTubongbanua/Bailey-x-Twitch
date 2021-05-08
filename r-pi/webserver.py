import RPi.GPIO as GPIO
import flask
from time import sleep

# definitions
ledGreen = 26
motor = 20
follower_seconds = 4

# setup
app = flask.Flask(__name__)
GPIO.setmode(GPIO.BCM);
GPIO.setup(motor, GPIO.OUT);
GPIO.setup(ledGreen, GPIO.OUT);

# initialization
GPIO.output(ledGreen, GPIO.LOW);
GPIO.output(motor, GPIO.LOW);

# signal initialization
for i in range(5):
    GPIO.output(ledGreen, GPIO.HIGH);
    sleep(0.1);
    GPIO.output(ledGreen, GPIO.LOW);
    sleep(0.1);
    
# listen for /actions (eg: 192.168.0.109/follow)
@app.route("/<action>")
def action(action):
	if action=="follow" or action=="subscribe":
		GPIO.output(ledGreen, GPIO.HIGH)
		GPIO.output(motor, GPIO.HIGH)
		amount = follower_seconds
		if action=="subscribe":
			amount = 5
		sleep(amount)
		GPIO.output(motor, GPIO.LOW)
		GPIO.output(ledGreen, GPIO.LOW)
	return '0'

@app.route('/')
def index():
	ip_address = flask.request.remote_addr
	return "IP: " + ip_address

if __name__ == '__main__':
	app.run(debug=True, port=80,  host='0.0.0.0')
	print("Done")
