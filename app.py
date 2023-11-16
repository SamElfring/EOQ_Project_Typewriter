from flask import Flask
from uuid import uuid4
from models import db
import postgresqlite

app = Flask(__name__)

# Flask config
app.config["SECRET_KEY"] = uuid4().hex

# Database configuration
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SQLALCHEMY_DATABASE_URI"] = postgresqlite.get_uri()

db.init_app(app)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

# Create tables and models
with app.app_context():
    db.create_all()

# Start app
if __name__ == "__main__":
    app.run()
