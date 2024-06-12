"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from datetime import datetime
from flask_jwt_extended import create_access_token
from flask_jwt_extended import jwt_required
from flask_jwt_extended import get_jwt_identity
from api.models import db, Users, Posts, Comments


api = Blueprint('api', __name__)
CORS(api)  # Allow CORS requests to this API

@api.route('/signup', methods=['POST'])
def signup():
    response_body = {}
    email = request.json.get("email", None).lower()
    password = request.json.get("password", None)
    first_name = request.json.get("first_name", "")  
    last_name = request.json.get("last_name", "") 
    # logica de validación de email valido y password valida
    user = Users()
    user.email = email
    user.first_name = first_name
    user.last_name = last_name   
    user.password = password
    user.is_active = True
    db.session.add(user)
    db.session.commit()
    access_token = create_access_token(identity={'user_id' : user.id, 'user_is_admin' : user.is_admin})
    response_body["message"] = "User Created & Logged in"
    response_body["access_token"] = access_token
    return response_body, 200


@api.route('/hello', methods=['GET'])
def handle_hello():
    response_body = {}
    response_body ['message'] = "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    return response_body, 200

# Create a route to authenticate your users and return JWTs. The
# create_access_token() function is used to actually generate the JWT.
@api.route("/login", methods=['POST'])
def login():
    response_body = {}
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user = db.session.execute(db.select(Users).where(Users.email == email, Users.password == password, Users.is_active == True)).scalar()
    if user:
        access_token = create_access_token(identity={'user_id' : user.id, 'user_is_admin' : user.is_admin})
        response_body["message"] = "Login Succesful"
        response_body["access_token"] = access_token
        return response_body, 200
    response_body["message"] = "Bad username or password"
    return response_body, 401

# Protect a route with jwt_required, which will kick out requests
# without a valid JWT present.
@api.route("/profile", methods=["GET"])
@jwt_required()
def profile():
    response_body = {}
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    print(current_user)
    response_body["message"] = f'User succesfully logged in as: {current_user}'
    return response_body, 200

@api.route('/users', methods=['GET', 'POST'])
def handle_users():
    response_body = {}
    if request.method == 'GET':
        rows =db.session.execute(db.select(Users)).scalars()
        results = [row.serialize() for row in rows]
        response_body['results'] = results
        response_body['message'] = 'Users List. These are indeed the droids you are looking for!!!'
        return response_body, 200
    if request.method == 'POST':
        response_body['message'] = 'Invalid endpoint, Please sign up'
        return response_body, 200

@api.route('/users/<int:user_id>', methods=['GET', 'PUT', 'DELETE'])
def handle_user(user_id):
    response_body = {}
    if request.method == 'GET':
        user = db.session.execute(db.select(Users).where(Users.id == user_id)).scalar()
        if user:
            response_body['results'] = user.serialize()
            response_body['message'] = 'Usuario encontrado'
            return response_body, 200
        response_body['message'] = 'Usario inexistente'
        response_body['results'] = {}
        return response_body, 404
    if request.method == 'PUT':
        data = request.json
        # TODO: Validación de datos recibidos 
        print(data)
        user = db.session.execute(db.select(Users).where(Users.id == user_id)).scalar()
        if user:
            user.email = data['email']
            user.is_active = data['is_active']
            user.last_name = data['last_name']
            user.first_name = data['first_name']
            db.session.commit()
            response_body['message'] = 'User updated'
            response_body['results'] = user.serialize()
            return response_body, 200
        response_body['message'] = 'This is not the user you are looking for'
        response_body['results'] = {}
        return response_body, 404
    if request.method == 'DELETE':
        user = db.session.execute(db.select(Users).where(Users.id == user_id)).scalar()
        if user:
            # db.session.delete(user)
            user.is_active = False
            db.session.commit()
            response_body['message'] = 'Usuario eliminado'
            response_body['results'] = {}
        response_body['message'] = 'Usuario inexistente'
        response_body['results'] = {}
        return response_body, 200


@api.route('/posts', methods=['GET', 'POST'])
@jwt_required()
def handle_posts():
    response_body = {}
    current_user = get_jwt_identity()
    user_id = current_user['user_id']
    print(current_user)

    if request.method == 'GET':
        rows =db.session.execute(db.select(Posts)).scalars()
        results = [row.serialize() for row in rows]
        response_body['results'] = results
        response_body['message'] = 'Posts List. These are indeed the posts you are looking for!!!'
        return response_body, 200

    if request.method == 'POST':
        data = request.json
        row = Posts()
        row.title = data['title']
        row.description = data['description']
        row.body = data['body']
        row.image_url = data['image_url']
        row.date_publication = datetime.today()
        row.user_id = user_id # Lo obtengo del token
        db.session.add(row)
        db.session.commit()
        response_body['results'] = row.serialize()
        response_body['message'] = 'Post succesfully created'
        return response_body, 200

