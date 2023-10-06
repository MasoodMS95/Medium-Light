from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import User, Post, Vote, db
from ..forms import voteForm

vote_routes = Blueprint('votes', __name__)

@vote_routes.route('/<int:id>')
def singleVote(id):
    """
    Query for a Vote by id and returns that vote in a dictionary
    """
    vote = Vote.query.get(id)
    if vote:
      return vote.to_dict()
    else:
      return jsonify({'error': 'Vote does not exist'}), 404

@vote_routes.route('/new', methods=["POST"])
def createNewVote():
  """
  Creates a new vote.
  """
  request_data=request.get_json()
  form = voteForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  data = form.data
  if form.validate_on_submit():
    voteCheck = Vote.query.filter_by(userId=data['userId'], postId=data['postId']).first()
    if(voteCheck):
      return jsonify({'error': 'Vote already exists for user'}), 404
    newVote = Vote(
      postId = data['postId'],
      userId = data['userId'],
      vote = data['vote']
    )
    db.session.add(newVote)
    db.session.commit()
    return newVote.to_dict()
  return {"errors":form.errors}, 401


@vote_routes.route('/edit', methods=["PUT"])
def editVote():
  """
  Edits a vote.
  """
  request_data=request.get_json()
  form = voteForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  data = form.data
  if form.validate_on_submit():
    voteToEdit = Vote.query.filter_by(userId=data['userId'], postId=data['postId']).first()
    if voteToEdit:
      voteToEdit.postId = data['postId']
      voteToEdit.userId = data['userId']
      voteToEdit.vote = data['vote']
      db.session.commit()
      return voteToEdit.to_dict()
    else:
      return jsonify({'error': 'Vote does not exist'}), 404
  return {"errors":form.errors}, 401
