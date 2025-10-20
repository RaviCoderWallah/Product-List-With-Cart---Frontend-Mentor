const productCardContainerEl = document.querySelector(".products-card-container");


function createProductCard({ image, name, category, price }) {

    const productCard = document.createElement("div");
    productCard.classList.add("product-card");


    const productCardImageContainer = document.createElement("div");
    productCardImageContainer.classList.add("product-card__image");
    productCardImageContainer.innerHTML = `
        <img src="${image.desktop}" alt="" class="desktop-image">
        <!-- <img src="${image.tablet}" alt="" class="tablet-image"> -->
        <!-- <img src="${image.mobile}" alt=""> -->
`;

    const addToCartButtonContainer = document.createElement("div");
    addToCartButtonContainer.classList.add("product-card__add-to-cart-btn");

    const addToCartButton = document.createElement("button");
    addToCartButton.innerHTML = `
        <img src="./assets/images/icon-add-to-cart.svg" alt="">
        <span>Add to Cart</span>
`;

    addToCartButton.addEventListener(("click"), (e) => {

        

        const cartDetailsContainer = document.querySelector(".cart-details-container");
        cartDetailsContainer.classList.remove("empty");

        const cartTotalPriceEl = document.createElement("div");
        cartTotalPriceEl.innerHTML = `
           <p class="dark-grey">Order Total</p>
           <h3>$$6.50</h3>
        `;


        const orderCartDetailsContainer = document.querySelector(".order-cart-details-container");
        orderCartDetailsContainer.classList.remove("align-items");



        const emptyCartImage = document.querySelector(".order-cart-details-container img");
        emptyCartImage.classList.add("hidden");

        const emptyCartMessage = document.querySelector(".empty-cart-message");
        emptyCartMessage.classList.add("hidden");

        // product cart show in order details  sidebar 
        const orderCartCard = document.createElement("div");
        orderCartCard.classList.add("order-cart-card");



        //intiliaize number of cart order 
        let numberOfCartOrder = 0;

        addToCartButton.innerHTML = "";

        //style change when click add to cart button 
        addToCartButton.classList.add("add-to-cart-active")

        //create pluse button so user's can increaes product
        const plusButton = document.createElement("div");
        plusButton.classList.add("btn-circle")
        plusButton.innerText = "+";

        //create one paragraph element which show current cart item
        const cartCount = document.createElement("p");
        cartCount.innerText = numberOfCartOrder;

        //create minus button so user's can decrease product
        const minusButton = document.createElement("div");
        minusButton.classList.add("btn-circle")
        minusButton.innerText = "-";

        //all create elements append in add to cart btn
        addToCartButton.append(plusButton, cartCount, minusButton);



        //Increase Cart Count Product Logic
        plusButton.addEventListener(("click"), (e) => {
            e.stopPropagation();
            numberOfCartOrder++;
            cartCount.innerHTML = numberOfCartOrder;

            orderCartCard.innerHTML = `
                <div class="order-cart-details-side">
                    <p class="order-cart-name">Macaron Mix of Five</p>
                    <p><span class="red"> ${numberOfCartOrder}x </span> &nbsp;&nbsp; <span class="grey" >@ $${price}</span> &nbsp; <span class="dark-grey">$${numberOfCartOrder * price}</span></p>
                </div>
                <div class="order-cart-cancel-side">
                    <div class="cancel-btn"><span>+</span></div>
                </div>
            `;

            orderCartDetailsContainer.appendChild(orderCartCard);

        });

        //Decrease Cart Count Product Logic
        minusButton.addEventListener(("click"), (e) => {
            e.stopPropagation();

            if (numberOfCartOrder >= 1) {
                numberOfCartOrder--;
                cartCount.innerHTML = numberOfCartOrder;

                orderCartCard.innerHTML = `
                    <div class="order-cart-details-side">
                        <p class="order-cart-name">Macaron Mix of Five</p>
                        <p><span class="red"> ${numberOfCartOrder}x </span> &nbsp;&nbsp; <span class="grey" >@ $5.50</span> &nbsp; <span class="dark-grey">$5.50</span></p>
                    </div>
                    <div class="order-cart-cancel-side">
                        <div class="cancel-btn"><span>+</span></div>
                    </div>
                 `;

                orderCartDetailsContainer.appendChild(orderCartCard);
            }

            //Logic when user's no add cart item 
            if (numberOfCartOrder === 0) {
                orderCartCard.innerHTML = "";

                addToCartButton.classList.remove("add-to-cart-active")
                addToCartButton.innerHTML = `
                    <img src="./assets/images/icon-add-to-cart.svg" alt="">
                    <span>Add to Cart</span>
                `;

                emptyCartImage.classList.remove("hidden");
                emptyCartMessage.classList.remove("hidden");
                orderCartDetailsContainer.classList.add("align-items");

            }

        });

    });


    const productCardDetails = document.createElement("div");
    productCardDetails.classList.add("product-card__details");
    productCardDetails.innerHTML = `
        <p class="cart-category">${category}</p>
        <p class="cart-name">${name}</p>
        <p class="cart-price">$${price}</p>
`;


    addToCartButtonContainer.appendChild(addToCartButton);

    productCard.append(productCardImageContainer, addToCartButtonContainer, productCardDetails);
    productCardContainerEl.appendChild(productCard);
}


// fetching all product data 
const fetchData = fetch("/data.json");
fetchData.then((response) => response.json()).then((data) => {
    data.forEach((productData) => {
        createProductCard(productData);
    })

}).catch((err) => console.log("Something Went Wrong : " + err));