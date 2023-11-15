from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://ananavarro:elenalp12@ananavarro.mysql.pythonanywhere-services.com/ananavarro$api'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(255))
    price = db.Column(db.Float, nullable=False)
    discountPercentage = db.Column(db.Float)
    rating = db.Column(db.Float)
    stock = db.Column(db.Integer)
    brand = db.Column(db.String(50))
    category = db.Column(db.String(50))
    thumbnail = db.Column(db.String(255))

    def __repr__(self):
        return f'<Product {self.title}>'

class ProductImage(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey('product.id'), nullable=False)
    image_url = db.Column(db.String(255), nullable=False)


# Crear la tabla en la base de datos
with app.app_context():
    db.create_all()
