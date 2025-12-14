
//fetch products function
async function fetchProducts() {

    try {
        const response = await fetch("https://dummyjson.com/products");

        if (!response.ok) throw new Error ("Network Error");

        const data = await response.json();

        const productList = document.getElementById("productList");

        data.products.map((product) => {

          const div = document.createElement("div");

          div.className = "col";

          div.innerHTML = `
          <div class="card product-card border-0 rounded-4 shadow-lg my-4">
              <img src="
                  ${product.images}"
              class="img-fluid w-100" alt="...">
              <div class="card-body rounded-bottom-4 border-0 bg-primary-blue">
                  <div class="rating my-3">
                  <span class="text-black h4">${
                    product.rating
                  }</span>
                    <span class="star" data-rating="1">&#9733;</span>
                    <span class="star" data-rating="2">&#9733;</span>
                    <span class="star" data-rating="3">&#9733;</span>
                    <span class="star" data-rating="4">&#9733;</span>
                    <span class="star" data-rating="5">&#9733;</span>
                  </div>
                  <h4 class="card-title my-3">
                      ${product.title.slice(0, 18)}
                  </h4>
                  <p class="lead fw-normal line-clamp my-3">
                      ${product.description}
                  </p>
                  <div class="d-flex justify-content-between align-items-center mt-4">
                      <h4 class="card-title pricing-card-title">
                          ₹ ${Math.round(product.price * 89.87).toLocaleString('en-US')}
                      </h4>
                      <a type="button"
                      href="product_details.html?id=${product.id}"
                      onclick="fetchProductDetails()" class="btn btn-lg bg-header text-white">View Product</a>
                  </div>
              </div>
          </div>
        </div>`;

          productList.appendChild(div);

        });


    } catch (error) {

        console.error("Error", error);

        document.getElementById("productList").innerHTML = `<li class="text-danger">No List Found</li>`;

    }

}

document.addEventListener("DOMContentLoaded", fetchProducts);

// fetch categories function
async function fetchCategories() {

  try {
    const response = await fetch(
      "https://dummyjson.com/products/category-list"
    );

    if (!response.ok) throw new Error("Network Error");

    const categories = await response.json();

    const categoryList = document.getElementById("categoryList");


    // for unique categories
    categories.reduce((acc, curr) => {

      if (!acc.some((cat) => cat.category === curr.category)) {

        acc.push(curr);

      }
      return acc;

    }, []);

    categories.map((category) => {

      const li = document.createElement("li");

      const a = document.createElement("a");

      li.className = "nav-item";

      li.innerHTML = `
      <a class="nav-link text-white d-flex align-items-top gap-2 my-2" href="#" data-category="${category}">
        <i class="bi bi-file-earmark-text d-none"></i>
        ${category}
      </a>`;

      categoryList.appendChild(li).appendChild(a);
    });

    // Add click functionality
    categoryList.querySelectorAll("a").forEach((link) => {

      link.addEventListener("click", (e) => {

        e.preventDefault();

        let selectedCategory = link.getAttribute("data-category");

        fetchDetailsByCategory(selectedCategory);
      });
    });

  } catch (error) {
    console.error("Error", error);

    document.getElementById(
      "categoryList"
    ).innerHTML = `<li class="text-danger">No List Found</li>`;
  }
}

document.addEventListener("DOMContentLoaded", fetchCategories);


// Get ID from URL
const urlParams = new URLSearchParams(window.location.search);

const id = urlParams.get("id");


// fetch product details function
async function fetchProductDetails(id) {

  try {

    const response = await fetch(`https://dummyjson.com/products/${id}`);

    if (!response.ok) throw new Error("Network Error");

    const sproduct = await response.json();

    const productDetails = document.getElementById("productDetails");

    const div = document.createElement("div");

    div.className = "row";

    div.innerHTML = `
      <div class="col-lg-5 col-md-6 col-12">
        <img src="${sproduct.images}" class="img-fluid w-100 rounded" alt="product_image">
      </div>

      <div class="col-lg-7 col-md-6 col-12 my-5 pt-4">
        <h2 class="fs-1 fw-bold">${sproduct.title}</h2>
        <h2 class="text-success my-3 fs-1">
          ₹ ${Math.round(sproduct.price * 89.87).toLocaleString("en-IN")}
        </h2>
        <div class="rating mb-3">
          <span class="fs-4 fw-bold">${sproduct.rating}</span>
          <span class="star">&#9733;</span>
          <span class="star">&#9733;</span>
          <span class="star">&#9733;</span>
          <span class="star">&#9733;</span>
          <span class="star">&#9733;</span>
        </div>
        <h5 class="text-dark fs-4 fw-normal">Category: ${sproduct.category}</h5>
        <p class="lead fw-normal fs-4 mt-3">${sproduct.description}</p>
        <button class="btn btn-dark btn-lg mt-3">Add to Cart</button>
      </div>`;

    productDetails.appendChild(div);

  } catch (error) {
    console.error("Error", error);

    document.getElementById(
      "productDetails"
    ).innerHTML = `<h5 class="text-danger">No Product Found</h5>`;
  }

}

