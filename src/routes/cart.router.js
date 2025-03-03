import express from "express";
import CartManager from "../CartManager.js";

const cartRouter = express.Router();
const cartManager = new CartManager(); // Ahora funciona con MongoDB

// POST "/"
// Crear un nuevo carrito
cartRouter.post("/", async (req, res) => {
  try {
    const newCart = await cartManager.addCart();
    res.status(201).json(newCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET "/"
// Obtener todos los carritos
cartRouter.get("/", async (req, res) => {
  try {
    const carts = await cartManager.getCarts();
    res.status(200).json(carts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET "/:cid"
// Obtener un carrito por ID
cartRouter.get("/:cid", async (req, res) => {
  try {
    const cart = await cartManager.getCartById(req.params.cid);
    res.status(200).json(cart);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// POST "/:cid/products/:pid"
// Agregar un producto a un carrito
cartRouter.post("/:cid/products/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity = 1 } = req.body; // Si no se envía cantidad, por defecto es 1

  try {
    const updatedCart = await cartManager.addProductInCartById(cid, pid, quantity);
    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE "/api/carts/:cid/products/:pid" 
// Eliminar un producto específico del carrito
cartRouter.delete("/:cid/products/:pid", async (req, res) => {
  const { cid, pid } = req.params;

  try {
    const updatedCart = await cartManager.removeProductFromCart(cid, pid);
    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT "/api/carts/:cid" 
// Actualizar el carrito con un array de productos
cartRouter.put("/:cid", async (req, res) => {
  const { cid } = req.params;
  const { products } = req.body; // Se espera un array de productos

  try {
    const updatedCart = await cartManager.updateCart(cid, products);
    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT "/api/carts/:cid/products/:pid"
// Actualizar SOLO la cantidad de un producto específico en el carrito
cartRouter.put("/:cid/products/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body; // Nueva cantidad del producto

  if (quantity <= 0) {
    return res.status(400).json({ message: "La cantidad debe ser mayor a 0" });
  }

  try {
    const updatedCart = await cartManager.updateProductQuantityInCart(cid, pid, quantity);
    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE "/api/carts/:cid"
// Vaciar el carrito (eliminando todos los productos) sin borrar el carrito
cartRouter.delete("/:cid", async (req, res) => {
  const { cid } = req.params;

  try {
    const emptyCart = await cartManager.emptyCart(cid);
    res.status(200).json(emptyCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// PUT "/api/carts/:cid/products/:pid"
// Actualizar SOLO la cantidad de un producto específico en el carrito
cartRouter.put("/:cid/products/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body; // Nueva cantidad del producto

  if (quantity <= 0) {
    return res.status(400).json({ message: "La cantidad debe ser mayor a 0" });
  }

  try {
    const updatedCart = await cartManager.updateProductQuantityInCart(cid, pid, quantity);
    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE "/api/carts/:cid"
// Vaciar el carrito (eliminando todos los productos) sin borrar el carrito
cartRouter.delete("/:cid", async (req, res) => {
  const { cid } = req.params;

  try {
    const emptyCart = await cartManager.emptyCart(cid);
    res.status(200).json(emptyCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


export default cartRouter;
