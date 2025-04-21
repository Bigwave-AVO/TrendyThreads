document.addEventListener("DOMContentLoaded", function () {
    // Function to set up search functionality
    function setupSearch(inputId, productListId, buttonId) {
        const searchBar = document.getElementById(inputId);
        const productContainer = document.getElementById(productListId);
        const searchButton = document.getElementById(buttonId);

        if (!searchBar || !productContainer) {
            console.error(`Search bar or product container not found for IDs: ${inputId}, ${productListId}`);
            return;
        }

        const products = productContainer.getElementsByClassName("product");

        function performSearch() {
            const searchValue = searchBar.value.toLowerCase();
            for (let product of products) {
                const productName = product.getAttribute("data-name").toLowerCase();
                if (productName.includes(searchValue)) {
                    product.style.display = "block";
                } else {
                    product.style.display = "none";
                }
            }
        }

        // Trigger search on input
        searchBar.addEventListener("input", performSearch);

        // Trigger search on button click
        if (searchButton) {
            searchButton.addEventListener("click", performSearch);
        }
    }

    // Initialize search functionality for both pages
    setupSearch("search-bar", "product-list", "search-button"); // For index.html
    setupSearch("search-bar-shop", "shop-product-list", "search-button-shop"); // For shop.html

    // Function to load product details dynamically on the product-details.html page
    function loadProductDetails() {
        const params = new URLSearchParams(window.location.search);
        const productName = params.get("product");

        if (productName) {
            // Decode and normalize the product name to match the keys in productData
            const normalizedProductName = decodeURIComponent(productName).toLowerCase();

            // Find the product in productData
            const product = Object.keys(productData).find(
                key => key.toLowerCase() === normalizedProductName
            );

            if (product && productData[product]) {
                const productDetails = productData[product];

                // Update main product details
                document.getElementById("product-name").textContent = product;
                document.getElementById("product-price").textContent = productDetails.price;
                document.getElementById("product-description").textContent = productDetails.description;
                document.getElementById("product-material").textContent = `Material: ${productDetails.material}`;
                document.getElementById("product-designer").textContent = `Designer: ${productDetails.designer}`;
                document.getElementById("product-availability").textContent = `Available Quantity: ${productDetails.availableQuantity}`;
                document.getElementById("product-quantity").max = productDetails.availableQuantity;

                // Update main product image and download link
                const mainImage = document.getElementById("product-image");
                const downloadLink = document.getElementById("download-link");
                mainImage.src = productDetails.images[0];
                mainImage.alt = product;
                downloadLink.href = productDetails.images[0]; // Set the download link

                // Update thumbnail gallery
                const thumbnailGallery = document.getElementById("thumbnail-gallery");
                thumbnailGallery.innerHTML = ""; // Clear existing thumbnails
                productDetails.images.forEach((image, index) => {
                    const thumbnail = document.createElement("img");
                    thumbnail.src = image;
                    thumbnail.alt = `${product} View ${index + 1}`;
                    thumbnail.classList.add("thumbnail-image");

                    // Add click event to update main image and download link
                    thumbnail.addEventListener("click", function () {
                        mainImage.src = image;
                        mainImage.alt = `${product} View ${index + 1}`;
                        downloadLink.href = image; // Update the download link
                    });

                    thumbnailGallery.appendChild(thumbnail);
                });
            } else {
                document.getElementById("product-details").innerHTML = "<p>Product not found.</p>";
            }
        } else {
            document.getElementById("product-details").innerHTML = "<p>Product not found.</p>";
        }
    }

    // Check if we are on the product-details.html page
    if (window.location.pathname.includes("product-details.html")) {
        loadProductDetails();
    }

    const galleryImages = document.querySelectorAll(".gallery-image");
    const mainImage = document.getElementById("product-image");

    galleryImages.forEach(image => {
        image.addEventListener("click", function () {
            mainImage.src = this.src; // Update the main product image
            mainImage.alt = this.alt; // Update the alt text
        });
    });

    const thumbnailImages = document.querySelectorAll(".thumbnail-image");

    // Add click event to each thumbnail
    thumbnailImages.forEach(thumbnail => {
        thumbnail.addEventListener("click", function () {
            // Update the main image with the clicked thumbnail's src and alt
            mainImage.src = this.src;
            mainImage.alt = this.alt;
        });
    });

    const modal = document.getElementById("image-modal");
    const modalImage = document.getElementById("modal-image");
    const closeModal = document.getElementById("close-modal");

    // Open the modal when the main image is clicked
    mainImage.addEventListener("click", function () {
        modal.style.display = "block";
        modalImage.src = this.src;
        modalImage.alt = this.alt;
    });

    // Close the modal when the close button is clicked
    closeModal.addEventListener("click", function () {
        modal.style.display = "none";
    });

    // Close the modal when clicking outside the image
    modal.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const productData = {
        "T-Shirt": {
            price: "$19.99",
            description: "A comfortable cotton T-Shirt.",
            material: "Cotton",
            designer: "TrendyThreads",
            availableQuantity: 50,
            images: [
                "images/T shirt.jpg",
                "images/T shirt-back.jpg",
            ]
        },
        "Joggers": {
            price: "$29.99",
            description: "Stylish and comfortable joggers.",
            material: "Polyester",
            designer: "TrendyThreads",
            availableQuantity: 30,
            images: [
                "images/jeans.jpg",
                "images/jeans-back.jpg"
            ]
        },
        "Leather Jacket": {
            price: "$89.99",
            description: "A premium leather jacket for all seasons.",
            material: "Leather",
            designer: "TrendyThreads",
            availableQuantity: 10,
            images: [
                "images/leather jacket.jpg"
            ]
        },
        "Cap": {
            price: "$14.99",
            description: "A trendy cap to complete your outfit.",
            material: "Cotton",
            designer: "TrendyThreads",
            availableQuantity: 100,
            images: [
                "images/cap.jpg"
            ]
        },
        "Sneakers": {
            price: "$39.00",
            description: "Comfortable and stylish sneakers.",
            material: "Rubber and Fabric",
            designer: "TrendyThreads",
            availableQuantity: 25,
            images: [
                "images/sneakers.jpg",
            ]
        },
        "Armless-shirt": {
            price: "$19.99",
            description: "A comfortable cotton Armless Shirt.",
            material: "Cotton",
            designer: "TrendyThreads",
            availableQuantity: 13,
            images: [
                "images/Armless-shirt.jpg",
                "images/Armless-shirt 2.jpg"
            ]
        }
    };

    function loadProductDetails() {
        const params = new URLSearchParams(window.location.search);
        const productName = params.get("product");

        if (productName) {
            // Decode and normalize the product name to match the keys in productData
            const normalizedProductName = decodeURIComponent(productName).toLowerCase();

            // Find the product in productData
            const product = Object.keys(productData).find(
                key => key.toLowerCase() === normalizedProductName
            );

            if (product && productData[product]) {
                const productDetails = productData[product];

                // Update main product details
                document.getElementById("product-name").textContent = product;
                document.getElementById("product-price").textContent = productDetails.price;
                document.getElementById("product-description").textContent = productDetails.description;
                document.getElementById("product-material").textContent = `Material: ${productDetails.material}`;
                document.getElementById("product-designer").textContent = `Designer: ${productDetails.designer}`;
                document.getElementById("product-availability").textContent = `Available Quantity: ${productDetails.availableQuantity}`;
                document.getElementById("product-quantity").max = productDetails.availableQuantity;

                // Update main product image
                const mainImage = document.getElementById("product-image");
                mainImage.src = productDetails.images[0];
                mainImage.alt = product;

                // Update thumbnail gallery
                const thumbnailGallery = document.getElementById("thumbnail-gallery");
                thumbnailGallery.innerHTML = ""; // Clear existing thumbnails
                productDetails.images.forEach((image, index) => {
                    const thumbnail = document.createElement("img");
                    thumbnail.src = image;
                    thumbnail.alt = `${product} View ${index + 1}`;
                    thumbnail.classList.add("thumbnail-image");

                    // Add click event to update main image
                    thumbnail.addEventListener("click", function () {
                        mainImage.src = image;
                        mainImage.alt = `${product} View ${index + 1}`;
                    });

                    thumbnailGallery.appendChild(thumbnail);
                });
            } else {
                document.getElementById("product-details").innerHTML = "<p>Product not found.</p>";
            }
        } else {
            document.getElementById("product-details").innerHTML = "<p>Product not found.</p>";
        }
    }

    // Check if we are on the product-details.html page
    if (window.location.pathname.includes("product-details.html")) {
        loadProductDetails();
    }

    const modal = document.getElementById("image-modal");
    const modalImage = document.getElementById("modal-image");
    const closeModal = document.getElementById("close-modal");

    // Open the modal when the main image is clicked
    const mainImage = document.getElementById("product-image");
    mainImage.addEventListener("click", function (event) {
        event.preventDefault(); // Prevent the default "Save Image As" behavior
        modal.style.display = "block";
        modalImage.src = this.src;
        modalImage.alt = this.alt;
    });

    // Close the modal when the close button is clicked
    closeModal.addEventListener("click", function () {
        modal.style.display = "none";
    });

    // Close the modal when clicking outside the image
    modal.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Add to Wishlist
    document.querySelectorAll(".add-to-wishlist").forEach((button) => {
        const product = getProductDetails(button);
        const wishlistIcon = button.querySelector(".wishlist-icon");

        // Check if the product is already in the wishlist and fill the icon
        if (wishlist.some((item) => item.name === product.name)) {
            wishlistIcon.classList.add("filled");
        }

        button.addEventListener("click", () => {
            if (!wishlist.some((item) => item.name === product.name)) {
                wishlist.push(product);
                localStorage.setItem("wishlist", JSON.stringify(wishlist));
                wishlistIcon.classList.add("filled"); // Fill the heart icon
            } else {
                // Remove from wishlist if already added
                const index = wishlist.findIndex((item) => item.name === product.name);
                wishlist.splice(index, 1);
                localStorage.setItem("wishlist", JSON.stringify(wishlist));
                wishlistIcon.classList.remove("filled"); // Empty the heart icon
            }
        });
    });

    // Helper function to get product details
    function getProductDetails(button) {
        const productElement = button.closest(".product");
        return {
            name: productElement.dataset.name,
            price: productElement.querySelector(".price").textContent,
            image: productElement.querySelector("img").src,
        };
    }

    // Load Wishlist Items
    function loadWishlist() {
        const wishlistContainer = document.getElementById("wishlist-items");
        wishlistContainer.innerHTML = ""; // Clear existing items

        if (wishlist.length === 0) {
            wishlistContainer.innerHTML = "<p>Your wishlist is empty.</p>";
            return;
        }

        wishlist.forEach((item, index) => {
            const itemElement = document.createElement("div");
            itemElement.classList.add("wishlist-item");
            itemElement.innerHTML = `
                <a href="product-details.html?product=${encodeURIComponent(item.name)}&image=${encodeURIComponent(item.image)}">
                    <img src="${item.image}" alt="${item.name}">
                </a>
                <a href="product-details.html?product=${encodeURIComponent(item.name)}&image=${encodeURIComponent(item.image)}">
                    <h3>${item.name}</h3>
                </a>
                <p>${item.price}</p>
                <div class="product-actions">
                    <button class="add-to-cart" data-index="${index}">Add to Cart</button>
                    <button class="remove-from-wishlist" data-index="${index}">Remove from Wishlist</button>
                </div>
            `;
            wishlistContainer.appendChild(itemElement);
        });

        // Add event listeners for buttons
        document.querySelectorAll(".add-to-cart").forEach((button) => {
            button.addEventListener("click", addToCart);
        });

        document.querySelectorAll(".remove-from-wishlist").forEach((button) => {
            button.addEventListener("click", removeFromWishlist);
        });
    }

    // Add to Cart Functionality
    function addToCart(event) {
        const index = event.target.dataset.index;
        const product = wishlist[index];

        if (!cart.some((item) => item.name === product.name)) {
            cart.push(product);
            localStorage.setItem("cart", JSON.stringify(cart));
        }
    }

    // Remove from Wishlist Functionality
    function removeFromWishlist(event) {
        const index = event.target.dataset.index;
        const product = wishlist[index];

        wishlist.splice(index, 1); // Remove the product from the wishlist
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
        loadWishlist(); // Reload the wishlist
    }

    // Initial Load
    loadWishlist();
});

