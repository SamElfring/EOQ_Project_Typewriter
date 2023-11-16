from flask import Flask, render_template
from uuid import uuid4
from models import db, Sentences, Leaderboard
import postgresqlite
import random

app = Flask(__name__)

# Flask config
app.config["SECRET_KEY"] = uuid4().hex

# Database configuration
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SQLALCHEMY_DATABASE_URI"] = postgresqlite.get_uri()

db.init_app(app)

@app.before_request
def populate_db():
    if Sentences.query.first() is None:
        with open('sentences.txt') as sentences:
            for line in sentences:
                formatted_line = line.split('\n')[0]
                new_line = Sentences(sentence=formatted_line) # type: ignore
                db.session.add(new_line)
                db.session.commit()

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/new-sentence")
def get_new_sentence():
    """Returns a random sentence from the DB.

    Returns:
        JSON: JSON object that contains the sentence as a string.
    """
    random_sentence = Sentences.get_random() # type: ignore

    return {
        "sentence": random_sentence.sentence
    }

@app.route("/leaderboard")
def get_leaderboard():
    leaderboard = Leaderboard.get_leaderboard()
    return render_template("leaderboard.html", leaderboard=leaderboard)

# Create tables and models
with app.app_context():
    db.create_all()

# Start app
if __name__ == "__main__":
    app.run()
