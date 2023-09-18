# Medium Light

Medium Light is a hybrid of Medium.com and classic open communication sites like Reddit, 4chan, and AIM. The sites goal is to promote conversation with EVERYONE on the site, not just people you follow and subscribe to, with the latest posts shown being the ones that have the most activity. All presented with a classic retro look.

# Live Link
https://medium-light.onrender.com

## Tech Stack
### Frameworks and Libraries
![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54) ![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white) ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white) ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white) ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)

 ### Database:
 ![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)

 ### Hosting:
 ![Render](https://img.shields.io/badge/Render-%46E3B7.svg?style=for-the-badge&logo=render&logoColor=white)

# Index

[Feature List](https://github.com/MasoodMS95/Medium-Light/wiki/MVP-Feature-List) | [Database Schema](https://github.com/MasoodMS95/Medium-Light/wiki/Database-Schema-Image) | [User Stories](https://github.com/MasoodMS95/Medium-Light/wiki/User-Stories) | [Wireframes](https://github.com/MasoodMS95/Medium-Light/wiki/Wireframe)

# Landing Page

![Alt text](image.png)


 # Article Page
![Alt text](image-1.png)


# New Article Page
![Alt text](image-2.png)



# Endpoints

## AUTH

### Sign up

| Request           | Purpose                              | Response                                |
| ----------------- | ------------------------------------ | --------------------------------------- |
| `POST /api/auth/signup` | Create a new user account.           | `{"email": "user@example.com", "id": 1, "username": "user"}` |

### Login

| Request           | Purpose                              | Response                                |
| ----------------- | ------------------------------------ | --------------------------------------- |
| `POST /api/auth/login` | Authenticate and log in a user.     | `{"email": "user@example.com", "id": 1, "username": "user"}` |

### Logout

| Request           | Purpose                              | Response                                |
| ----------------- | ------------------------------------ | --------------------------------------- |
| `GET /api/auth/logout` | Log out the currently authenticated user. | `{"message": "User logged out"}` |

### Get all users

| Request           | Purpose                              | Response                                |
| ----------------- | ------------------------------------ | --------------------------------------- |
| `GET /api/users/` | Retrieve a list of all users.        | `{"users": [{"email": "user@example.com", "id": 1, "username": "user"}]}` |

### Get current user

| Request           | Purpose                              | Response                                |
| ----------------- | ------------------------------------ | --------------------------------------- |
| `GET /api/auth`   | Retrieve information about the currently authenticated user. | `{"email": "user@example.com", "id": 1, "username": "user"}` |

## TOPICS

### Get all topics

| Request           | Purpose                              | Response                                |
| ----------------- | ------------------------------------ | --------------------------------------- |
| `GET /api/topics` | Retrieve a list of all topics.      | `{"topics": {"1": {"id": 1, "topic": "Art"}}}` |

### Get single topic

| Request           | Purpose                              | Response                                |
| ----------------- | ------------------------------------ | --------------------------------------- |
| `GET /api/topics/:id` | Retrieve information about a single topic by its ID. | `{"id": 1, "topic": "topic"}` |

## POSTS

### Get all posts

| Request           | Purpose                              | Response                                |
| ----------------- | ------------------------------------ | --------------------------------------- |
| `GET /api/posts`  | Retrieve a list of all posts.        | `{"posts": [{"body": "Sample body", "comments": [], "createdAt": "2023-09-17T12:00:00Z", "id": 1, "title": "Sample Title", "topicId": 1, "updatedAt": "2023-09-17T12:00:00Z", "userId": 2}]}` |

### Get single post

| Request           | Purpose                              | Response                                |
| ----------------- | ------------------------------------ | --------------------------------------- |
| `GET /api/posts/:id` | Retrieve information about a single post by its ID. | `{"body": "Sample body", "comments": [], "createdAt": "2023-09-17T12:00:00Z", "id": 1, "title": "Sample Title", "topicId": 1, "updatedAt": "2023-09-17T12:00:00Z", "userId": 2}` |

### Create a post

| Request           | Purpose                              | Response                                |
| ----------------- | ------------------------------------ | --------------------------------------- |
| `POST /api/posts/new` | Create a new post.                  | `{"body": "Sample body", "comments": [], "createdAt": "2023-09-17T12:00:00Z", "id": 1, "title": "Sample Title", "topicId": 1, "updatedAt": "2023-09-17T12:00:00Z", "userId": 2}` |

### Edit a post

| Request           | Purpose                              | Response                                |
| ----------------- | ------------------------------------ | --------------------------------------- |
| `PUT /api/posts/edit/:id` | Edit an existing post.          | `{"body": "Updated body", "comments": [], "createdAt": "2023-09-17T12:00:00Z", "id": 1, "title": "Updated Title", "topicId": 1, "updatedAt": "2023-09-17T12:00:00Z", "userId": 2}` |

### Delete a post

| Request           | Purpose                              | Response                                |
| ----------------- | ------------------------------------ | --------------------------------------- |
| `DELETE /api/posts/:id` | Delete a post by its ID.         | `{"message": "Post deleted"}` |

## COMMENTS

### Get all comments

| Request                | Purpose                                      | Response                                |
| ---------------------- | -------------------------------------------- | --------------------------------------- |
| `GET /api/comments`    | Retrieve a list of all comments.             | `{"comments": [{"comment": "Sample Comment", "createdAt": "2023-09-17T12:00:00Z", "id": 1, "postId": 1, "updatedAt": "2023-09-17T12:00:00Z", "userId": 2}]}` |

### Get single comment

| Request                | Purpose                                      | Response                                |
| ---------------------- | -------------------------------------------- | --------------------------------------- |
| `GET /api/comments/:id` | Retrieve information about a single comment by its ID. | `{"comment": "Sample Comment", "createdAt": "2023-09-17T12:00:00Z", "id": 1, "postId": 1, "updatedAt": "2023-09-17T12:00:00Z", "userId": 2}` |

### Create a comment

| Request                | Purpose                                      | Response                                |
| ---------------------- | -------------------------------------------- | --------------------------------------- |
| `POST /api/comments/new` | Create a new comment.                       | `{"comment": "Sample Comment", "createdAt": "2023-09-17T12:00:00Z", "id": 1, "postId": 1, "updatedAt": "2023-09-17T12:00:00Z", "userId": 2}` |

### Edit a comment

| Request                | Purpose                                      | Response                                |
| ---------------------- | -------------------------------------------- | --------------------------------------- |
| `PUT /api/comments/edit/:id` | Edit an existing comment.              | `{"comment": "Updated Comment", "createdAt": "2023-09-17T12:00:00Z", "id": 1, "postId": 1, "updatedAt": "2023-09-17T12:00:00Z", "userId": 2}` |

### Delete a comment

| Request                | Purpose                                      | Response                                |
| ---------------------- | -------------------------------------------- | --------------------------------------- |
| `DELETE /api/comments/:id` | Delete a comment by its ID.             | `{"message": "Comment deleted"}` |

# Feature List
1. User Accounts
2. Posts
3. Comments

# Future Implementation Goals

1. Voting
2. AWS Images

# Connect
[LinkedIn](https://www.linkedin.com/in/masoodms/)
