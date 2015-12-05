from flask import Flask
import sys
from configs import config
app = Flask(__name__)

@app.route("/")
def hello():
    return "champics"

if __name__ == "__main__":
    print config.db["host"]
    #app.run()