from app.models import db, Vote, environment, SCHEMA
from sqlalchemy.sql import text
import random

def seed_votes():

  def generate_random_post_id():
      return random.randint(1, 30)


  def generate_random_user_id():
      return random.randint(1, 3)
  posts = 30
  users = 3

  votes_to_add = []
  uniqueSets = []
  for uid in range (2, users+1):
    for pid in range(1, posts+1):
      vote = Vote(
          postId=pid,
          userId=uid,
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
