from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql.expression import func

db = SQLAlchemy()

class Sentences(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    sentence = (db.Column(db.String(100)))

    @classmethod
    def get_random(cls):
        return cls.query.order_by(func.random()).first()

class Leaderboard(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20))
    words_entered = db.Column(db.Integer)
    words_per_minute = db.Column(db.Integer)
    time = db.Column(db.DateTime)
