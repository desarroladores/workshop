let productosLs = JSON.parse(localStorage.getItem("productos"))
document.getElementById('products-inp').value =JSON.stringify(productosLs)