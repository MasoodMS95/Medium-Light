from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Post, db
from ..forms import postForm

post_routes = Blueprint('posts', __name__)


@post_routes.route('/')
def allPosts():
    """
    Query for all posts and returns them in a list of post dictionaries
    """
    posts = Post.query.all()
    return {'posts': [post.to_dict() for post in posts]}


@post_routes.route('/<int:id>')
def singlePost(id):
    """
    Query for a Post by id and returns that post in a dictionary
    """
    post = Post.query.get(id)
    return post.to_dict()


@post_routes.route('/new', methods=["POST"])
def createNewPost():
  """
  Creates a new post.
  """
  request_data=request.get_json()
  form = postForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  data = form.data
  if form.validate_on_submit():
    newPost = Post(
      title = data["title"],
      body = data["body"],
      userId = data["userId"],
      topicId = data["topicId"]
    )
    db.session.add(newPost)
    db.session.commit()
    return newPost.to_dict()
  return {"errors":form.errors}, 401

@post_routes.route('/edit/<int:id>', methods=["PUT"])
def editPost(id):
  """
  Edits a post.
  """
  request_data=request.get_json()
  form = postForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  data = form.data
  if form.validate_on_submit():
    postToEdit = Post.query.get(id)
    postToEdit.title = data["title"]
    postToEdit.body = data["body"]
    postToEdit.userId = data["userId"]
    postToEdit.topicId = data["topicId"]
    db.session.commit()
    return postToEdit.to_dict()
  return {"errors":form.errors}, 401