document.addEventListener("DOMContentLoaded", function () {
    const searchBar = document.getElementById("search-bar-shop");

    searchBar.addEventListener("input", function (event) {
        const query = event.target.value.toLowerCase();
        const products = document.querySelectorAll(".product");

        products.forEach((product) => {
            const productName = product.dataset.name.toLowerCase();
            if (productName.includes(query)) {
                product.style.display = "block"; // Show matching products
            } else {
                product.style.display = "none"; // Hide non-matching products
            }
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    // Function to load cart items
    function loadCart() {
        const cartItemsContainer = document.getElementById("cart-items");
        const subtotalElement = document.getElementById("subtotal");
        cartItemsContainer.innerHTML = ""; // Clear existing items

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
            subtotalElement.textContent = "Subtotal: $0.00";
            return;
        }

        let subtotal = 0;

        cart.forEach((item, index) => {
            const isInWishlist = wishlist.some((wishlistItem) => wishlistItem.name === item.name);

            const itemElement = document.createElement("div");
            itemElement.classList.add("cart-item");
            itemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="cart-item-image" data-index="${index}">
                <div class="cart-item-details">
                    <h3>${item.name}</h3>
                    <p>Price: ${item.price}</p>
                    <p>Quantity: 
                        <button class="decrease-quantity" data-index="${index}">-</button>
                        <span>${item.quantity}</span>
                        <button class="increase-quantity" data-index="${index}">+</button>
                    </p>
                    <div class="product-actions">
                        <button class="add-to-wishlist" data-index="${index}">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="wishlist-icon ${isInWishlist ? 'filled' : ''}">
                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                            </svg>
                            ${isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
                        </button>
                        <button class="remove-from-cart" data-index="${index}">Remove from Cart</button>
                    </div>
                </div>
            `;
            cartItemsContainer.appendChild(itemElement);

            // Calculate subtotal
            subtotal += parseFloat(item.price.replace("$", "")) * item.quantity;
        });

        subtotalElement.textContent = `Subtotal: $${subtotal.toFixed(2)}`;

        // Add event listeners for buttons
        document.querySelectorAll(".add-to-wishlist").forEach((button) => {
            button.addEventListener("click", toggleWishlist);
        });

        document.querySelectorAll(".remove-from-cart").forEach((button) => {
            button.addEventListener("click", removeFromCart);
        });

        document.querySelectorAll(".increase-quantity").forEach((button) => {
            button.addEventListener("click", increaseQuantity);
        });

        document.querySelectorAll(".decrease-quantity").forEach((button) => {
            button.addEventListener("click", decreaseQuantity);
        });
    }

    // Function to toggle wishlist status
    function toggleWishlist(event) {
        const index = event.target.closest("button").dataset.index;
        const product = cart[index];
        const wishlistIndex = wishlist.findIndex((item) => item.name === product.name);

        if (wishlistIndex === -1) {
            // Add to wishlist
            wishlist.push(product);
        } else {
            // Remove from wishlist
            wishlist.splice(wishlistIndex, 1);
        }

        localStorage.setItem("wishlist", JSON.stringify(wishlist));
        loadCart(); // Reload the cart to update the button state
    }

    // Function to remove an item from the cart
    function removeFromCart(event) {
        const index = event.target.dataset.index;
        cart.splice(index, 1); // Remove the item from the cart
        localStorage.setItem("cart", JSON.stringify(cart));
        loadCart(); // Reload the cart
    }

    // Function to increase quantity
    function increaseQuantity(event) {
        const index = event.target.dataset.index;
        cart[index].quantity += 1;
        localStorage.setItem("cart", JSON.stringify(cart));
        loadCart(); // Reload the cart
    }

    // Function to decrease quantity
    function decreaseQuantity(event) {
        const index = event.target.dataset.index;
        if (cart[index].quantity > 1) {
            cart[index].quantity -= 1;
            localStorage.setItem("cart", JSON.stringify(cart));
            loadCart(); // Reload the cart
        }
    }

    // Initial load
    if (document.getElementById("cart-items")) {
        loadCart();
    }
});

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    const hamburgerMenu = document.querySelector('.hamburger-menu');

    if (sidebar.style.width === '250px') {
        sidebar.style.width = '0';
        overlay.classList.remove('active'); // Hide the overlay
        hamburgerMenu.classList.remove('open'); // Remove rotation
    } else {
        sidebar.style.width = '250px';
        overlay.classList.add('active'); // Show the overlay
        hamburgerMenu.classList.add('open'); // Add rotation
    }
}