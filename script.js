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
});

document.addEventListener("DOMContentLoaded", function () {
    const mainImage = document.getElementById("product-image");
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


