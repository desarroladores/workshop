let shopItems = document.querySelector('.shop-res-items');
let shopItemsLi = document.querySelectorAll('.shop-res-items_cart');
let payBtn = document.querySelector('.pay-btn') 
let total = document.getElementById('total')
let totalPrice = 0;


// -----

// const vaciarCarritoBtn = document.getElementById('vaciar-carrito')

class Carrito {
    comprarProducto(e){
        e.preventDefault();
        if(e.target.classList.contains('buy')){
            const producto = e.target.parentElement.parentElement;
            this.leerDatosProducto(producto)
        }
    }

    leerDatosProducto(producto){
        const infoProducto = {
            img : producto.querySelector('img').getAttribute("src"),
            name : producto.querySelector('.price-p_text').textContent,
            price : producto.querySelector('.price-p').textContent,
            disc : producto.querySelector('.discount-p').textContent,
            id : producto.querySelector('button').getAttribute('p-id'),
            amount : 1,
            color : producto.querySelector('.color').textContent,
            size: "M (130x60cms)"
        }
        let productosLS = this.obtenerProductosLocalStorage();
        productosLS.forEach(productoLS=>{
            if(productoLS.id === infoProducto.id){
                productosLS = productoLS.id;
            }
        })
        if(productosLS === infoProducto.id){
            alert("El producto ya ha sido agregado")
            
        }else{
        this.insertarCarrito(infoProducto);
        console.log(infoProducto)
        }
    }

    insertarCarrito(producto){
        let priceNmb = parseInt(producto.price.replace("$", ""))
        let discNmb = parseInt(producto.disc.replace("%", ""))
        // let totalProductPrice =(priceNmb - priceNmb/100*discNmb)*producto.amount
        if(isNaN(discNmb)){
            discNmb = 0
        }
        const row = document.createElement('li')
        row.innerHTML = `
        <li class="shop-res-items_li">
          <div>
            <b hidden="">${producto.color}</b>
            <img class="cart-p-img" src=${producto.img}>
            <p class="price-p_cart">$${priceNmb*producto.amount}</p>
            <p class="discount-p_cart">-${discNmb}%</p>
            <p class="p-name_cart" p-id="${producto.id}">${producto.name}</p>
            <input type="number" contenteditable="true" class="amount-count-btn" value="${producto.amount}"></input> 
            <span class="material-symbols-outlined amount-ok"style="display:none"> check_circle </span>
            <select name="favoriteOnly" style="font-size: 12px; margin: 10px;" class="select-size">
                <option>M (130x60cms)</option>
                <option>L (145x70cms)</option>
                <option>XL (160x80cms)</option>
                <option>XXL (180x90cms)</option>
            </select>
          <span class="material-symbols-outlined size-ok"style="display:none"> check_circle </span>
          </p>
            <span type="button" class="material-symbols-outlined p-delete_cart">delete</span>
          </div>
          </li>`
        listaProductos.appendChild(row)
        this.guardarProductosLocalStorage(producto)
        modProductAmount("+1")
    }
    // insertarTotal(totalPrPrice){
    //     totalPrice+=totalPrPrice
    //     total.textContent = `Total: ${totalPrice}`
    // }
    eliminarProducto(e){
        e.preventDefault();
        let producto , productoID;
        if(e.target.classList.contains('p-delete_cart')){
            e.target.parentElement.parentElement.remove()
            producto = e.target.parentElement.parentElement;
            productoID = producto.firstElementChild.querySelector('.p-name_cart').getAttribute('p-id');
        }
        this.eliminarProductoLocalStorage(productoID)
        modProductAmount("-1")
    }

    // vaciarCarrito(e){
    //     e.preventDefault();
    //     while(listaProductos.firstChild){
    //         listaProductos.removeChild(listaProductos.firsChild)
    //     }
    //     return false;
    // }
    guardarProductosLocalStorage(producto){
        let productos;
        productos = this.obtenerProductosLocalStorage();
        productos.push(producto)
        localStorage.setItem("productos", JSON.stringify(productos))
    }
    obtenerProductosLocalStorage(){
        let productoLS;
        if(localStorage.getItem("productos") === null){
            productoLS= [];
        } else {
            productoLS = JSON.parse(localStorage.getItem("productos"));
        }
        return productoLS;
    }
    eliminarProductoLocalStorage(productoID){
        let productosLS;
        productosLS = this.obtenerProductosLocalStorage();
        productosLS.forEach((productoLS, index) => {
            if(productoLS.id === productoID){
                productosLS.splice(index,1);
            }
        });

        localStorage.setItem('productos', JSON.stringify(productosLS))
    }
    leerLocalStorage(){
        let productosLS;
        productosLS = this.obtenerProductosLocalStorage()
        productosLS.forEach(producto =>{
            let priceNmb = parseInt(producto.price.replace("$", ""))
            let discNmb = parseInt(producto.disc.replace("%", ""))
            // let totalProductPrice =(priceNmb - priceNmb/100*discNmb)*producto.amount
            if(isNaN(discNmb)){
                discNmb = 0
            }
            const row = document.createElement('li')
            row.innerHTML = `
                        <li class="shop-res-items_li">
                          <div>
                            <b hidden="">${producto.color}</b>
                            <img class="cart-p-img" src=${producto.img}>
                            <p class="price-p_cart">$${priceNmb*producto.amount}</p>
                            <p class="discount-p_cart">-${discNmb}%</p>
                            <p class="p-name_cart" p-id="${producto.id}">${producto.name}</p>
                            <input type="number" contenteditable="true" class="amount-count-btn" value="${producto.amount}"></input> 
                            <span class="material-symbols-outlined amount-ok"style="display:none"> check_circle </span>
                            <select name="favoriteOnly" style="font-size: 12px; margin: 10px;" class="select-size">
                                <option>M (130x60cms)</option>
                                <option>L (145x70cms)</option>
                                <option>XL (160x80cms)</option>
                                <option>XXL (180x90cms)</option>
                            </select>
                          <span class="material-symbols-outlined size-ok"style="display:none"> check_circle </span>
                          </p>
                            <span type="button" class="material-symbols-outlined p-delete_cart">delete</span>
                          </div>
                          </li>`
            listaProductos.appendChild(row)
        })
    }

