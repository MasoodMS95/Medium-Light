from app.models import db, Comment, environment, SCHEMA
from sqlalchemy.sql import text
import random
import string
from faker import Faker


def seed_comments():

  fake = Faker()
  def generate_random_post_id():
      return random.randint(1, 30)


  def generate_random_user_id():
      return random.randint(1, 3)


  def generate_random_comment():
      comment_length = random.randint(1, 255)
      comment = ''.join(random.choice(string.ascii_letters + string.digits + string.punctuation + string.whitespace) for _ in range(comment_length))
      return comment

  num_comments_to_generate = 30

  comments_to_add = []
  for _ in range(num_comments_to_generate):
      postId = generate_random_post_id()
      userId = generate_random_user_id()
      comment_text = fake.text(max_nb_chars=255)

      comment = Comment(
          postId=postId,
          userId=userId,
          comment=comment_text
      )
      comments_to_add.append(comment)

  for comment in comments_to_add:
      db.session.add(comment)

  db.session.commit()




# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM comments"))

    db.session.commit()
