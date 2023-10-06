from flask_wtf import FlaskForm
from wtforms import BooleanField, SubmitField, IntegerField, FormField
from wtforms.validators import DataRequired, Length, ValidationError
from app.models import Vote

def validate_boolean(form, field):
    if field.data is not None and not isinstance(field.data, bool):
        raise ValidationError("Field must be a boolean value.")

class newVoteForm(FlaskForm):
  userId = IntegerField("UserId", validators=[DataRequired()])
  postId = IntegerField("TopicId", validators=[DataRequired()])
  vote = BooleanField("Vote", validators=[validate_boolean])

  def to_dict(self):
    return{
      'userId': self.userId.data,
      'postId':self.postId.data,
      'vote':self.vote.data
    }

class editVoteForm(FlaskForm):
  vote = BooleanField("Vote", validators=[validate_boolean])

  def to_dict(self):
    return{
      'vote': self.vote.data
    }
