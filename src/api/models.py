from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()


class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    is_admin = db.Column(db.Boolean(), unique=False, nullable=False)
    first_name = db.Column(db.String(), unique=False, nullable=True)
    last_name = db.Column(db.String(), unique=False, nullable=True)

    def __repr__(self):
        return f'<User: {self.email} - {self.id}>'

    def serialize(self):
    # Do not serialize the password, its a security breach
        return {"id": self.id,
                "email": self.email,
                'is_active': self.is_active,
                'is_admin': self.is_admin,
                'first_name': self.first_name,
                'last_name': self.first_name}


class Posts(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    title = db.Column(db.String(), nullable=False)
    description = db.Column(db.String(), nullable=True)
    body = db.Column(db.String(), nullable=True)
    date_publication = db.Column(db.Date(), nullable=True)
    image_url = db.Column(db.String(), nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user_to = db.relationship('Users', foreign_keys=[user_id])

    def __repr__(self):
        return f'<Post: {self.title}>'

    def serialize(self):
    # Do not serialize the password, its a security breach
        return {"post_id": self.id,
                'date_publication': self.date_publication, 
                "title": self.title,
                'user_id': self.user_id,
                'description': self.description,
                'body': self.body}


class Comments(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    body = db.Column(db.String(), nullable=True)
    date_publication = db.Column(db.Date(), nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user_to = db.relationship('Users', foreign_keys=[user_id])
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'))
    post_to = db.relationship('Posts', foreign_keys=[post_id])

    def __repr__(self):
            return f'<Comments: {self.id}>'

    def serialize(self):
        return {"comment_id": self.id,
                'body': self.body,
                'date_publication': self.date_publication, 
                'user_id': self.user_id,
                'post_id': self.post_id}


class Characters(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    name = db.Column(db.String(), nullable=True)
    description = db.Column(db.String(), nullable=True)
    home_world_id = db.Column(db.Integer(), db.ForeignKey('planets.id'))
    home_world_to = db.relationship('Planets', foreign_keys=[home_world_id])

    def __repr__(self):
        return f'<Characters: {self.name}>'

    def serialize(self):   
        return {"character_id": self.id,
                'name': self.name,
                'description': self.description, 
                'home_worl_id': self.home_worl_id,
                }


class FavoriteCharacters(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    favorited_by_id = db.Column(db.Integer(), db.ForeignKey('users.id'))
    favorited_to = db.relationship('Users', foreign_keys=[favorited_by_id])



class Planets(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    name = db.Column(db.String(), nullable=True)
    diameter = db.Column(db.String(), nullable=True)
    terrain = db.Column(db.String(), nullable=True)
    climate = db.Column(db.String(), nullable=True)
    rotation_period = db.Column(db.String(), nullable=True)
    gravity = db.Column(db.String(), nullable=True)
    
    def __repr__(self):
        return f'<Planets: {self.name}>'

    def serialize(self):
    # Do not serialize the password, its a security breach
        return {"planet_id": self.id,
                'name': self.name,
                'diameter': self.diameter,
                'terrain': self.terrain,
                'climate': self.climate,
                'gravity': self.gravity,
                'rotation_period': self.rotation_period
                }

class Starships(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    name = db.Column(db.String(), nullable=True)
    starship_class = db.Column(db.String(), nullable=True)
    hyperdrive_rating = db.Column(db.String(), nullable=True)
    model = db.Column(db.String(), nullable=True)
    crew = db.Column(db.String(), nullable=True)
    manufacturer = db.Column(db.String(), nullable=True)
    cost_in_credits = db.Column(db.String(), nullable=True)
    cargo_capacity = db.Column(db.String(), nullable=True)

    def __repr__(self):
        return f'<Planets: {self.name}>'

    def serialize(self):
    # Do not serialize the password, its a security breach
        return {"planet_id": self.id,
                'name': self.name,
                'starship_class': self.starship_class,
                'hyperdrive_rating': self.hyperdrive_rating,
                'model': self.model,
                'manufacturer': self.manufacturer,
                'crew': self.crew,
                'cost_in_credits': self.cost_in_credits,
                'cargo_capacity': self.cargo_capacity
                }

class Followers(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    followed_by_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    followed_by_to = db.relationship('Users', foreign_keys=[followed_by_id])
    you_follow_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    you_follow_to = db.relationship('Users', foreign_keys=[you_follow_id])
        
    def __repr__(self):
        return f'<Followers: {self.followers}>'

    def serialize(self):    
        return {'followed_by_id': self.followed_by_id,
                'you_follow_id': self.you_follow_id} 
                