import fs from 'fs';
import { nanoid } from 'nanoid'

class CartManager {
  constructor(pathFile) {
    this.pathFile = pathFile; // Ruta del archivo JSON donde se guardan los carritos
  }

  // Método para agregar un carrito nuevo
  addCart = async () => {
    try {
      const data = await this.getCarts(); // Obtener todos los carritos

      // Crear un nuevo carrito con un id único
      const newCart = {
        id: nanoid(), // El id será el timestamp actual
        products: [] // El carrito comienza sin productos
      };

      // Agregar el carrito al array de carritos
      data.push(newCart);

      // Guardar los cambios en el archivo JSON
      await fs.promises.writeFile(this.pathFile, JSON.stringify(data, null, 2));

      return newCart; 
    } catch (error) {
      throw new Error(`Error al agregar el carrito: ${error.message}`);
    }
  };

  // Método para obtener todos los carritos
  getCarts = async () => {
    try {
      const fileData = await fs.promises.readFile(this.pathFile, 'utf-8');
      const data = JSON.parse(fileData);
      return data;
    } catch (error) {
      throw new Error(`Error al leer el archivo de carritos: ${error.message}`);
    }
  };

  // Método para obtener un carrito por su id
  getCartById = async (id) => {
    try {
      const data = await this.getCarts();
      const cart = data.find((cart) => cart.id === id);

      if (!cart) {
        throw new Error(`Carrito con ID '${id}' no encontrado`);
      }

      return cart;
    } catch (error) {
      throw new Error(`Error al obtener el carrito: ${error.message}`);
    }
  };

  // Método para agregar un producto a un carrito
  addProductInCartById = async (cartId, productId, quantity) => {
    try {
      const data = await this.getCarts();
      const cart = data.find((cart) => cart.id === cartId);

      if (!cart) {
        throw new Error(`Carrito con ID '${cartId}' no encontrado`);
      }

      // Verificar si el producto ya existe en el carrito
      const existingProduct = cart.products.find((product) => product.id === productId);

      if (existingProduct) {
        // Si el producto ya está en el carrito, sumamos la cantidad
        existingProduct.quantity += quantity;
      } else {
        // Si no está en el carrito, lo agregamos
        cart.products.push({ id: productId, quantity });
      }

      // Guardar los cambios en el archivo JSON
      await fs.promises.writeFile(this.pathFile, JSON.stringify(data, null, 2));

      return cart; 
    } catch (error) {
      throw new Error(`Error al agregar el producto al carrito: ${error.message}`);
    }
  };
}

export default CartManager;