fetchProductDetails(id);


//fetch product by selected category

async function fetchDetailsByCategory(categoryName) {

  try {

    const response = await fetch(
      `https://dummyjson.com/products/category/${categoryName}`
    );

    if (!response.ok) throw new Error("Network Error");

    const data = await response.json();

    const productList = document.getElementById("productList");

    productList.innerHTML ="";

    data.products.map((product) => {

      const div = document.createElement("div");

      div.className = "col";

      div.innerHTML = `
        <div class="card product-card shadow-lg my-4">
            <img src="
                ${product.images}"
            class="img-fluid w-100" alt="...">
            <div class="card-body bg-body-secondary bg-opacity-75">
                <div class="rating my-3">
                <span class="text-black h4">${product.rating}</span>
                  <span class="star" data-rating="1">&#9733;</span>
                  <span class="star" data-rating="2">&#9733;</span>
                  <span class="star" data-rating="3">&#9733;</span>
                  <span class="star" data-rating="4">&#9733;</span>
                  <span class="star" data-rating="5">&#9733;</span>
                </div>
                <h4 class="card-title my-3">
                    ${product.title.slice(0, 18)}
                </h4>
                <p class="lead fw-normal line-clamp my-3">
                    ${product.description}
                </p>
                <div class="d-flex justify-content-between align-items-center mt-4">
                    <h4 class="card-title pricing-card-title">
                        ₹ ${Math.round(
                          product.price * 89.87
                        ).toLocaleString("en-US")}
                    </h4>
                    <a type="button"
                    href="product_details.html?id=${product.id}"
                    onclick="fetchProductDetails()" class="btn btn-lg btn-primary">View Product</a>
                </div>
            </div>
        </div>
      </div>`;

      productList.appendChild(div);

    });

  } catch (error) {

    console.error("Error", error);

    document.getElementById("productList").innerHTML = `<li class="text-danger">No List Found</li>`;

  }

}

// fetch by aesc order
async function asc() {

  const response = await fetch(
    `https://dummyjson.com/products/`
  );

  if (!response.ok) throw new Error("Network Error");

  const data = await response.json();

  const productList = document.getElementById("productList");

   productList.innerHTML = "";

  let sortdata = [...data.products].sort((a, b) => {

    return a.price - b.price ;

  });

  sortdata.map((product) => {
    const div = document.createElement("div");

    div.className = "col";

    div.innerHTML = `
        <div class="card product-card shadow-lg my-4">
          <img src="
              ${product.images}"
          class="img-fluid w-100" alt="...">
          <div class="card-body bg-body-secondary bg-opacity-75">
              <div class="rating my-3">
              <span class="text-black h4">${product.rating}</span>
                <span class="star" data-rating="1">&#9733;</span>
                <span class="star" data-rating="2">&#9733;</span>
                <span class="star" data-rating="3">&#9733;</span>
                <span class="star" data-rating="4">&#9733;</span>
                <span class="star" data-rating="5">&#9733;</span>
              </div>
              <h4 class="card-title my-3">
                  ${product.title.slice(0, 18)}
              </h4>
              <p class="lead fw-normal line-clamp my-3">
                  ${product.description}
              </p>
              <div class="d-flex justify-content-between align-items-center mt-4">
                  <h4 class="card-title pricing-card-title">
                      ₹ ${Math.round(
                        product.price * 89.87
                      ).toLocaleString("en-US")}
                  </h4>
                  <a type="button"
                  href="product_details.html?id=${product.id}"
                  onclick="fetchProductDetails()" class="btn btn-lg btn-primary">View Product</a>
              </div>
          </div>
      </div>
    </div>`;

      productList.appendChild(div);
  });

}


