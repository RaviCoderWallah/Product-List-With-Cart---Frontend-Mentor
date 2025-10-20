import { fetchingProductData } from "./utils/fetchData.js"
import { createElement } from "./utils/createElement.js"

let orderCount = 1;


//Step 4: Create Each Order Cart Item with Details ===========>>>



//Step 3: Create Add to Cart Button =====================>>>>
const addToCartButton = () => {
  const addToCartButtonEl = document.querySelectorAll(".product-card__add-to-cart-btn");
  addToCartButtonEl.forEach((cartBtn) => {
    cartBtn.addEventListener("click", () => {
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
      orderCartChildrenEl.forEach(childs => childs.classList.add("hidden"));
      
      //remove fixed height 
      let orderDetailsContainer = document.querySelector(".cart-details-container");
      orderDetailsContainer.classList.remove("empty");

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

     addToCartButton();
  })

}


//Step 1: Fetching Data =================================>>>

//File source where to data is coming 
let dataSrc = "/data.json";

fetchingProductData(dataSrc).then((data) => {
  createProductCard(data);
});