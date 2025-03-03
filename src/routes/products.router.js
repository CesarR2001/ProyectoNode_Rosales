import express from "express";
import ProductManager from "../ProductManager.js";

const productsRouter = express.Router();
const productManager = new ProductManager();

// Obtener todos los productos
productsRouter.get("/", async (req, res) => {
  try {
    const products = await productManager.getProducts();
    res.status(200).send(products);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});


// Obtener un producto por ID
productsRouter.get("/:id", async (req, res) => {
  try {
    const product = await productManager.getProductById(req.params.id);
    res.status(200).send(product);
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});

// Agregar un nuevo producto
productsRouter.post("/", async (req, res) => {
  try {
    const newProduct = await productManager.addProduct(req.body);
    res.status(201).send(newProduct);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// Actualizar un producto por ID
productsRouter.put("/:id", async (req, res) => {
  try {
    const updatedProduct = await productManager.updateProductById(req.params.id, req.body);
    res.status(200).send(updatedProduct);
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});

// Eliminar un producto por ID
productsRouter.delete("/:id", async (req, res) => {
  try {
    const deletedProduct = await productManager.deleteProductById(req.params.id);
    res.status(200).send({ message: "Producto eliminado", deletedProduct });
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});

export default productsRouter;
