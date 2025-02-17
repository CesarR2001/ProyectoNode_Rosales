const socket = io();

const showProductDelect = (D_Product) => {
  Swal.fire({
    toast: true,
    position: "top-end",
    icon: "success",
    title: `El producto "${D_Product.description}" ha sido eliminado correctamente.`,
    showConfirmButton: false,
    timer: 2000,
  });
};


const formNewProduct = document.getElementById("formNewProduct");

formNewProduct.addEventListener("submit", (event)=> {
  event.preventDefault();

  const formData = new FormData(formNewProduct);
  const productData = {};

  formData.forEach((value, key)=> {
    productData[key] = value;
  });

  //enviamos los datos del producto al servidor
  socket.emit("newProduct", productData);

  // Vaciar el formulario después de enviarlo
  formNewProduct.reset(); 
});

// Eliminar producto al hacer clic en el botón de eliminar
const productsList = document.getElementById("productsList");

productsList.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete-btn")) {
    const productId = event.target.getAttribute("data-id");
    console.log("Eliminar producto con ID:", productId);
    // Enviar el ID al servidor para eliminar el producto
    socket.emit("deleteProduct", productId);
  }
});

socket.on("productAdded", (newProduct)=> {
  const productsList = document.getElementById("productsList");
  productsList.innerHTML += `
    <li class="product-item">
      <span class="product-name">${newProduct.title}</span> - 
      <span class="product-price">$${newProduct.price}</span>
      <button class="delete-btn" data-id="${newProduct.id}">Eliminar</button>
    </li>
  `;
  });

  socket.on("productDeleted", (D_Product, newList) => {
    // Mostrar el producto eliminado
    showProductDelect(D_Product);

    // Limpiar la lista de productos para evitar duplicados
    productsList.innerHTML = '';

    // Recorrer la nueva lista de productos y mostrarla
    newList.forEach(({ title, price, id }) => {
        productsList.innerHTML += `
            <li class="product-item">
                <span class="product-name">${title}</span> - 
                <span class="product-price">$${price}</span>
                <button class="delete-btn" data-id="${id}">Eliminar</button>
            </li>`;
    });
});
