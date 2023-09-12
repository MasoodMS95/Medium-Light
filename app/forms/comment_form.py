from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, SubmitField, IntegerField, FormField
from wtforms.validators import DataRequired, Length, ValidationError
from app.models import Comment

class commentForm(FlaskForm):
  postId = IntegerField("PostId", validators=[DataRequired()])
  userId = IntegerField("UserId", validators=[DataRequired()])
  comment = StringField("Comment", validators=[DataRequired()])

  def to_dict(self):
    return{
      'postId': self.postId.data,
      'userId': self.userId.data,
      'comment': self.comment.data
    }
