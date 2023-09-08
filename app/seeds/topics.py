from app.models import db, Topic, environment, SCHEMA
from sqlalchemy.sql import text



def seed_topics():
  topics_to_add = [
      Topic(topic='Art'),
      Topic(topic='History'),
      Topic(topic='Science'),
      Topic(topic='Technology'),
      Topic(topic='Health'),
      Topic(topic='Travel'),
      Topic(topic='Sports'),
      Topic(topic='Music'),
      Topic(topic='Movies'),
      Topic(topic='Food'),
      Topic(topic='Books'),
      Topic(topic='Fashion'),
      Topic(topic='Nature'),
      Topic(topic='Business'),
      Topic(topic='Education')
  ]

  for topic in topics_to_add:
      db.session.add(topic)

  db.session.commit()



# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_topics():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.topics RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM topics"))

    db.session.commit()
