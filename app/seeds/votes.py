from app.models import db, Vote, environment, SCHEMA
from sqlalchemy.sql import text
import random

def seed_votes():

  def generate_random_post_id():
      return random.randint(1, 30)


  def generate_random_user_id():
      return random.randint(1, 3)

  num_votes_to_generate = 150

  votes_to_add = []
  for _ in range(num_votes_to_generate):
      postId = generate_random_post_id()
      userId = generate_random_user_id()

      vote = Vote(
          postId=postId,
          userId=userId,
          vote=(random.randint(1,2)==1)
      )
      votes_to_add.append(vote)

  for vote in votes_to_add:
      db.session.add(vote)

  db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_votes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.votes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM votes"))

    db.session.commit()