    setAmount(e){
        e.preventDefault();
        if(e.target.classList.contains("amount-ok")){
            let productosLS = this.obtenerProductosLocalStorage()
            let productId = e.target.parentElement.querySelector('.p-name_cart').getAttribute('p-id')
            let amountInput = e.target.parentElement.querySelector('.amount-count-btn')
            let amountInputInt = parseInt(amountInput.value)
            if(amountInputInt<=0 || isNaN(amountInputInt)){
                
                e.target.parentElement.parentElement.remove()
                let producto = e.target.parentElement.parentElement;
                let productoID = producto.firstElementChild.querySelector('.p-name_cart').getAttribute('p-id');
                this.eliminarProductoLocalStorage(productoID)
                modProductAmount("-1")
            }else{
            // parseInt(amountInput.getAttribute('value'))
            productosLS.forEach(producto =>{
                if(producto.id == productId){
                    let priceNmb = parseInt(producto.price.replace("$", ""))
                    producto.amount=parseInt(amountInputInt)
                    e.target.parentElement.querySelector('.price-p_cart').textContent = `$${priceNmb * producto.amount}`
                    localStorage.setItem("productos", JSON.stringify(productosLS))
                    // amountInput.setAttribute('value', producto.amount)
                }
            })
            }
            e.target.style.display = "none"
            e.target.parentElement.querySelector('.discount-p_cart').style.display="inline-block"
        }

    }

    
    setSize(e){
        e.preventDefault();
        if(e.target.classList.contains("size-ok")){
            let productosLS = this.obtenerProductosLocalStorage()
            let productId = e.target.parentElement.querySelector('.p-name_cart').getAttribute('p-id')
            let sizeInput = e.target.parentElement.querySelector('.select-size')
            let sizeInputValue = sizeInput.options[sizeInput.selectedIndex].value;
            productosLS.forEach(producto =>{
                if(producto.id == productId){
                    producto.size=sizeInputValue
                    localStorage.setItem("productos", JSON.stringify(productosLS))
                }
            })
            e.target.style.display = "none"
            e.target.parentElement.querySelector('.discount-p_cart').style.display="inline-block"
        }
    }



}
const modProductAmount = signal =>{
    if(signal == "-1"){
        productsAmount--
    } else if(signal == "+1") {
        productsAmount++
    }
    
    if(productsAmount > 0){
        document.getElementById('nmb-p').style.display = "flex"
        document.getElementById('nmb-p').textContent = productsAmount
      } else {
        document.getElementById('nmb-p').style.display = 'none'
      }
}
  
  const checkCart = () => {
    if(listaProductos.querySelectorAll('.shop-res-items_li').length == 0){
    listaProductos.querySelector('.empty-cart').style.display = "inline"
    payBtn.textContent = ""
    payBtn.style.display = "none"
  } else{
    listaProductos.querySelector('.empty-cart').style.display = "none"
    payBtn.style.display = "inline"
    payBtn.textContent = "Comprar"
  }}


const carro = new Carrito();
const carrito = document.getElementById('carrito');
const productos = document.getElementById('productos');
const listaProductos = document.querySelector('.shop-res-items')
let productsAmount = carro.obtenerProductosLocalStorage().length;

const cargarEventos=()=>{
    if(productos){
    productos.addEventListener('click', (e)=>{
        carro.comprarProducto(e)
        checkCart()
    });}

    carrito.addEventListener('click', e=>{
        carro.eliminarProducto(e)
        carro.setAmount(e)
        carro.setSize(e)
        checkCart()
    });
    carrito.addEventListener('input', e=>{
        if(e.target.classList.contains('amount-count-btn')){
            e.target.parentElement.querySelector('.amount-ok').style.display = "inline-block";
            e.target.parentElement.querySelector('.discount-p_cart').style.display = "none"
            
        }else if(e.target.classList.contains('select-size')){
            e.target.parentElement.querySelector('.size-ok').style.display = "inline-block";
            e.target.parentElement.querySelector('.discount-p_cart').style.display = "none"
        }
        
        checkCart()
    })
    // carrito.addEventListener("keydown", (e)=>{
    //     carro.setAmount(e)
    // })
    document.addEventListener('DOMContentLoaded', e =>{
        carro.leerLocalStorage();
        modProductAmount()
        
        checkCart()
    })
    // vaciarCarritoBtn.addEventListener('click', e=>{carro.vaciarCarrito(e)})
    // carrito.addEventListener('click', e=>{
    //     if(e.target.classList.contains('amount-count-btn')){
    //         carro.insertarTotal()
    //     }
    // }) 
}


// --
modProductAmount()
cargarEventos()