import express from "express";
import ProductManager from "../ProductManager.js";


//instanciamos el router de express para manejar las rutas
const productsRouter = express.Router();
//instanciamos el manejador de nuestro archivo de productos
const productManager = new ProductManager("./src/data/products.json");

//GET "/"
productsRouter.get("/", async(req, res)=> {
  try {
    const data = await productManager.getProducts();
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
})

//GET "/:pid"
productsRouter.get("/:id", async(req, res)=> {
  const {id} = req.params;
  try {
    const product = await productManager.getProductById(id);
    res.status(200).send(product);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
})


//POST "/"
productsRouter.post("/", async(req, res)=> {
  const newProduct = req.body
  try {
    const aggProduct = await productManager.addProduct(newProduct);
    res.status(201).send(aggProduct)
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
})


//PUT "/:pid"
productsRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const updatedFields = req.body;

  try {
    const updatedProduct = await productManager.updateProductById(id, updatedFields);
    res.status(200).send(updatedProduct);
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});



//DELETE "/:pid"
productsRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProduct = await productManager.deleteProductById(id);
    res.status(200).send({
      message: "Producto eliminado con éxito",
      deletedProduct,
    });
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});

export default productsRouter;