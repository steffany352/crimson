document.addEventListener("DOMContentLoaded", () => {

    /* ======================
       SCROLL REVEAL (SAFE)
    ====================== */

    const revealElements = document.querySelectorAll(".reveal");

    function revealOnScroll() {

        const triggerBottom = window.innerHeight * 0.85;

        revealElements.forEach((el) => {

            const top = el.getBoundingClientRect().top;

            if (top < triggerBottom) {
                el.classList.add("active");
            }

        });

    }

    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll();


    /* ======================
       CART SYSTEM
    ====================== */

    const cartIcon = document.querySelector(".cart-icon");
    const cartPanel = document.getElementById("cart-panel");
    const closeCart = document.getElementById("close-cart");

    const cartItemsContainer = document.getElementById("cart-items");
    const cartCount = document.getElementById("cart-count");
    const cartTotal = document.getElementById("cart-total");

    const orderButtons = document.querySelectorAll(".order-btn");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    function saveCart() {
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    function updateCartUI() {

        cartItemsContainer.innerHTML = "";

        let total = 0;
        let count = 0;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = `<p class="empty">No items added.</p>`;
        }

        cart.forEach((item, index) => {

            total += item.price * item.qty;
            count += item.qty;

            const div = document.createElement("div");
            div.classList.add("cart-item");

            div.innerHTML = `
                <span>${item.name}</span>

                <div class="qty-controls">

                    <button class="dec" data-index="${index}">-</button>

                    <span>${item.qty}</span>

                    <button class="inc" data-index="${index}">+</button>

                </div>

                <span>$${item.price * item.qty}</span>
            `;

            cartItemsContainer.appendChild(div);

        });

        cartCount.textContent = count;
        cartTotal.textContent = total;

    }


    /* ======================
       ADD TO CART
    ====================== */

    orderButtons.forEach(btn => {

        btn.addEventListener("click", () => {

            const name = btn.dataset.name;
            const price = Number(btn.dataset.price);

            const existing = cart.find(item => item.name === name);

            if (existing) {
                existing.qty++;
            } else {
                cart.push({
                    name,
                    price,
                    qty: 1
                });
            }

            saveCart();
            updateCartUI();

        });

    });


    /* ======================
       QUANTITY CONTROL
    ====================== */

    cartItemsContainer.addEventListener("click", (e) => {

        const index = e.target.dataset.index;

        if (e.target.classList.contains("inc")) {
            cart[index].qty++;
        }

        if (e.target.classList.contains("dec")) {

            cart[index].qty--;

            if (cart[index].qty <= 0) {
                cart.splice(index, 1);
            }

        }

        saveCart();
        updateCartUI();

    });


    /* ======================
       CART TOGGLE
    ====================== */

    if (cartIcon && cartPanel) {

        cartIcon.addEventListener("click", () => {
            cartPanel.classList.add("active");
        });

    }

    if (closeCart && cartPanel) {

        closeCart.addEventListener("click", () => {
            cartPanel.classList.remove("active");
        });

    }

    


    /* ======================
       WHATSAPP CHECKOUT
    ====================== */

    window.sendToWhatsApp = function () {

        if (cart.length === 0) return;

        let message = "Hello Crimson Table 🍷%0A%0AI want to order:%0A%0A";

        let total = 0;

        cart.forEach(item => {

            message += `${item.qty}x ${item.name} - $${item.price * item.qty}%0A`;

            total += item.price * item.qty;

        });

        message += `%0ATotal: $${total}`;

        const phone = "2348124264058"; // change this

        const url = `https://wa.me/${phone}?text=${message}`;

        window.open(url, "_blank");

    };


    /* ======================
       INIT
    ====================== */

    updateCartUI();

});

/* ======================
   AMBIENT AUDIO SYSTEM
====================== */

const audio = document.getElementById("ambient-audio");
const audioToggle = document.getElementById("audio-toggle");

let isPlaying = false;

if (audio && audioToggle) {

    audioToggle.addEventListener("click", () => {

        if (!isPlaying) {
            audio.play();
            audioToggle.classList.add("active");
            isPlaying = true;
        } else {
            audio.pause();
            audioToggle.classList.remove("active");
            isPlaying = false;
        }

    });

}