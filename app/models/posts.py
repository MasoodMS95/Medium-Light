from .db import db, environment, SCHEMA, add_prefix_for_prod



class Post(db.Model):
    __tablename__ = 'posts'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50), nullable=False)
    body = db.Column(db.String(2500), nullable=False)
    userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    topic = db.Column(db.String(50), db.ForeignKey(add_prefix_for_prod("topics.topic")), nullable=False)

    users = db.Relationship("User", back_populates="posts")
    topics = db.Relationship("Topic", back_populates="posts")
    comments = db.Relationship("Comment", back_populates="posts", cascade="all, delete-orphan")

    def to_dict(self):
        return {
          'id': self.id,
          'title':self.title,
          'body':self.body,
          'userId':self.userId,
          'topic':self.topic
        }
