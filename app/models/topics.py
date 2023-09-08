from .db import db, environment, SCHEMA, add_prefix_for_prod



class Topic(db.Model):
    __tablename__ = 'topics'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    topic = db.Column(db.String(50), nullable=False)

    posts = db.relationship("Post", back_populates="topics", cascade="all, delete-orphan")

    def to_dict(self):
        return {
            'id': self.id,
            'topic':self.topic
        }
