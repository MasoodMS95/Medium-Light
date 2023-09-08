from app.models import db, Post, environment, SCHEMA
from sqlalchemy.sql import text
import random
import string
from faker import Faker



def seed_posts():

  fake = Faker()

  def generate_random_user_id():
      return random.randint(1, 3)


  def generate_random_topic_id():
      return random.randint(1, 15)


  num_posts_to_generate = 30

  posts_to_add = []
  for _ in range(num_posts_to_generate):
      title = fake.text(max_nb_chars=50)[:50]
      body = fake.text(max_nb_chars=2500)
      userId = generate_random_user_id()
      topicId = generate_random_topic_id()

      post = Post(
          title=title,
          body=body,
          userId=userId,
          topicId=topicId
      )
      posts_to_add.append(post)

  for post in posts_to_add:
      db.session.add(post)

  db.session.commit()





# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_posts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.posts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM posts"))

    db.session.commit()
