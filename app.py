from flask import Flask
import sys
from utils import mysql
app = Flask(__name__)

@app.route("/")
def hello():
    return "champics"

if __name__ == "__main__":
    mysql.do()
    #app.run()