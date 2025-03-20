document.addEventListener("DOMContentLoaded", function () {
    function setupSearch(inputId, productListId) {
        const searchBar = document.getElementById(inputId);
        const productContainer = document.getElementById(productListId);
        const products = productContainer.getElementsByClassName("product");

        searchBar.addEventListener("input", function () {
            const searchValue = searchBar.value.toLowerCase();
            for (let product of products) {
                const productName = product.getAttribute("data-name").toLowerCase();
                if (productName.includes(searchValue)) {
                    product.style.display = "block";
                } else {
                    product.style.display = "none";
                }
            }
        });
    }

    setupSearch("search-bar", "product-list"); // Home page
    setupSearch("search-bar-shop", "shop-product-list"); // Shop page
});


