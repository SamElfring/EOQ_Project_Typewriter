from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Sentences(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    sentence = (db.Column(db.String(100)))

class Leaderboard(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20))
    words_entered = db.Column(db.Integer)
    word_per_minute = db.Column(db.Integer)
    time = db.Column(db.DateTime)
