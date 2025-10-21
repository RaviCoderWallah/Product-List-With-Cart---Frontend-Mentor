import { fetchingProductData } from "./utils/fetchData.js"
import { createElement } from "./utils/createElement.js"

let orderProductCartDetailsList = [];


//Step 4: Create Each Order Cart Item with Details ===========>>>
const makeYourOrderCard = (name, price, quantity) => {
  
  let priceOriginal = Number(price.replace('$', ''));

  const yourCartContent = `
     <div>
       <p class="cart-name">${name}</p>
       <p><span class="primary-red-clr">${quantity}x</span> &nbsp; <span class="grey">@ ${priceOriginal}</span> <span class="dark-grey">$${priceOriginal * quantity}</span></p>
     </div>
     <div class="remove-icon-container">
       <div class="remove-icon">
         <img src="/assets/images/icon-remove-item.svg">
       </div>
     </div>
  `;

  let yourCartItemEl = createElement("div", "your-cart-item", yourCartContent);
  let orderCartDetailsContainer = document.querySelector(".order-cart-details-container");

  //justify-content works, so remove parent align-items
  orderCartDetailsContainer.classList.remove("align-items")
  orderCartDetailsContainer.appendChild(yourCartItemEl);

}


//Step 3: Create Add to Cart Button =====================>>>>
const addToCartButton = () => {

  const addToCartButtonEl = document.querySelectorAll(".product-card__add-to-cart-btn");
  addToCartButtonEl.forEach((cartBtn) => {
    cartBtn.addEventListener("click", () => {

      let orderCount = 1;

      //when clicked on cart button then remove intial cart html
      cartBtn.children[0].innerHTML = "";
      cartBtn.children[0].classList.add("btn-active");

      //create ui (plus icon, ordercount, minus icon) active cart button 
      let plusButtonEl = createElement("div", "btn-circle", "+");
      let orderCountEl = createElement("p", "order-count", orderCount)
      let minusButtonEl = createElement("div", "btn-circle", "-");

      cartBtn.children[0].append(minusButtonEl, orderCountEl, plusButtonEl);

      //When user's click on Add to Cart Button then in your cart container image and empty text message hidden
      let orderCartContainer = document.querySelector(".order-cart-details-container");
      let orderCartChildrenEl = [...orderCartContainer.children];
      if (orderCartChildrenEl.length = 2) {
        orderCartChildrenEl.forEach(childs => childs.classList.add("hidden"));
      }


      //get add to cart product all data 
      let data = cartBtn.closest(".product-card");
      let convertDataToArray = [...data.children];

      let cartName = [...convertDataToArray[2].children][1].innerHTML
      let cartPrice = [...convertDataToArray[2].children][2].innerHTML
      let cartButton = [...convertDataToArray[1].children];
      let cartQuantity = [...cartButton[0].children][1].innerHTML

      //keep trak each product 
      let productAddToCartList = [];
      productAddToCartList.push(cartName, cartPrice, cartQuantity);

      //push all order product data in product data details list so track all order product data at once time
      orderProductCartDetailsList.push(productAddToCartList);
      if (orderCount > 0) {
        makeYourOrderCard(cartName, cartPrice, orderCount);
      }

      //what's behind logic when user's click on increment button
      plusButtonEl.addEventListener("click", (e) => {
        e.stopPropagation();
        orderCount++;
        orderCountEl.innerHTML = orderCount;
      });

      //what's behind logic when user's click on decrement button
      minusButtonEl.addEventListener("click", (e) => {
        e.stopPropagation();
        orderCount--;
        if (orderCount < 1) {
          plusButtonEl.remove();
          minusButtonEl.remove();
          orderCountEl.remove();
          cartBtn.children[0].classList.remove("btn-active");
          cartBtn.children[0].innerHTML = `
             <img src="./assets/images/icon-add-to-cart.svg" alt="">
              <span>Add to Cart</span>
          `;
        }
        orderCountEl.innerHTML = orderCount;

      });

    });
  });
}


//Step 2: Show Product Data on UI =======================>>>>
const createProductCard = (data) => {
  data.forEach((productData) => {
    let productCardContent = `
        <div class="product-card__image">
              <img src="${productData.image.desktop}" alt="" class="desktop-image">
          </div>
          <div class="product-card__add-to-cart-btn"><button>
                  <img src="./assets/images/icon-add-to-cart.svg" alt="">
                  <span>Add to Cart</span>
              </button></div>
          <div class="product-card__details">
              <p class="cart-category">${productData.category}</p>
              <p class="cart-name">${productData.name}</p>
              <p class="cart-price">$${productData.price.toFixed(2)}</p>
        </div>
   `;

    const productCard = createElement("div", "product-card", productCardContent);

    //append product card in product container 
    const productCardContainer = document.querySelector(".products-card-container");
    productCardContainer.appendChild(productCard);

  })
  addToCartButton();

}


//Step 1: Fetching Data =================================>>>

//File source where to data is coming 
let dataSrc = "/data.json";

fetchingProductData(dataSrc).then((data) => {
  createProductCard(data);
});

