import fs from "fs";
import { nanoid } from 'nanoid'
class ProductManager{
  constructor(pathFile){
    this.pathFile = pathFile;
  }

  //getProducts
  getProducts = async() => {
    try {
      //leemos el contenido de nuestro archivo y lo guardamos
      const fileData = await fs.promises.readFile(this.pathFile, 'utf-8');
      const data = JSON.parse(fileData);
      return data;
    } catch (error) {
      throw new Error(`Error al leer el archivo de productos: ${error.message}`)
    }
  }

  //getProductById
  getProductById = async (id) => {
    try {
      const data = await this.getProducts(); // Llamamos a getProducts() para obtener todos los productos
      const product = data.find((producto) => producto.id === id); // Buscamos el producto por id
      if (!product) {
        throw new Error('Producto no encontrado');
      }
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
  
      // Leer los productos existentes
      const data = await this.getProducts();
  
      // Generar un nuevo ID utilizando nanoid
      const newId = nanoid();
  
      // Establecer status como true por defecto si no está definido
      const newProduct = {
        id: newId,
        status: product.status ?? true, // Si status no está definido, asignar true
        thumbnail: product.thumbnail || "", // Si thumbnail es undefined o null, asignar un string vacío
        ...product,
      };
  
      // Agregar el nuevo producto a la lista
      data.push(newProduct);
  
      // Guardar los productos actualizados en el archivo JSON
      await fs.promises.writeFile(this.pathFile, JSON.stringify(data, null, 2));
  
      return newProduct; // Retornar el producto agregado
    } catch (error) {
      throw new Error(`Error al agregar el producto: ${error.message}`);
    }
  }

  //updateProductById
  updateProductById = async (id, updatedFields) => {
    try {
      // Leer los productos existentes
      const data = await this.getProducts();
  
      // Buscar el índice del producto con el ID proporcionado
      const productIndex = data.findIndex((product) => product.id === id);
  
      if (productIndex === -1) {
        throw new Error(`Producto con ID '${id}' no encontrado`);
      }
  
      // Actualizar los campos del producto, conservando los no modificados
      const updatedProduct = {
        ...data[productIndex], // Copiar los datos existentes del producto
        ...updatedFields, // Sobrescribir con los campos proporcionados
      };
  
      // Reemplazar el producto en la lista
      data[productIndex] = updatedProduct;
  
      // Guardar los productos actualizados en el archivo JSON
      await fs.promises.writeFile(this.pathFile, JSON.stringify(data, null, 2));
  
      return updatedProduct; // Retornar el producto actualizado
    } catch (error) {
      throw new Error(`Error al actualizar el producto: ${error.message}`);
    }
  };
  

  //deleteProductById
  deleteProductById = async (id) => {
    try {
      // Leer los productos existentes
      const data = await this.getProducts();
  
      // Buscar el índice del producto con el ID proporcionado
      const productIndex = data.findIndex((product) => product.id === id);
  
      if (productIndex === -1) {
        throw new Error(`Producto con ID '${id}' no encontrado`);
      }
  
      // Eliminar el producto del array
      const [deletedProduct] = data.splice(productIndex, 1);
  
      // Guardar los productos actualizados en el archivo JSON
      await fs.promises.writeFile(this.pathFile, JSON.stringify(data, null, 2));
  
      return deletedProduct; // Retornar el producto eliminado
    } catch (error) {
      throw new Error(`Error al eliminar el producto: ${error.message}`);
    }
  };
  

}

export default ProductManager;