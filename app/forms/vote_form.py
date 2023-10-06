from flask_wtf import FlaskForm
from wtforms import BooleanField, SubmitField, IntegerField, FormField
from wtforms.validators import DataRequired, Length, ValidationError
from app.models import Vote

class voteForm(FlaskForm):
  userId = IntegerField("UserId", validators=[DataRequired()])
  postId = IntegerField("TopicId", validators=[DataRequired()])
  vote = BooleanField("Vote")

  def to_dict(self):
    return{
      'userId': self.userId,
      'postId':self.postId,
      'vote':self.vote
    }
