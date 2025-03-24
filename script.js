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
        const productImage = params.get("image"); // Get the image URL from the query parameters

        if (productName) {
            const productDetails = {
                "T-Shirt": {
                    price: "$19.99",
                    description: "A comfortable cotton T-Shirt.",
                    material: "Cotton",
                    designer: "TrendyThreads",
                    availableQuantity: 50
                },
                "Joggers": {
                    price: "$29.99",
                    description: "Stylish and comfortable joggers.",
                    material: "Polyester",
                    designer: "TrendyThreads",
                    availableQuantity: 30
                },
                "Leather Jacket": {
                    price: "$89.99",
                    description: "A premium leather jacket for all seasons.",
                    material: "Leather",
                    designer: "TrendyThreads",
                    availableQuantity: 10
                },
                "Cap": {
                    price: "$14.99",
                    description: "A trendy cap to complete your outfit.",
                    material: "Cotton",
                    designer: "TrendyThreads",
                    availableQuantity: 100
                },
                "Sneakers": {
                    price: "$39.00",
                    description: "Comfortable and stylish sneakers.",
                    material: "Rubber and Fabric",
                    designer: "TrendyThreads",
                    availableQuantity: 25
                }
            };

            const product = productDetails[productName];
            if (product) {
                // Set the main product image dynamically
                if (productImage) {
                    document.getElementById("product-image").src = productImage;
                }

                document.getElementById("product-name").textContent = productName;
                document.getElementById("product-price").textContent = product.price;
                document.getElementById("product-description").textContent = product.description;
                document.getElementById("product-material").textContent = `Material: ${product.material}`;
                document.getElementById("product-designer").textContent = `Designer: ${product.designer}`;
                document.getElementById("product-availability").textContent = `Available Quantity: ${product.availableQuantity}`;
                document.getElementById("product-quantity").max = product.availableQuantity;
            } else {
                document.getElementById("product-details").innerHTML = "<p>Product not found.</p>";
            }
        } else {
            document.getElementById("product-details").innerHTML = "<p>No product selected.</p>";
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
                "images/sneakers-side.jpg"
            ]
        }
    };

    function loadProductDetails() {
        const params = new URLSearchParams(window.location.search);
        const productName = params.get("product");

        if (productName && productData[productName]) {
            const product = productData[productName];

            // Update main product details
            document.getElementById("product-name").textContent = productName;
            document.getElementById("product-price").textContent = product.price;
            document.getElementById("product-description").textContent = product.description;
            document.getElementById("product-material").textContent = `Material: ${product.material}`;
            document.getElementById("product-designer").textContent = `Designer: ${product.designer}`;
            document.getElementById("product-availability").textContent = `Available Quantity: ${product.availableQuantity}`;
            document.getElementById("product-quantity").max = product.availableQuantity;

            // Update main product image
            const mainImage = document.getElementById("product-image");
            mainImage.src = product.images[0];
            mainImage.alt = productName;

            // Update thumbnail gallery
            const thumbnailGallery = document.getElementById("thumbnail-gallery");
            thumbnailGallery.innerHTML = ""; // Clear existing thumbnails
            product.images.forEach((image, index) => {
                const thumbnail = document.createElement("img");
                thumbnail.src = image;
                thumbnail.alt = `${productName} View ${index + 1}`;
                thumbnail.classList.add("thumbnail-image");

                // Add click event to update main image
                thumbnail.addEventListener("click", function () {
                    mainImage.src = image;
                    mainImage.alt = `${productName} View ${index + 1}`;
                });

                thumbnailGallery.appendChild(thumbnail);
            });
        } else {
            document.getElementById("product-details").innerHTML = "<p>Product not found.</p>";
        }
    }

    // Check if we are on the product-details.html page
    if (window.location.pathname.includes("product-details.html")) {
        loadProductDetails();
    }
});


