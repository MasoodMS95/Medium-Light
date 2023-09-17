from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Comment, db
from ..forms import newCommentForm, editCommentForm
from sqlalchemy import func


comment_routes = Blueprint('comments', __name__)

@comment_routes.route('/')
def getAllComments():
  """
  Gets all the comments possible
  """
  comments = Comment.query.all()
  return {'Comments' : [comment.to_dict() for comment in comments]}

@comment_routes.route('/<int:id>')
def getSingleComment(id):
  """
  Gets a single comment details
  """
  comment = Comment.query.get(id)
  if comment:
    return comment.to_dict()
  return jsonify({'error': 'Comment not found'}), 404

@comment_routes.route('/new', methods=["POST"])
def createNewComment():
  """
  Creates a new comment
  """
  request_data=request.get_json()
  form = newCommentForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  data = form.data
  if form.validate_on_submit():
    newComment = Comment(
      postId = data["postId"],
      userId = data["userId"],
      comment = data["comment"]
    )
    db.session.add(newComment)
    db.session.commit()
    return newComment.to_dict()
  return {"errors":form.errors}, 401

@comment_routes.route('/edit/<int:id>', methods=["PUT"])
def editComment(id):
  """
  Edits a comment
  """
  request_data=request.get_json()
  form = editCommentForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  data = form.data
  if form.validate_on_submit():
    commentToEdit = Comment.query.get(id)
    if commentToEdit:
      commentToEdit.comment = data["comment"]
      commentToEdit.updated_at = func.now()
      db.session.commit()
      return commentToEdit.to_dict()
    return {'error' : 'Comment not found'}
  return {"errors":form.errors}, 401


@comment_routes.route('/<int:id>', methods=['DELETE'])
def deleteComment(id):
  comment = Comment.query.get(id)

  if comment:
    db.session.delete(comment)
    db.session.commit()
    return jsonify({'message': 'Comment deleted'})
  return jsonify({'error': 'Comment not found'}), 404
