from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy import func


class Post(db.Model):
    __tablename__ = 'posts'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50), nullable=False)
    body = db.Column(db.String(2500), nullable=False)
    userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    topicId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("topics.id")), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=func.now())
    updated_at = db.Column(db.DateTime, nullable=False, default=func.now())

    users = db.relationship("User", back_populates="posts")
    topics = db.relationship("Topic", back_populates="posts")
    votes = db.relationship("Vote", back_populates="posts", cascade="all, delete-orphan")
    comments = db.relationship("Comment", back_populates="posts", cascade="all, delete-orphan")

    def to_dict(self):
        return {
          'id': self.id,
          'title':self.title,
          'body':self.body,
          'userId':self.userId,
          'topicId':self.topicId,
          'createdAt': self.created_at,
          'updatedAt': self.updated_at,
          'comments': [comment.to_dict() for comment in self.comments],
          'votes': [vote.to_dict() for vote in self.votes]
        }
