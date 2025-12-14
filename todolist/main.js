
const form = document.getElementById("inputForm");

const productList = document.getElementById("productList");

const editModal = document.getElementById("modalForm");

let deleteall = document.getElementById("deleteAllBtn");

let Editdata = null;

// window on load function

document.addEventListener("DOMContentLoaded", displayProducts);


// form data add functionality
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("productName").value.trim();

  const price = document.getElementById("productPrice").value.trim();

  if (!name || !price) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Please enter product name and price!",
    });

    form.reset();

    return;
  } else {
    Swal.fire({
      title: "Good job!",
      text: "Product has been created sucessfully.",
      icon: "success",
    });
  }
  let products = JSON.parse(localStorage.getItem("products")) || [];

  if (Editdata !== null) {

    products[Editdata] = { name, price };

    localStorage.setItem("products", JSON.stringify(products));

    Editdata = null;

    form.reset();

    displayProducts();

    return;
  }

  let exist = products.filter((item) => item.name === name);

  if (exist.length > 0) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Same product name is not accpted!",
    });

    form.reset();

    return;
  }

  console.log(products, "products");

  products.push({ name, price });

  localStorage.setItem("products", JSON.stringify(products));

  form.reset();

  displayProducts();

});


//edit data on modal functionality
editModal.addEventListener("submit", function (e) {

  e.preventDefault();

  const name = document.getElementById("editName").value.trim();

  const price = document.getElementById("editPrice").value.trim();

  let products = JSON.parse(localStorage.getItem("products")) || [];


  if (Editdata !== null) {

    products[Editdata] = { name, price};

    localStorage.setItem("products", JSON.stringify(products));

    form.reset();

    displayProducts();

    return;
  }

  console.log("Invalid product index or editData is not set!");

});

// form data display functionality
function displayProducts(item) {
  productList.innerHTML = "";

  let products = item && item.length > 0 ? item :
    JSON.parse(localStorage.getItem("products"));

  products.length > 0
    ? products.map((products, index) => {
        let row = document.createElement("tr");
        row.innerHTML = `<td class="text-center pt-3 fs-4 text-white">${
          index + 1
        }</td>
        <td class="text-center pt-3 fs-4 text-capitalize text-white">${
          products.name
        }</td>
      <td class="text-center pt-3 fs-4 text-white">₹ ${products.price}</td>
      <td class="row text-center">
        <div class="d-lg-grid d-xl-grid d-block col-lg-4 col-xl-4 col-4 px-0">
          <button onclick="viewData(${products.originalIndex})" class="btn btn-lg btn-success bg-success bg-opacity-75 mx-lg-2 mx-1 border-0 text-capitalize px-2" data-bs-toggle="modal" data-bs-target="#viewModal" data-bs-whatever="@fat">View Item<i class="fa-solid fa-eye mx-lg-2 mx-1"></i></button>
        </div>
        <div class="d-lg-grid d-xl-grid d-block col-lg-4 col-xl-4 col-4 px-0">
          <button onclick="editData(${products.originalIndex})" class="btn btn-lg btn-info bg-info bg-opacity-75 mx-lg-2 mx-1 border-0 text-capitalize px-2" data-bs-toggle="modal" data-bs-target="#viewModal2" data-bs-whatever="@fat"> Edit Item<i class="fa-regular fa-pen-to-square mx-lg-2 mx-1"></i></button>
        </div>
        <div class="d-lg-grid d-xl-grid d-block col-lg-4 col-xl-4 col-4 px-0">
          <button onclick="deleteData(${products.originalIndex})" class="btn btn-lg btn-danger bg-danger bg-opacity-75 mx-lg-2 mx-0 border-0 text-capitalize px-2">Delete Item<i class="fa-solid fa-trash-can mx-xl-2 mx-1"></i></button>
        </div>
      </td>`;
        productList.appendChild(row);
      })
    : (productList.innerHTML = `<tr>
      <td colspan="4" class="text-center fs-4 text-white">No Data Found</td>
    </tr>`);

    let deleteall = document.getElementById("deleteAllBtn");

    if (products.length <= 1 ) {

      deleteall.className =
        "btn btn-lg btn-danger bg-danger bg-opacity-75 border-0 fw-normal w-100 d-none";

    } else {

      deleteall.className =
        "btn btn-lg btn-danger bg-danger bg-opacity-75 border-0 fw-normal w-100 d-block";
    }
}

// view data modal functionality
function viewData(index) {

  let products = JSON.parse(localStorage.getItem("products")) || [];

  let product = products[index];

  localStorage.setItem("product", JSON.stringify(product));

  console.log(product, "product");

  shownName.value = `${product.name}`;

  shownPrice.value = `${product.price}`;
}

//get form data for edit functionality
function editData(index) {

  let products = JSON.parse(localStorage.getItem("products")) || [];

  Editdata = index;

  document.getElementById("editName").value = products[index]?.name;

  document.getElementById("editPrice").value = products[index]?.price;

  displayProducts();
}

//form data search functionality
function searchProduct () {

  let products = JSON.parse(localStorage.getItem("products")) || [];

  let search = document.getElementById("search").value.trim();

  products = products.map((item, index) => ({ ...item, originalIndex: index }));

  let productsfilter = products.filter((item)=>item.name === search);

  console.log(productsfilter, "productsfilter")

  // if (products.name !== productList) {

  //   Swal.fire({
  //     icon: "error",
  //     title: "Oops...",
  //     text: "please try agin, no data found",
  //   });
  // }

  form.reset();

  displayProducts(productsfilter);

}

// form data delete functionality
function deleteData(sid) {
  let products = JSON.parse(localStorage.getItem("products"));

  products.splice(sid, 1);

  localStorage.setItem("products", JSON.stringify(products));

  Swal.fire({
    title: "Deleted!",
    text: "Your product has been deleted.",
    icon: "success",
  });

  displayProducts();
}

// all form data delete functionality
function allDelete() {

  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert the products!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete all products!",
  }).then((result) => {

    if (result.isConfirmed) {

      localStorage.removeItem("products");

      deleteall.className =
        "btn btn-lg btn-danger bg-danger bg-opacity-75 border-0 fw-normal w-100 d-none";

      displayProducts();

      form.reset();

      Swal.fire({
        title: "Deleted!",
        text: "Your all products has been deleted.",
        icon: "success",
      });
    }
  });

}
