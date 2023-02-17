let navRes = document.querySelector(".responsive-nav_open");
let menuBtn = document.querySelector(".menu-btn");
let navOpen = false;

let discountOff = document.querySelectorAll(".discount-p");

let shopRes = document.querySelector(".responsive-shop_open");
let shopBtn = document.querySelector(".shop-btn");
let shopOpen = false;

document.querySelectorAll(".discount-p_cart").forEach(el => {
  if(el.textContent == "-0%" ){
    el.style.color = "#000"
  }
  });


discountOff.forEach(el => {
  if(el.textContent == "" || el.textContent == " " || el.textContent == "0" || el.textContent == "0%" ){
    el.style.padding = "0px"
  }
  });



menuBtn.addEventListener("click", e=>{
    if(!navOpen){
      if(shopOpen){
        shopOpen = false;
        shopRes.style.animation = "desaparecer 0.5s forwards"
      }
      navRes.style.animation = "aparecer 0.5s forwards"
        navOpen = true
    } else {
      navRes.style.animation = "desaparecer 0.5s forwards"
      navOpen = false;
    }
})


  shopBtn.addEventListener("click", e=>{
    if(!shopOpen){
      if(navOpen){
        navOpen = false;
        navRes.style.animation = "desaparecer 0.5s forwards"
      }
      shopRes.style.animation = "aparecer 0.5s forwards"
        shopOpen = true
    } else {
      shopRes.style.animation = "desaparecer 0.5s forwards"
      shopOpen = false;
    }
  })


  // menuBtn.addEventListener("click", e=>{
  //   close(shopOpen, shopRes)
  //   open(navOpen, navRes)})
  
  // shopBtn.addEventListener("click", e=>{
  //   close(navOpen, navRes)
  //   open(shopOpen, shopRes)
  // })
  
  
  // const open  = (condition, targetOpen)=>{
  //   if(!condition){
  //     targetOpen.style.animation = "aparecer 0.5s forwards"
  //     condition = true;
  //   } else {
  //     close(condition, targetOpen)
  //   }
  // }
  
  // const close = (targetClose, target) =>{
  //   if(targetClose){
  //   targetClose = false;
  //   target.style.animation = "desaparecer 0.5s forwards"
  // }
  // }