from flask import Flask, jsonify, request,Response
from flask_marshmallow import Marshmallow
from flask_sqlalchemy import SQLAlchemy
import os,random,string
from datetime import datetime
from flask_cors import CORS
from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView
from flask_api import status

app = Flask(__name__)
app.config['SECRET_KEY'] = 'asdkn32knSDASdnakdnsNKANFSKF4434tSAFKMl'
CORS(app)
basedir = os.path.abspath(os.path.dirname(__file__))

app.config["SQLALCHEMY_DATABASE_URI"] = 'sqlite:///'+os.path.join(basedir,'db.sqlite')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
tokenId = '3pNd96G3NfQ36cASy5GWNB6vC03nCHhxfz1qmFaYwOTqhh5W3rDwBHidQ9ueBrY1Qucbk7'

def generate_user_id():
    alpha_numbers = string.ascii_letters + string.digits
    random_id = ''.join(random.choice(alpha_numbers) for i in range(32))
    return random_id

class InvalidUsage(Exception):
    status_code = 400

    def __init__(self, message, status_code=None, payload=None):
        Exception.__init__(self)
        self.message = message
        if status_code is not None:
            self.status_code = status_code
        self.payload = payload

    def to_dict(self):
        rv = dict(self.payload or ())
        rv['message'] = self.message
        return rv

@app.route('/api/login',methods=['POST'])
def post():
    print("INSIDE LOGIN METHOD")
    email = request.json['email']
    password = request.json['password']
    user = User.query.filter_by(email=email).first()
    if user is None: 
        raise InvalidUsage("Email is not registered",status_code=401)
    authenticated_user = User.query.filter_by(email=email,password=password).first()
    if authenticated_user is None:
        return Response("{'a':'b'}", status=401, mimetype='application/json')
    json_output = {'userId':authenticated_user.user_id, 'tokenId' : tokenId}
    return jsonify(json_output)


@app.route('/api/users',methods=['POST'])
def get():
    name = request.json['name']
    email = request.json['email']
    city = request.json['city']
    password = request.json['password']
    user = User.query.filter_by(email = email).first()
    if user is not None:
        return "Email already exists" , 400
    user = User(name=name,email=email,city=city,password=password)
    db.session.add(user)
    db.session.commit()
    user_output = User.query.filter_by(email=email).first()
    print(user_output.user_id)
    user_json_output = {"userId" : user_output.user_id, "email" : user_output.email, 'tokenId' : tokenId}
    print(user_json_output)
    return jsonify(user_json_output)

@app.route('/api/post/<post_id>',methods=['GET','POST'])
def get_fullpost(post_id):
    auth = request.args.get('auth')
    if auth!=tokenId:
        raise InvalidUsage("You are not authorized",status_code=401)
    if request.method == 'POST':
        post = Post.query.get(post_id)
        post.title = request.json['title']
        post.text = request.json['text']
        category = Category.query.filter_by(name = request.json['category']).first()
        post.category = category
        db.session.commit()
        return "Post Edited Successfully"
    post = Post.query.get(post_id)
    json_output = {'user_id':post.user.user_id,'post_id': post_id,'title':post.title,'text':post.text,'published_date':post.pub_date,'category':post.category.name,'author':post.user.name}
    return jsonify(json_output)

@app.route('/api/post/<post_id>/delete', methods=['GET'])
def delete_post(post_id):
    auth = request.args.get('auth')
    if auth!=tokenId:
        raise InvalidUsage("You are not authorized",status_code=401)
    post = Post.query.get(post_id)
    db.session.delete(post)
    db.session.commit()
    return "Post Deleted"

@app.route('/api/post/<post_id>/comments',methods=['GET'])
def get_comments(post_id):
    post = Post.query.get(post_id)
    comments = Comment.query.filter_by(post=post)
    json_comments = []
    for comment in comments:
        comment_dict = {}
        comment_dict['text']=comment.text
        comment_dict['author'] = comment.user.name
        comment_dict['created_at'] = comment.created_at
        json_comments.append(comment_dict)
    return jsonify(json_comments)

