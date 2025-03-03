import express from "express";
import ProductManager from "../ProductManager.js";
import Product from "../models/product.model.js";
const viewsRouter = express.Router();
const productManager = new ProductManager("./src/data/products.json");

viewsRouter.get("/", async(req, res)=> {
  try {
    const page = parseInt(req.query.page)||1
    const limit = 10
    const products = await Product.paginate({},{page,limit,lean:true});

    res.render("home", { products, style: "home.css" }); 
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

viewsRouter.get("/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id).lean();

    if (!product) {
      return res.status(404).render("404", { message: "Producto no encontrado", style: "error.css" });
    }

    res.render("productDetail", { product, style: "productDetail.css" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

viewsRouter.get("/realtimeproducts", async(req, res)=> {
  try {
    const limit = 5
    const products = await Product.paginate({},{limit,lean:true});
    res.render("realTimeProducts", { products, style:"realTimeProducts.css" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// Ruta para obtener un carrito específico por ID
viewsRouter.get("/cart/:id", async (req, res) => {
  try {
    const { id } = req.params; // Obtener el ID del carrito desde la URL
    const cart = await cartManager.getCartById(id); // Usamos CartManager para obtener el carrito por ID

    // Si el carrito no existe, mostramos un mensaje de error
    if (!cart) {
      return res.status(404).render("404", { message: "Carrito no encontrado", style: "error.css" });
    }

    // Renderizamos la vista del carrito, pasando los productos del carrito y el total
    let total = 0;
    cart.products.forEach(product => {
      total += product.quantity * product.product.price; // Calcula el total con las cantidades y precios
    });

    // Renderizamos la vista 'cartDetail', pasando el carrito y el total
    res.render("cartDetail", { cart, total, style: "cartDetail.css" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});



export default viewsRouter;