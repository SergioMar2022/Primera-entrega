const express = require('express');
const fs = require('fs');
const app = express();
const PORT = "ÿ÷ÿ÷"; // Puerto a utilizar

// Middleware para manejar el body de las solicitudes
app.use(express.json());

// Rutas para productos
const productsRouter = express.Router();
const productsFilePath = './productos.json';

// Obtener todos los productos
productsRouter.get('/', (req, res) => {
  let products = JSON.parse(fs.readFileSync(productsFilePath));
  if (req.query.limit) {
    products = products.slice(0, req.query.limit);
  }
  res.json(products);
});

// Obtener un producto por id
productsRouter.get('/:pid', (req, res) => {
  const products = JSON.parse(fs.readFileSync(productsFilePath));
  const product = products.find(p => p.id == req.params.pid);
  if (product) {
    res.json(product);
  } else {
    res.status(404).send('Producto no encontrado');
  }
});

// Agregar un nuevo producto
productsRouter.post('/', (req, res) => {
  const products = JSON.parse(fs.readFileSync(productsFilePath));
  const newProduct = {
    id: Math.floor(Math.random() * 1000), // Generar un id aleatorio
    title: req.body.title,
    description: req.body.description,
    code: req.body.code,
    price: req.body.price,
    status: req.body.status !== undefined ? req.body.status : true, // Por defecto true
    stock: req.body.stock,
    category: req.body.category,
    thumbnails: req.body.thumbnails || [] // Si no se especifica, se crea un array vacío
  };
  products.push(newProduct);
  fs.writeFileSync(productsFilePath, JSON.stringify(products));
  res.json(newProduct);
});

// Actualizar un producto existente
productsRouter.put('/:pid', (req, res) => {
  const products = JSON.parse(fs.readFileSync(productsFilePath));
  const index = products.findIndex(p => p.id == req.params.pid);
  if (index !== -1) {
    const updatedProduct = {
      id: req.params.pid,
      title: req.body.title,
      description: req.body.description,
      code: req.body.code,
      price: req.body.price,
      status: req.body.status !== undefined ? req.body.status : true,
      stock: req.body.stock,
      category: req.body.category,
      thumbnails: req.body.thumbnails || []
    };
    products[index] = updatedProduct;
    fs.writeFileSync(productsFilePath, JSON.stringify(products));
    res.json(updatedProduct);
  } else {
    res.status(404).send('Producto no encontrado');
  }
});

// Eliminar un producto por id
productsRouter.delete('/:pid', (req, res) => {
  let products = JSON.parse(fs.readFileSync(productsFilePath));
  products = products.filter(p => p.id != req.params.pid);
  fs.writeFileSync(productsFilePath, JSON.stringify(products));
  res.send('Producto eliminado');
});

app.use('/api/products', productsRouter);

// Rutas para carritos
const cartsRouter = express.Router();
const cartsFilePath = './carrito.json';

// Crear un nuevo carrito
cartsRouter.post('/'), (req, res) => {
  const carts = JSON.parse(fs.readFileSync(cartsFilePath))};
  const newCart = {
    id: Math.floor(Math.random() * 1000),
    products: []
  };
  carts.push(newCart);
  fs.writeFileSync(cartsFilePath, JSON.stringify(carts));
  res.json(newCart)

