from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Topic

topic_routes = Blueprint('topics', __name__)


@topic_routes.route('/')
@login_required
def topics():
    """
    Query for all topics and returns them in a list of topic dictionaries
    """
    topics = Topic.query.all()
    tObj = {}
    tObj['topics']={}
    for topic in topics:
      t = topic.to_dict()
      tObj['topics'][t['id']] = t
    return tObj


@topic_routes.route('/<int:id>')
@login_required
def topic(id):
    """
    Query for a topic by id and returns that topic in a dictionary
    """
    topic = Topic.query.get(id)
    return topic.to_dict()
