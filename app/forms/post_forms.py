from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, SubmitField, IntegerField, FormField
from wtforms.validators import DataRequired, Length, ValidationError
from app.models import Post

class postForm(FlaskForm):
  title = StringField("Title", validators=[DataRequired()])
  body = StringField("Body", validators=[DataRequired()])
  userId = IntegerField("UserId", validators=[DataRequired()])
  topicId = IntegerField("TopicId", validators=[DataRequired()])

  def to_dict(self):
    return{
      'title': self.title.data,
      'body': self.body.data,
      'userId': self.userId.data,
      'topicId': self.topicId.data
    }