// fetch by desc order
async function desc() {
  const response = await fetch(`https://dummyjson.com/products/`);

  if (!response.ok) throw new Error("Network Error");

  const data = await response.json();

  const productList = document.getElementById("productList");

  productList.innerHTML = "";

  let sortdata = [...data.products].sort((a, b) => {

    return  b.price - a.price;
  });

  sortdata.map((product) => {
    const div = document.createElement("div");

    div.className = "col";

    div.innerHTML = `
      <div class="card product-card shadow-lg my-4">
            <img src="
                ${product.images}"
            class="img-fluid w-100" alt="...">
            <div class="card-body bg-body-secondary bg-opacity-75">
                <div class="rating my-3">
                <span class="text-black h4">${
                  product.rating
                }</span>
                  <span class="star" data-rating="1">&#9733;</span>
                  <span class="star" data-rating="2">&#9733;</span>
                  <span class="star" data-rating="3">&#9733;</span>
                  <span class="star" data-rating="4">&#9733;</span>
                  <span class="star" data-rating="5">&#9733;</span>
                </div>
                <h4 class="card-title my-3">
                    ${product.title.slice(0, 18)}
                </h4>
                <p class="lead fw-normal line-clamp my-3">
                    ${product.description}
                </p>
                <div class="d-flex justify-content-between align-items-center mt-4">
                    <h4 class="card-title pricing-card-title">
                        ₹ ${Math.round(
                          product.price * 89.87
                        ).toLocaleString("en-US")}
                    </h4>
                    <a type="button"
                    href="product_details.html?id=${product.id}"
                    onclick="fetchProductDetails()" class="btn btn-lg btn-primary">View Product</a>
                </div>
            </div>
        </div>
      </div>`;

    productList.appendChild(div);
  });
}

let timeout;

function debounceSearch(time, delay) {

  return function (...args) {

    clearTimeout(timeout);

    timeout = setTimeout(() => {

      time.apply(this, args)

    },delay);

  }
}

//product search functionality
async function searchProducts() {

  const query = document.getElementById("productsearch").value.trim().toLowerCase();

  try {

    const response = await fetch(`https://dummyjson.com/products/search?q=${query}`);

    if (!response.ok) throw new Error("Network Error");

    const data = await response.json();

    const productList = document.getElementById("productList");

    if (data.products.length === 0) {

      productList.innerHTML = `<h1 class="text-white display-4 mt-5 w-100">Something went wrong. Please try again</h1>`;

      return;
    }

    productList.innerHTML = "";


    data.products.map((product) => {

      const div = document.createElement("div");

      div.className = "col";

      div.innerHTML = `
          <div class="card product-card border-0 shadow-lg my-4">
              <img src="
                  ${product.images}"
              class="img-fluid w-100" alt="...">
              <div class="card-body bg-primary-blue bg-opacity-75">
                  <div class="rating my-3">
                  <span class="text-black h4">${product.rating}</span>
                    <span class="star" data-rating="1">&#9733;</span>
                    <span class="star" data-rating="2">&#9733;</span>
                    <span class="star" data-rating="3">&#9733;</span>
                    <span class="star" data-rating="4">&#9733;</span>
                    <span class="star" data-rating="5">&#9733;</span>
                  </div>
                  <h4 class="card-title my-3">
                      ${product.title.slice(0, 18)}
                  </h4>
                  <p class="lead fw-normal line-clamp my-3">
                      ${product.description}
                  </p>
                  <div class="d-flex justify-content-between align-items-center mt-4">
                      <h4 class="card-title pricing-card-title">
                          ₹ ${Math.round(product.price * 89.87).toLocaleString(
                            "en-US"
                          )}
                      </h4>
                      <a type="button"
                      href="product_details.html?id=${product.id}"
                      onclick="fetchProductDetails()" class="btn btn-lg btn-dark">View Product</a>
                  </div>
              </div>
          </div>
        </div>`;

      productList.appendChild(div);
    });


  } catch (error) {

    console.error(error);

    productList.innerHTML = `<p class="text-danger">Something went wrong.</p>`;

  }
}

document.addEventListener("input", debounceSearch(searchProducts, 200));