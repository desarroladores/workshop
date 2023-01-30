
// contacto
let productosLs = JSON.parse(localStorage.getItem("productos"))
// const peticion = new XMLHttpRequest;
// addEventListener("click",async e=>{
//     if(e.target == document.querySelector('#submit-inp')){
//         await peticion.open("POST", "/form/data")

//         fetch('/form/data', {
//           method: 'POST',
//           body: productosLs
//         })
//         .then(response => response.json())
//         .then(data => {
//           console.log('Success:', data);
//         })
//         .catch((error) => {
//           console.error('Error:', error);
//         });
//     }
// })
document.getElementById('products-inp').value =JSON.stringify(productosLs)