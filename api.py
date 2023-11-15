
# A very simple Flask Hello World app for you to get started with...

from flask import Flask, render_template_string,jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS, cross_origin  # Importar la función cross_origin

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://ananavarro:elenalp12@ananavarro.mysql.pythonanywhere-services.com/ananavarro$api'
db = SQLAlchemy(app)
CORS(app, origins='*')  # Configuración de CORS para aceptar todos los orígenes


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
    images = db.relationship('ProductImage', backref='product', lazy=True)

    def __repr__(self):
        return f'<Product {self.title}>'

class ProductImage(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey('product.id'), nullable=False)
    image_url = db.Column(db.String(255), nullable=False)


@app.route('/')
def hello_world():

    db.create_all()
    with app.app_context():
        table_names = db.engine.table_names()

    # Crear una presentación HTML de los nombres de las tablas
    table_list = "<h1>Tablas en la base de datos:</h1><ul>"
    for table in table_names:
        table_list += f"<li>{table}</li>"
    table_list += "</ul>"

    # Retornar una página HTML con los nombres de las tablas
    return render_template_string(table_list)


# Ruta para obtener todos los productos
@cross_origin()  # Aplicar cross_origin como decorador a la función
@app.route('/products', methods=['GET'])
def get_products():
    products = Product.query.all()
    product_list = []
    for product in products:
        product_data = {
            'id': product.id,
            'title': product.title,
            'description': product.description,
            'price': product.price,
            'discountPercentage': product.discountPercentage,
            'rating': product.rating,
            'stock': product.stock,
            'brand': product.brand,
            'category': product.category,
            'thumbnail': product.thumbnail,
            # Puedes agregar más campos si es necesario
        }
        product_list.append(product_data)
    return jsonify({'products': product_list})



# Ruta para obtener un producto por su id
@cross_origin()  # Aplicar cross_origin como decorador a la función
@app.route('/products/<id>', methods=['GET'])
def get_product(id):
    product = Product.query.get_or_404(id)
    product_data = {
        'id': product.id,
        'title': product.title,
        'description': product.description,
        'price': product.price,
        'discountPercentage': product.discountPercentage,
        'rating': product.rating,
        'stock': product.stock,
        'brand': product.brand,
        'category': product.category,
        'thumbnail': product.thumbnail,
        'images': [img.image_url for img in product.images]  # Obtener las URLs de las imágenes asociadas al producto
        # Puedes agregar más campos si es necesario
    }
    return jsonify({'product': product_data})


# RUTA PARA BUSCAR LOS QUE ESTEN RELACIONADOS CON LA BUSQUEDA por categoria o titulo o marca
@cross_origin()  # Aplicar cross_origin como decorador a la función
@app.route('/products/search/<search>', methods=['GET'])
def get_product_search(search):
    products = Product.query.filter(Product.title.like('%'+search+'%') | Product.brand.like('%'+search+'%') | Product.category.like('%'+search+'%')).all()
    product_list = []
    for product in products:
        product_data = {
            'id': product.id,
            'title': product.title,
            'description': product.description,
            'price': product.price,
            'discountPercentage': product.discountPercentage,
            'rating': product.rating,
            'stock': product.stock,
            'brand': product.brand,
            'category': product.category,
            'thumbnail': product.thumbnail,
            # Puedes agregar más campos si es necesario
        }
        product_list.append(product_data)
    return jsonify({'products': product_list})






if __name__ == '__main__':
    # Crear la tabla antes de ejecutar la app
    with app.app_context():
        db.create_all()
    app.run()