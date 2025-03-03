import Product from "./models/product.model.js";

class ProductManager{
  constructor(){
  }

  //getProducts
  getProducts = async() => {
    try {
      return await Product.find();
    } catch (error) {
      throw new Error(`Error al leer el archivo de productos: ${error.message}`)
    }
  }

  //getProductById
  getProductById = async (id) => {
    try {
      const product = await Product.findById(id);
      if (!product) throw new Error("Producto no encontrado");
      return product;
    } catch (error) {
      throw new Error(`Error al obtener el producto: ${error.message}`);
    }
  };
  //addProduct
  addProduct = async (product) => {
    try {
      // Validar que los campos obligatorios (excepto id, status y thumbnail) estén presentes
      const requiredFields = ["title", "description", "code", "price", "stock", "category"];
      for (const field of requiredFields) {
        if (!product[field] && product[field] !== 0) {
          throw new Error(`El campo '${field}' es obligatorio`);
        }
      }
      
      const newProduct = await Product.create(product);
      return newProduct;

    } catch (error) {
      throw new Error(`Error al agregar el producto: ${error.message}`);
    }
  }

  //updateProductById
  updateProductById = async (id, updatedFields) => {
    try {
      const updatedProduct = await Product.findByIdAndUpdate(id, updatedFields, { new: true });
      if (!updatedProduct) throw new Error("Producto no encontrado");
      return updatedProduct;
    } catch (error) {
      throw new Error(`Error al actualizar el producto: ${error.message}`);
    }
  };
  

  //deleteProductById
  deleteProductById = async (id) => {
    try {
      const deletedProduct = await Product.findByIdAndDelete(id);
      if (!deletedProduct) throw new Error("Producto no encontrado");
      return deletedProduct; // Retornar el producto eliminado
    } catch (error) {
      throw new Error(`Error al eliminar el producto: ${error.message}`);
    }
  };
  

}

export default ProductManager;