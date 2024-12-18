from flask import Flask, jsonify, send_file, request
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

# Sample product data
PRODUCTS = [
    {
        "id": 1,
        "name": "Acme Prism T-Shirt",
        "price": 49.99,
        "description": "A perfect blend of style and comfort, crafted with 60% combed ringspun cotton and 40% polyester jersey.",
        "imageUrl": "http://127.0.0.1:8000/images/circles_tee.jpg"
    },
    {
        "id": 2,
        "name": "Acme Circles Tee",
        "price": 29.99,
        "description": "Stylish circular pattern tee",
        "imageUrl": "http://127.0.0.1:8000/images/circles_tee.jpg"
    },
    {
        "id": 3,
        "name": "Acme Stripes Hoodie",
        "price": 59.99,
        "description": "Comfortable striped hoodie",
        "imageUrl": "http://127.0.0.1:8000/images/stripes_hoodie.jpg"
    },
    {
        "id": 4,
        "name": "Acme Dots Sweatpants",
        "price": 39.99,
        "description": "Relaxed fit sweatpants with dot pattern",
        "imageUrl": "http://127.0.0.1:8000/images/dots_sweatpants.jpg"
    }
]

# Route to fetch all products
@app.route('/api/v1/products', methods=['GET'])
def get_products():
    return jsonify(PRODUCTS), 200

# Route to serve images
@app.route('/api/v1/images/<filename>', methods=['GET'])
def get_image(filename):
    image_dir = os.path.join(os.getcwd(), "images")
    image_path = os.path.join(image_dir, filename)
    if os.path.exists(image_path):
        return send_file(image_path, mimetype='image/jpg')
    else:
        return jsonify({"error": "Image not found"}), 404

# Route to upload new images
@app.route('/api/v1/upload', methods=['POST'])
def upload_image():
    if 'file' not in request.files:
        return jsonify({"error": "No file part in the request"}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    image_dir = os.path.join(os.getcwd(), "images")
    os.makedirs(image_dir, exist_ok=True)
    file_path = os.path.join(image_dir, file.filename)
    file.save(file_path)
    return jsonify({"message": "Image uploaded successfully", "file_path": file_path}), 201

@app.route('/api/v1/products/<int:product_id>', methods=['GET'])
def get_product(product_id):
    product = next((p for p in PRODUCTS if p['id'] == product_id), None)
    if product:
        return jsonify(product), 200
    return jsonify({"error": "Product not found"}), 404

if __name__ == '__main__':
    app.run(debug=True, port=8000)
