import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product", // Referencia al modelo de productos
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1, // La cantidad mínima debe ser 1
          default: 1,
        },
      },
    ],
  });

const Cart = mongoose.model("Cart", cartSchema)

export default Cart
