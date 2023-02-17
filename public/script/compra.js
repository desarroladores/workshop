let expand;
const carrito2 = document.getElementById('carrito');
const ulProductos = document.querySelector('.shop-res-items')
let expandMore = document.querySelectorAll('.expand_more');
let expandLess = document.querySelectorAll('.expand_less');
const productSection = document.getElementById('buy-products')
let totalPrices;
let totalToPay=0
if(screen.width>750){

}
productSection.addEventListener('click', e=>{
    changeExpand(e)
})
const changeExpand = e =>{
    expand = e.target;
    let expanded = expand.parentElement.parentElement.querySelector('.second-info');
    if(expand.textContent == "expand_more"){
        expand.textContent = "expand_less"
        expanded.style.display = "flex";


    }else if(expand.textContent == "expand_less"){
        expand.textContent = "expand_more"
        expanded.style.display = "none";
    }
}

const obtenerProductosLocalStorage = ()=> {
    let productoLS;
    if(localStorage.getItem("productos") === null){
        productoLS= [];
    } else {
        productoLS = JSON.parse(localStorage.getItem("productos"));
    }
    return productoLS;
}


const setTotal = ( discPrice) =>{
    totalToPay+=discPrice
    totalPrices = document.querySelector('.total-price');
    totalPrices.innerHTML = `Total: <b>$${totalToPay}</b>`

}
const loadProducts = ()=> {
    let productosLS;
    productosLS = obtenerProductosLocalStorage()
    productosLS.forEach(producto =>{
        let priceNmb = parseInt(producto.price.replace("$", ""))
        let discNmb = parseInt(producto.disc.replace("%", ""))
        if(isNaN(discNmb)){
            discNmb = 0
        }
        let discPrice = (priceNmb*producto.amount)/100*(100-discNmb)
        if(discPrice == 0){
            discPrice = priceNmb
        }
        const row = document.createElement('div')
        row.innerHTML = `<div class="my-products">
        <div class="my-p">
          <div class="first-info">
          <span class="material-symbols-outlined expand_more" title="Ver detalles" >expand_more</span>
            <img src="${producto.img}">
            <p class="price">$${discPrice}</p>
            <p class="name">${producto.name}</p>
          </div>
          <div class="second-info">
            <span class="amount-span">Cantidad: ${producto.amount}</span>
            <span class="size-span">Tamaño: ${producto.size}</span>
            <span class="size-span">Descuento: <b class="discount-p-text">${producto.disc}</b></span>
          </div>
        </div>`
        productSection.appendChild(row)
        // setTotal(discPrice)
    })
}

loadProducts()
carrito2.addEventListener('click', (e)=>{
    if(e.target.classList.contains('amount-ok') || e.target.classList.contains('p-delete_cart')|| e.target.classList.contains('size-ok')){
        location.reload()
    }
})

if(obtenerProductosLocalStorage().length == 0){location.href='/inicio'}