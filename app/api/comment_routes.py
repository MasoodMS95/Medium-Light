from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Comment, db
from ..forms import postForm
from sqlalchemy import func


comment_routes = Blueprint('comments', __name__)

@comment_routes.route('/')
def getAllComments():
  """
  Gets all the comments possible
  """
  comments = Comment.query.all()
  return {'Comments' : [comment.to_dict() for comment in comments]}
