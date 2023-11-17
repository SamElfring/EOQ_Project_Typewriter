from flask import Flask, render_template, request, redirect
from uuid import uuid4
from models import db, Sentences, Leaderboard
import postgresqlite

app = Flask(__name__)

# Flask config
app.config["SECRET_KEY"] = uuid4().hex
app.config["TEMPLATES_AUTO_RELOAD"] = True

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
    return render_template("index.html", start_sentence=Sentences.get_random())

@app.route("/new-sentence")
def get_new_sentence():
    """Returns a random sentence from the DB.

    Returns:
        JSON: JSON object that contains the sentence as a string.
    """
    random_sentence: Sentences = Sentences.get_random() # type: ignore

    return {
        "sentence": random_sentence.sentence
    }

@app.route("/leaderboard")
def get_leaderboard():
    leaderboard = Leaderboard.get_leaderboard()
    return render_template("leaderboard.html", leaderboard=leaderboard)

@app.route("/leaderboard", methods=["POST"])
def add_to_leaderboard():
    wpm = request.form.get("wpm")
    # accuracy = request.form.get("accuracy")
    name = request.form.get("name")

    if not name:
        name = ""

    db.session.add(Leaderboard(username=name, words_entered=0, words_per_minute=wpm)) # type: ignore
    db.session.commit()

    return redirect("/leaderboard")

# Create tables and models
with app.app_context():
    db.create_all()

# Start app
if __name__ == "__main__":
    app.run()
