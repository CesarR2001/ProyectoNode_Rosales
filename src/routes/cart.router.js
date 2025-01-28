import express from "express";
import CartManager from "../CartManager.js";

//instanciamos el router de express para manejar las rutas
const cartRouter = express.Router();
//instanciamos el manejador de nuestro archivo de carrito
const cartManager = new CartManager("./src/data/cart.json");

//POST "/"
// Ruta para agregar un nuevo carrito
cartRouter.post("/", async (req, res) => {
    try {
      const newCart = await cartManager.addCart(); // Llamamos al método addCart para agregar el carrito
      res.status(201).send(newCart); // Respondemos con el carrito recién creado
    } catch (error) {
      res.status(500).send({ message: error.message }); // Si ocurre un error, lo respondemos con el mensaje
    }
    });

//GET "/"
cartRouter.get("/", async(req, res)=> {
    try {
        const data = await cartManager.getCarts();
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
    })

//GET "/:cid"
cartRouter.get("/:id", async(req, res)=> {
    const {id}= req.params;
    try {
        const data = await cartManager.getCartById(id);
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
    })

//POST "/:cid/product/:pid"
cartRouter.post("/:cid/products/:pid", async (req, res) => {
    const { cid, pid } = req.params; // Obtenemos cartId (cid) y productId (pid) desde los parámetros de la URL
    const { quantity } = req.body; // Obtenemos la cantidad desde el cuerpo de la solicitud

    try {
      // Llamamos al método addProductInCartById para agregar el producto al carrito
        const updatedCart = await cartManager.addProductInCartById(cid, pid, quantity);
      res.status(200).send(updatedCart); // Respondemos con el carrito actualizado
    } catch (error) {
      res.status(500).send({ message: error.message }); // Si hay un error, respondemos con el mensaje
    }
    });

export default cartRouter;