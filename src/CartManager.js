import Cart from './models/cart.model.js'; // Importamos el modelo de carritos

class CartManager {
  constructor() {
  }

  // Método para agregar un carrito nuevo
  addCart = async () => {
    try {
      const newCart = await Cart.create({ products: [] }); // Creamos un carrito vacío en la base de datos
      return newCart;
    } catch (error) {
      throw new Error(`Error al agregar el carrito: ${error.message}`);
    }
  };

  // Método para obtener todos los carritos
  getCarts = async () => {
    try {
      return await Cart.find(); // Obtener todos los carritos de MongoDB
    } catch (error) {
      throw new Error(`Error al obtener los carritos: ${error.message}`);
    }
  };

  // Método para obtener un carrito por su id
  getCartById = async (id) => {
    try {
      const cart = await Cart.findById(id).populate('products.product'); // Buscar carrito y popular productos
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
      const cart = await Cart.findById(cartId);
      if (!cart) {
        throw new Error(`Carrito con ID '${cartId}' no encontrado`);
      }

      // Verificar si el producto ya existe en el carrito
      const existingProduct = cart.products.find((p) => p.product.equals(productId));

      if (existingProduct) {
        existingProduct.quantity += quantity; // Si existe, sumamos la cantidad
      } else {
        cart.products.push({ product: productId, quantity }); // Si no existe, lo agregamos
      }

      await cart.save(); // Guardamos los cambios en MongoDB
      return cart;
    } catch (error) {
      throw new Error(`Error al agregar el producto al carrito: ${error.message}`);
    }
  };

  // Método para eliminar un producto de un carrito
  removeProductFromCart = async (cartId, productId) => {
    try {
      const cart = await Cart.findById(cartId);
      if (!cart) {
        throw new Error(`Carrito con ID '${cartId}' no encontrado`);
      }

      cart.products = cart.products.filter((p) => !p.product.equals(productId));
      await cart.save();
      return cart;
    } catch (error) {
      throw new Error(`Error al eliminar el producto del carrito: ${error.message}`);
    }
  };

  // Método para actualizar un carrito con un array de productos
  updateCart = async (cartId, products) => {
    try {
      const cart = await Cart.findById(cartId);
      if (!cart) {
        throw new Error(`Carrito con ID '${cartId}' no encontrado`);
      }

      // Actualizamos los productos en el carrito
      cart.products = products; // Establece el nuevo array de productos

      await cart.save();
      return cart;
    } catch (error) {
      throw new Error(`Error al actualizar el carrito: ${error.message}`);
    }
  };

  
  // Método para actualizar la cantidad de un producto en el carrito
  updateProductQuantityInCart = async (cartId, productId, quantity) => {
    try {
      const cart = await Cart.findById(cartId);
      if (!cart) {
        throw new Error(`Carrito con ID '${cartId}' no encontrado`);
      }

      const product = cart.products.find((p) => p.product.equals(productId));
      if (!product) {
        throw new Error(`Producto con ID '${productId}' no encontrado en el carrito`);
      }

      product.quantity = quantity; // Actualiza la cantidad
      await cart.save();
      return cart;
    } catch (error) {
      throw new Error(`Error al actualizar la cantidad del producto: ${error.message}`);
    }
  };

  // Método para vaciar el carrito (eliminando todos los productos)
  emptyCart = async (cartId) => {
    try {
      const cart = await Cart.findById(cartId);
      if (!cart) {
        throw new Error(`Carrito con ID '${cartId}' no encontrado`);
      }

      cart.products = []; // Elimina todos los productos
      await cart.save();
      return cart;
    } catch (error) {
      throw new Error(`Error al vaciar el carrito: ${error.message}`);
    }
  };
}

export default CartManager;
