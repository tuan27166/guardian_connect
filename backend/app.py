from flask_cors import CORS
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from models import db, User, HelpRequest, Comment

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)

@app.route('/')
def home():
    return "Guardian Connect Backend Running"

@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    existing_user = User.query.filter_by(username=username).first()
    if existing_user:
        return jsonify({'message': 'Username already taken'}), 409

    new_user = User(username=username)
    new_user.set_password(password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User created successfully'}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    user = User.query.filter_by(username=username).first()
    if user and user.check_password(password):
        return jsonify({'message': 'Login successful'}), 200
    else:
        return jsonify({'message': 'Invalid username or password'}), 401

@app.route('/post_help', methods=['POST'])
def post_help():
    data = request.get_json()
    title = data.get('title')
    description = data.get('description')
    is_vip = data.get('is_vip', False)

    if not title or not description:
        return jsonify({'message': 'Title and description required'}), 400

    new_request = HelpRequest(title=title, description=description, is_vip=is_vip)
    db.session.add(new_request)
    db.session.commit()

    return jsonify({'message': 'Help request posted successfully'}), 201

@app.route('/help_requests', methods=['GET'])
def get_help_requests():
    help_requests = HelpRequest.query.all()
    results = []

    for req in help_requests:
        results.append({
            'id': req.id,
            'title': req.title,
            'description': req.description,
            'is_vip': req.is_vip
        })

    return jsonify(results), 200

@app.route('/clear_requests', methods=['DELETE'])
def clear_requests():
    HelpRequest.query.delete()
    db.session.commit()
    return jsonify({"message": "All requests cleared."}), 200

@app.route('/comments/<int:request_id>', methods=['POST'])
def add_comment(request_id):
    data = request.get_json()
    message = data.get('message')

    if not message:
        return jsonify({'message': 'Comment cannot be empty'}), 400

    new_comment = Comment(request_id=request_id, message=message)
    db.session.add(new_comment)
    db.session.commit()

    return jsonify({'message': 'Comment added'}), 201

@app.route('/comments/<int:request_id>', methods=['GET'])
def get_comments(request_id):
    comments = Comment.query.filter_by(request_id=request_id).all()
    result = [{'id': c.id, 'message': c.message} for c in comments]
    return jsonify(result), 200

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)