@app.route('/api/post/<post_id>/comment',methods=["POST"])
def post_comment(post_id):
    auth = request.args.get('auth')
    if auth!=tokenId:
        raise InvalidUsage("You are not authorized",status_code=401)
    text = request.json['comment']
    userId = request.json['userId']
    user = User.query.get(userId)
    post = Post.query.get(post_id)
    comment = Comment(text=text,user=user,post=post)
    db.session.add(comment)
    db.session.commit()
    return "Comment submitted successfully"

@app.route('/api/allposts',methods=["GET"])
def get_all_post():
    posts = Post.query.all()
    
    all_posts = []
    for post in posts:
        post_dict = {}
        post_dict['post_id'] = post.post_id
        post_dict['title'] = post.title
        post_dict['text'] = post.text
        post_dict['published_date'] = post.pub_date
        post_dict['category'] = post.category.name
        post_dict['author'] = post.user.name
        all_posts.append(post_dict)
    return jsonify(all_posts)

@app.route('/api/posts',methods=["POST","GET"])
def post_posts():
    auth = request.args.get('auth')
    if auth!=tokenId:
        raise InvalidUsage("You are not authorized",status_code=401)
    if request.method == 'POST':
        title = request.json['title']
        category = request.json['category']
        user_id = request.json['userId']
        text = request.json['text']
        user = User.query.filter_by(user_id = user_id).first()
        cat = Category.query.filter_by(name=category).first()
        
        post = Post(title=title,text=text,user=user,category=cat)
        db.session.add(post)
        db.session.commit()
        return "Post submitted", 200
    else:
        userId = request.args.get('userId')
        user = User.query.filter_by(user_id = userId).first()
        posts = Post.query.filter_by(user=user).all()
        all_posts = []
        for post in posts:
            post_dict = {}
            post_dict['post_id'] = post.post_id
            post_dict['title'] = post.title
            post_dict['text'] = post.text
            post_dict['published_date'] = post.pub_date
            post_dict['category'] = post.category.name
            post_dict['author'] = post.user.name
            all_posts.append(post_dict)
        return jsonify(all_posts)

db = SQLAlchemy(app)

class User(db.Model):
    user_id = db.Column(db.String(50), primary_key=True)
    name = db.Column(db.String(100),nullable=False)
    email = db.Column(db.String(100),nullable=False,unique=True)
    password = db.Column(db.String(100),nullable=False,)
    city = db.Column(db.String(50),nullable=False)

    def __init__(self,name,email,password,city):
        self.user_id = generate_user_id()
        self.name = name
        self.password= password
        self.email = email
        self.city = city

    def __repr__(self):
        return self.email

class Post(db.Model):
    post_id = db.Column(db.Integer,primary_key=True)
    post_user_id = db.Column(db.String(50),db.ForeignKey('user.user_id'),nullable=False)
    category_id = db.Column(db.Integer,db.ForeignKey('category.id'),nullable=False)
    category = db.relationship('Category',backref=db.backref('category_posts',lazy=True))
    user = db.relationship('User',backref=db.backref('posts',lazy=True))
    title = db.Column(db.String(100),nullable=False)
    text = db.Column(db.Text(),nullable=False)
    pub_date = db.Column(db.DateTime(),default=datetime.utcnow)

    def __init__(self,title,text,user,category):
        self.title = title
        self.text = text 
        self.user = user
        self.category = category

    def __repr__(self):
        return self.title

class Comment(db.Model):
    id = db.Column(db.Integer,primary_key=True)
    user = db.relationship('User')
    comment_user_id = db.Column(db.Integer,db.ForeignKey('user.user_id'))
    comment_post_id = db.Column(db.Integer,db.ForeignKey('post.post_id'))
    post = db.relationship('Post')
    text = db.Column(db.String,nullable=False)
    created_at = db.Column(db.DateTime(),default=datetime.utcnow())

    def __init__(self,user,text,post):
        self.user = user
        self.text = text
        self.post = post

class Category(db.Model):
    id = db.Column(db.Integer,primary_key=True)
    name = db.Column(db.String(50),nullable=False)

    def __init__(self,name):
        self.name = name

    def __repr__(self):
        return self.name

if __name__ == '__main__':
    db.create_all()
    admin = Admin(app, name='microblog', template_mode='bootstrap3')
    admin.add_view(ModelView(User, db.session))
    admin.add_view(ModelView(Post, db.session))
    admin.add_view(ModelView(Category, db.session))
    admin.add_view(ModelView(Comment, db.session))
    app.run(debug=True)