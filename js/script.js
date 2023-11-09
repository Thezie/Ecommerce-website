"use strict";
let searchForm = document.querySelector(".search-form");
let search = document.querySelector(".search");
if (search) {
  search.onclick = () => {
    if (searchForm) {
      searchForm.classList.toggle("active-search");
    }
  };
}
//======== active nav link ======
let navLink = document.querySelectorAll(".nav a");
let activePage = window.location.pathname;
if (navLink) {
  navLink.forEach((link) => {
    if (link.href.includes(`${activePage}`)) {
      link.classList.add("active-link");
    }
  });
}
//======== active menu ======
let menuBtn = document.querySelector(".menu");
let close = document.querySelector(".close");
let navBar = document.querySelector(".nav");
if (menuBtn) {
  menuBtn.onclick = () => {
    navBar.classList.add("active-nav");
  };
}
if (close) {
  close.onclick = () => {
    navBar.classList.remove("active-nav");
  };
}
// ======== scroll to top ======
let scrollBtn = document.querySelector(".scroll-up");
if (scrollBtn) {
  window.onscroll = () => {
    if (window.scrollY >= 600) {
      scrollBtn.style.right = "15px";
    } else {
      scrollBtn.style.right = "-100%";
    }
  };
  scrollBtn.addEventListener("click", () => {
    window.scrollTo(0, 0);
  });
}
// ===== change background image landing =====
let landingBg = document.querySelector(".background-img");
let landingImgs = Array.from(document.querySelectorAll(".background-img img"));
function imageWidth() {
  for (let i = 0; i < landingImgs.length; i++) {
    landingImgs[i].style.width = `${landingBg.clientWidth}px`;
  }
}
imageWidth();
//========== image slider =========
let bgIndex = 1;
if (landingImgs && landingImgs.length > 0) {
  function bgSlide() {
    window.addEventListener("resize", imageWidth);
    landingBg.style.transition = "transform 1s ease-in-out";
    landingBg.style.transform = `translateX(${
      -landingBg.clientWidth * bgIndex
    }px)`;
    bgIndex++;
    if (bgIndex === landingImgs.length) {
      setTimeout(() => {
        landingBg.style.transition = "none";
        landingBg.style.transform = `translateX(0)`;
        bgIndex = 1;
      }, 1000);
    }
  }
  setInterval(bgSlide, 3000);
}
//======== animate visible elements =======
let targetElement = document.querySelectorAll(".reveal");
let targetImg = document.querySelectorAll(".show-right");
let observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate");
    }
  });
});
targetElement.forEach((element) => {
  observer.observe(element);
});
targetImg.forEach((img) => {
  observer.observe(img);
});
//======== show password ======
let icon = document.querySelectorAll(".show-pwd");
icon.forEach((item) => {
  item.addEventListener("click", (event) => {
    showHidePassword(event.target);
  });
});
function showHidePassword(icon) {
  if (icon.classList.contains("fa-eye-slash")) {
    icon.previousElementSibling.setAttribute("type", "text");
    icon.classList.add("fa-eye");
    icon.classList.remove("fa-eye-slash");
  } else {
    icon.previousElementSibling.setAttribute("type", "password");
    icon.classList.add("fa-eye-slash");
    icon.classList.remove("fa-eye");
  }
}
//======== lightbox images======
let smallImages = Array.from(document.querySelectorAll(".images img"));
let bigImageCont = document.querySelector(".big-image-container");
let bigImages = Array.from(
  document.querySelectorAll(".big-image-container img")
);
if (smallImages && smallImages.length > 0) {
  smallImages[0].classList.add("active-image");
}
if (smallImages) {
  smallImages.forEach((img) => {
    img.addEventListener("click", () => {
      let imgIndex = smallImages.indexOf(img);
      bigImageCont.style.transform =
        "translateX(-" + imgIndex * bigImageCont.clientWidth + "px)";
      test();
      img.classList.add("active-image");
    });
  });
}
function test() {
  smallImages.forEach((ele) => {
    ele.classList.remove("active-image");
  });
}
let indexImg = 0;
let fullImage = document.getElementById("full-image");
let lightbox = document.querySelector(".lightbox");
let sliderNumber = document.querySelector(".slider-number");
if (bigImages) {
  bigImages.forEach((img) => {
    img.addEventListener("click", () => {
      indexImg = bigImages.indexOf(img);
      lightbox.style.display = "flex";
      fullImage.setAttribute("src", bigImages[indexImg].src);
      sliderNumber.textContent = indexImg + 1 + " / " + bigImages.length;
      setTimeout(() => {
        lightbox.style.opacity = "1";
      }, 10);
    });
  });
}
window.onclick = function (e) {
  if (e.target.classList.contains("lightbox")) {
    lightbox.style.opacity = 0;
    setTimeout(() => {
      lightbox.style.display = "none";
    }, 300);
  }
};
let arrLeft = document.querySelector(".arrow-left");
let arrRight = document.querySelector(".arrow-right");
function swipe() {
  fullImage.src = bigImages[indexImg].src;
  sliderNumber.textContent = indexImg + 1 + " / " + smallImages.length;
}
if (arrLeft) {
  arrLeft.addEventListener("click", () => {
    indexImg--;
    if (indexImg < 0) {
      indexImg = smallImages.length - 1;
    }
    swipe();
  });
}
if (arrRight) {
  arrRight.addEventListener("click", () => {
    indexImg++;
    if (indexImg > smallImages.length - 1) {
      indexImg = 0;
    }
    swipe();
  });
}
//======== filtered items ======
let categoryLinks = Array.from(document.querySelectorAll(".filter-link"));
let itemsList = Array.from(document.querySelectorAll(".product-box"));
if (categoryLinks && categoryLinks.length > 0) {
  categoryLinks[0].classList.add("active-category");
  categoryLinks.forEach((link) => {
    link.addEventListener("click", () => {
      showFiltered(link);
    });
  });
}
function showFiltered(link) {
  itemsList.forEach((item) => {
    if (item.classList.contains(link.id)) {
      resetActive();
      link.classList.add("active-category");
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
}
function resetActive() {
  categoryLinks.forEach((link) => {
    link.classList.remove("active-category");
  });
}
//======== ADD TO CART ======
let productTitle;
if (document.querySelector(".product-info h2")) {
  productTitle = document.querySelector(".product-info h2").textContent;
}
let productPrice;
if (document.querySelector(".product-price")) {
  productPrice = document.querySelector(".product-price").textContent;
}
let productImg;
if (document.querySelector("#product-img")) {
  productImg = document.querySelector("#product-img").src;
}
let emptyCart = document.querySelector(".cart-products p");
let addedWidget = document.querySelector("#added-widget");
let cartCounter = document.querySelector(".cart span");
let productQt = document.getElementById("quantity");
let totalPrice = 0;
let addedItems = [];
let valueQt = 0;

// ========= ADD EVENTS ==========
window.addEventListener("load", () => {
  deleteProduct();
  showEmptyCart();
});
function showEmptyCart() {
  if (sessionStorage.getItem("products")) {
    emptyCart.style.display = "none";
  }
}
function deleteProduct() {
  let removeCart = document.querySelectorAll(".cart-remove");
  if (removeCart) {
    removeCart.forEach((btn) => {
      btn.addEventListener("click", removeFromCart);
    });
  }
}
// ============ ADD PRODUCT FROM ITS OWN PAGE========
let addCart = document.querySelector(".add-cart");
if (addCart) {
  addCart.addEventListener("click", addToCart);
}
// ============ ADD PRODUCT FROM ALL PAGES=========
let addShopCart = document.querySelectorAll(".add-shop-cart");
if (addShopCart) {
  addShopCart.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      addToShopCart(event.currentTarget);
    });
  });
}
// ========== HANDLE EVENTS FUNCTIONS ==========
function addToShopCart(key) {
  let productBox = key.closest(".product-box");
  let showCart = productBox.querySelector(".show-cart");
  let divShop = productBox.querySelector(".shop");
  key.style.display = "none";
  setTimeout(() => {
    showCart.style.display = "block";
    showCart.style.color = "white";
    divShop.addEventListener("mouseover", () => {
      console.log("hover");
      divShop.style.backgroundColor = "#000000e0";
    });
    divShop.classList.add("shop-added");
  }, 500);
  emptyCart.style.display = "none";
  cartCounter.style.display = "block";
  valueQt = 1;
  productTitle = productBox.querySelector(".info h2").textContent;
  productPrice = productBox.querySelector(".actual-price").textContent;
  productImg = productBox.querySelector(".product-img").src;
  addItemsToCart(valueQt);
  setLocalCounter(valueQt);
  deleteProduct();
}
function addToCart() {
  emptyCart.style.display = "none";
  cartCounter.style.display = "block";
  addedWidget.style.display = "flex";
  valueQt = parseInt(productQt.options[productQt.selectedIndex].text);
  addItemsToCart(valueQt);
  productWidgetMsg(valueQt);
  setLocalCounter(valueQt);
  deleteProduct();
}
// ============ FUNCTIONS ==============
function addItemsToCart(valueQt) {
  let valueCounter = sessionStorage.getItem("Counter for " + productTitle);
  if (valueCounter) {
    valueCounter = parseInt(valueCounter);
    sessionStorage.setItem(
      "Counter for " + productTitle,
      valueCounter + valueQt
    );
  } else {
    sessionStorage.setItem("Counter for " + productTitle, valueQt);
  }
  valueCounter = sessionStorage.getItem("Counter for " + productTitle);
  let newItem = {
    productImg,
    productTitle,
    productPrice,
    valueCounter,
  };
  addedItems = JSON.parse(sessionStorage.getItem("products")) || [];
  let foundItem = addedItems.find(
    (item) => item.productTitle == newItem.productTitle
  );
  if (foundItem) {
    foundItem.valueCounter = valueCounter;
    sessionStorage.setItem("products", JSON.stringify(addedItems));
    let prouctsTitle = document.querySelectorAll(".cart-title");
    prouctsTitle.forEach((product) => {
      if (product.textContent === foundItem.productTitle) {
        let cartPriceQt = product.nextElementSibling;
        cartPriceQt.textContent = `${valueCounter} * ${productPrice}`;
      }
    });
  } else {
    addedItems.push(newItem);
    sessionStorage.setItem("products", JSON.stringify(addedItems));
    let cartBox = cartBoxContent(
      productImg,
      productTitle,
      productPrice,
      valueQt
    );
    let newNode = document.createElement("div");
    newNode.innerHTML = cartBox;
    let cartProducts;
    if (document.querySelector(".cart-products")) {
      cartProducts = document.querySelector(".cart-products");
    }
    cartProducts.prepend(newNode);
  }
  total(productPrice, valueQt);
}
// =======================
function cartBoxContent(productImg, productTitle, productPrice, valueQt) {
  return `
          <div class="cart-box">
            <a class="img-cart" href="fuchsia-dress.html">
              <img src=${productImg} alt="">
            </a>
            <div class="cart-info">
              <div class="cart-title">${productTitle}</div>
              <span class="cart-price">${valueQt} * ${productPrice}</span>
            </div>
            <i class="fa-solid fa-trash cart-remove"></i>
          </div>
          `;
}
if (JSON.parse(sessionStorage.getItem("products"))) {
  addedItems = JSON.parse(sessionStorage.getItem("products"));
  addedItems.forEach((product) => {
    let newNode = document.createElement("div");
    let fileName = product.productTitle
      .trim()
      .replace(/ /g, "-")
      .concat(".html");
    console.log(fileName);
    newNode.innerHTML = `
          <div class="cart-box">
            <a class="img-cart" href="${fileName}">
              <img src=${product.productImg} alt="">
            </a>
            <div class="cart-info">
              <div class="cart-title">${product.productTitle}</div>
              <span class="cart-price"> ${product.valueCounter} * ${product.productPrice}</span>
            </div>
            <i class="fa-solid fa-trash cart-remove"></i>
          </div>
          `;
    let cartProducts = document.querySelector(".cart-products");
    cartProducts.appendChild(newNode);
    total(product.productPrice, product.valueCounter);
  });
}
// =======================
function total(productPrice, valueQt) {
  let x = productPrice.replace(",", ".");
  totalPrice += parseFloat(x) * parseInt(valueQt);
  let totalDom = document.querySelector(".added-total");
  totalDom.style.display = "block";
  totalDom.innerHTML = `
                        <div class="total">
                          <div class="total-title">total :</div>
                          <div class="total-price">${totalPrice
                            .toFixed(2)
                            .replace(".", ",")} DH</div>
                        </div>
                        <a href="cart.html" class="show-cart">Show Cart</a>
    `;
}
// =======================
function setLocalCounter(valueQt) {
  let productsCounter = sessionStorage.getItem("itemsCounter");
  if (productsCounter) {
    productsCounter = parseInt(productsCounter);
    cartCounter.style.display = "block";
    sessionStorage.setItem("itemsCounter", valueQt + productsCounter);
    cartCounter.textContent = valueQt + productsCounter;
  } else {
    sessionStorage.setItem("itemsCounter", valueQt);
    cartCounter.textContent = valueQt;
  }
}
// =======================
function productWidgetMsg(valueQt) {
  let addMsg = document.querySelector(".added-widget-msg");
  if (productQt.selectedIndex == 0) {
    addMsg.textContent =
      " «" + productTitle + "» " + "added to your shopping cart";
  } else {
    addMsg.textContent =
      valueQt +
      " * " +
      " «" +
      productTitle +
      "» " +
      "added to your shopping cart";
  }
}
// ========= update counter =========
function setCartCounter() {
  let productsCounter = sessionStorage.getItem("itemsCounter");
  if (productsCounter) {
    cartCounter.style.display = "block";
    cartCounter.textContent = productsCounter;
  }
}
setCartCounter();
// =======================
function removeFromCart(event) {
  console.log("removed");
  let removedParent = event.currentTarget.closest(".cart-box");
  let removedParentTitle =
    removedParent.querySelector(".cart-title").textContent;
  addedItems.forEach((item) => {
    if (item.productTitle === removedParentTitle) {
      totalPrice -= parseFloat(item.productPrice) * item.valueCounter;
      let newTotal = document.querySelector(".total-price");
      newTotal.textContent = `${totalPrice} DH`;
      addedItems = addedItems.filter(
        (product) => product.productTitle !== removedParentTitle
      );
      sessionStorage.setItem("products", JSON.stringify(addedItems));
      let productsCounter = sessionStorage.getItem("itemsCounter");
      productsCounter -= item.valueCounter;
      sessionStorage.setItem("itemsCounter", productsCounter);
      sessionStorage.removeItem("Counter for " + item.productTitle);
    }
  });
  removedParent.remove();
  if (sessionStorage.getItem("itemsCounter") === "0") {
    sessionStorage.removeItem("itemsCounter");
    sessionStorage.removeItem("products");
    cartCounter.style.display = "none";
    emptyCart.style.display = "block";
    document.querySelector(".added-total").style.display = "none";
  } else cartCounter.textContent = sessionStorage.getItem("itemsCounter");
}
let emptyDataCart = document.querySelector("#empty-data-cart");
let cartPage = document.querySelector(".cart-section .container");
if (sessionStorage.getItem("products") && emptyDataCart) {
  emptyDataCart.style.display = "none";
  cartPage.style.display = "block";
}
// ============================
function showProductsInCartPage() {
  if (sessionStorage.getItem("products")) {
    addedItems = JSON.parse(sessionStorage.getItem("products"));
    addedItems.forEach((item) => {
      creatProductsPage(item);
      upateTotalPage();
    });
  }
}
// ============= CART PAGE =============
function creatProductsPage(item) {
  let x = item.productPrice.replace(",", ".");
  x = parseFloat(x) * item.valueCounter;
  let fileName = item.productTitle
    .toLowerCase()
    .trim()
    .replace(/ /g, "-")
    .concat(".html");
  let newProduct = `
                      <td class="product-remove">
                        <i class="fa-solid fa-trash remove-product"></i>
                      </td>
                      <td class="product-thumbnail"><a href="${fileName}">
                        <img src=${item.productImg} alt=""></a>
                      </td>
                      <td data-cell="product">${item.productTitle}</td>
                      <td data-cell="price">${item.productPrice}</td>
                      <td data-cell="quantity">
                        <div class="shop-quantity">
                          <a  class="fa-solid fa-minus minus"></a>
                          <input class="input-value" type="text" value=${
                            item.valueCounter
                          }>
                          <a class="fa-solid fa-plus plus"></a>
                        </div>
                      </td>
                      <td data-cell="subtotal">${x
                        .toFixed(2)
                        .replace(".", ",")} DH</td>
      `;
  let cartPageContainer;
  if (document.querySelector(".cart-section .container")) {
    cartPageContainer = document.querySelector(".total-cart-products tbody");
    let newDiv = document.createElement("tr");
    newDiv.innerHTML = newProduct;
    cartPageContainer.prepend(newDiv);
  }
}
// =======================
function upateTotalPage() {
  addedItems = JSON.parse(sessionStorage.getItem("products"));
  if (addedItems) {
    let sum = 0;
    let totalCartPage = document.querySelectorAll(".subtotal-price");
    console.log(totalCartPage);
    addedItems.forEach((item) => {
      let y = item.productPrice.replace(",", ".");
      sum += parseFloat(y) * parseInt(item.valueCounter);
    });
    totalCartPage.forEach((total) => {
      total.textContent = sum.toFixed(2).replace(".", ",") + " DH";
    });
  }
}
// ===========================
showProductsInCartPage();
let submitOrder = document.querySelector("#submit-order");
if (submitOrder) {
  submitOrder.addEventListener("click", confirmOrder);
}
// ===========================
function confirmOrder() {
  upateTotalPage();
  if (sessionStorage.getItem("products")) {
    cartPage.innerHTML = `your order is submited <br><br> Thank you for your trust <i class="fa-solid fa-heart">`;
    sessionStorage.clear();
  } else {
    emptyDataCart.style.display = "block";
    emptyDataCart.querySelector("p").textContent =
      "you can not submit unless you have products in the cart ";
    cartPage.textContent = "";
  }
}
// ===========QUANTITY CHECKER===========
let inputValue = document.querySelectorAll(".input-value");
if (inputValue) {
  inputValue.forEach((input) => {
    let quantityMinus = input.previousElementSibling;
    let quantityPlus = input.nextElementSibling;
    quantityMinus.addEventListener("click", (event) => {
      let productsCounter = sessionStorage.getItem("itemsCounter");
      decreaseQt(input, event.target, productsCounter);
    });
    quantityPlus.addEventListener("click", (event) => {
      let productsCounter = sessionStorage.getItem("itemsCounter");
      increaseQt(input, event.target, productsCounter);
    });
  });
}
// ===============================
function decreaseQt(input, quantityMinus, productsCounter) {
  if (input.value <= 0) {
    quantityMinus.classList.add("disabled");
    return false;
  } else {
    input.value--;
    productsCounter--;
    sessionStorage.setItem("itemsCounter", productsCounter);
  }
}
function increaseQt(input, quantityPlus, productsCounter) {
  if (input.value >= 100) {
    quantityPlus.classList.add("disabled");
    return false;
  } else {
    input.value++;
    productsCounter++;
    sessionStorage.setItem("itemsCounter", productsCounter);
  }
}
// ============UPADTE CART WITH NEW QUANTITY=========
let updateCart = document.querySelector(".update-cart");
if (updateCart) {
  updateCart.addEventListener("click", updateCartContent);
}
// ================================
function updateCartContent() {
  inputValue.forEach((input) => {
    let tr = input.closest("tr");
    let updateItem = tr.querySelector("[data-cell='product']").textContent;
    let subTotalItem = tr.querySelector("[data-cell='subtotal']");
    addedItems.forEach((item) => {
      if (item.productTitle == updateItem) {
        item.valueCounter = input.value;
        let x = parseFloat(item.productPrice) * input.value;
        subTotalItem.textContent = `${x.toFixed(2)} DH`;
      }
    });
    sessionStorage.setItem("products", JSON.stringify(addedItems));
  });
  upateTotalPage();
}
// ===========REMOVE PRODUCT FROM CART PAGE========
let removeProduct = document.querySelectorAll(".remove-product");
if (removeProduct) {
  removeProduct.forEach((item) => {
    item.addEventListener("click", (event) => {
      removeFromCartPg(event.target);
    });
  });
}
//
function removeFromCartPg(button) {
  let removedParentPg = button.closest("tr");
  let removedParentPgTitle = removedParentPg.querySelector(
    "[data-cell='product']"
  ).textContent;
  console.log(removedParentPgTitle);
  addedItems.forEach((item) => {
    console.log("foreach item");
    if (item.productTitle === removedParentPgTitle) {
      console.log("if equal to title");
      addedItems = addedItems.filter(
        (product) => product.productTitle !== removedParentPgTitle
      );
      sessionStorage.setItem("products", JSON.stringify(addedItems));
      let productsCounter = sessionStorage.getItem("itemsCounter");
      productsCounter -= item.valueCounter;
      sessionStorage.setItem("itemsCounter", productsCounter);
      sessionStorage.removeItem("Counter for " + item.productTitle);
    }
  });
  upateTotalPage();
  removedParentPg.remove();
  if (sessionStorage.getItem("itemsCounter") === "0") {
    emptyDataCart.style.display = "block";
    cartPage.style.display = "none";
    sessionStorage.removeItem("itemsCounter");
    sessionStorage.removeItem("products");
  }
}
