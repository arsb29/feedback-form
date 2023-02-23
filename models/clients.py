from models import db


class Clients(db.Model):
    __tablename__ = 'clients'
    name = db.Column(db.Text, nullable=True)
