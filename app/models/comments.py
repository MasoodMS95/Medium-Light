from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy import func



class Comment(db.Model):
    __tablename__ = 'comments'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    postId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("posts.id")), nullable=False)
    userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    comment = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=func.now())
    updated_at = db.Column(db.DateTime, nullable=False, default=func.now())

    posts = db.relationship("Post", back_populates="comments")
    users = db.relationship("User", back_populates="comments")

    def to_dict(self):
        return {
            'id': self.id,
            'postId': self.postId,
            'userId': self.userId,
            'comment': self.comment,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at,
        }
