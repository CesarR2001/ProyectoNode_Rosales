import mongoose from "mongoose";

const connectMongoDB = async() => {
  try {
    await mongoose.connect("mongodb+srv://proyecto_node:proyectonode@eccomerce-cluster.p2dux.mongodb.net/SportshopDB?retryWrites=true&w=majority&appName=eccomerce-cluster");
    console.log("Conectado correctamente con MongoDB");
  } catch (error) {
    console.log("Error al conectar con MongoDB");
  }
}

export default connectMongoDB;