@api.route('/posts/<int:post_id>', methods=['GET', 'PUT', 'DELETE'])
@jwt_required()
def handle_post(post_id):
    response_body = {}
    current_user = get_jwt_identity()
    user_id = current_user['user_id']
    print(current_user)
    if request.method == 'GET':
        post = db.session.execute(db.select(Posts).where(Posts.id == post_id)).scalar()
        if post:
            response_body['results'] = post.serialize()
            response_body['message'] = "Post Found"
            return response_body, 200
        response_body['results'] = {}  
        response_body['message'] = ("These are not the posts you are looking for")
        return response_body, 404
    if request.method == 'PUT':
        data = request.json
        # TODO: Validación de datos recibidos 
        print(data)
        post = db.session.execute(db.select(Posts).where(Posts.id == post_id)).scalar()
        if post:
            post.title = data['title']
            post.user_id = user_id
            post.description = data['description']
            post.body = data['body']
            post.date_publication = data['date_publication']
            post.image_url = data['image_url']
            db.session.commit()
            response_body['message'] = 'Post succesfully edited'
            response_body['results'] = post.serialize()
            return response_body, 200
        response_body['message'] = 'No Existing such Post'
        response_body['results'] = {}
        return response_body, 404
    if request.method == 'DELETE':
        post = db.session.execute(db.select(Posts).where(Posts.id == post_id)).scalar()
        if post:
            db.session.delete(post)
            db.session.commit()
            response_body['message'] = 'Post succesfully eliminated'
            response_body['results'] = {}
            return response_body, 200
        response_body['message'] = 'No such existing Post'
        response_body['results'] = {}
        return response_body, 200

@api.route('/comments', methods=['GET', 'POST'])
@jwt_required()
def handle_comments():
    response_body = {}
    current_user = get_jwt_identity()
    user_id = current_user['user_id']
    print(current_user)

    if request.method == 'GET':
        rows =db.session.execute(db.select(Comments)).scalars()
        results = [row.serialize() for row in rows]
        response_body['results'] = results
        response_body['message'] = 'Comments List. These are indeed the comments you are looking for!!!'
        return response_body, 200

    if request.method == 'POST':
        data = request.json
        row = Comments()
        row.body = data['body']
        row.date_publication = datetime.today()
        row.user_id = user_id # Lo obtengo del token
        row.post_id = data['post_id']
        db.session.add(row)
        db.session.commit()
        response_body['results'] = row.serialize()
        response_body['message'] = 'Comment succesfully created'
        return response_body, 200

@api.route('/comments/<int:comment_id>', methods=['GET', 'PUT', 'DELETE'])
@jwt_required()
def handle_comment(comment_id):
    response_body = {}
    current_user = get_jwt_identity()
    user_id = current_user['user_id']
    print(current_user)
    if request.method == 'GET':
        comment = db.session.execute(db.select(Comments).where(Comments.id == comment_id)).scalar()
        if comment:
            response_body['results'] = comment.serialize()
            response_body['message'] = "Comment Found"
            return response_body, 200
        response_body['results'] = {}  
        response_body['message'] = ("These are not the comments you are looking for")
        return response_body, 404
    if request.method == 'PUT':
        data = request.json
        # TODO: Validación de datos recibidos 
        print(data)
        comment = db.session.execute(db.select(Comments).where(Comments.id == comment_id)).scalar()
        if comment:
            comment.title = data['title']
            comment.user_id = user_id
            comment.description = data['description']
            comment.body = data['body']
            comment.date_publication = data['date_publication']
            comment.image_url = data['image_url']
            db.session.commit()
            response_body['message'] = 'Post succesfully edited'
            response_body['results'] = post.serialize()
            return response_body, 200
        response_body['message'] = 'No Existing such Post'
        response_body['results'] = {}
        return response_body, 404
    if request.method == 'DELETE':
        comment = db.session.execute(db.select(Comments).where(Comments.id == comment_id)).scalar()
        if comment:
            db.session.delete(comment)
            db.session.commit()
            response_body['message'] = 'Post succesfully eliminated'
            response_body['results'] = {}
            return response_body, 200
        response_body['message'] = 'No such existing Post'
        response_body['results'] = {}
        return response_body, 200


# @api.route('/posts/<int:post_id>/comments', methods=['GET'])
# @api.route('/users/<int:user_id>/posts', methods=['GET'])
# @api.route('/users/<int:user_id>/comments', methods=['GET'])
# @api.route('/posts/<int:post_id>/users/<int:user_id>/comments', methods=['GET'])  # Solicitud genérica.abs

# @api.route('/posts/<int:post_id>/comments', methods=['GET'])
# @jwt_required()