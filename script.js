const fetchProducts = async () => {
  const response = await fetch("https://fakestoreapi.com/products");
  const products = await response.json();
  const container = document.getElementById("products_container");
  products.map((product) => {
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `
        <img src = "${product.image}" alt ="${product.title}">
        <h3> ${product.title}</h3>
        <p>${product.price}</p>`;

    container.appendChild(div);
  });
};

fetchProducts();

//fetching categpries from the api
const fetchCategories = async () => {
  const response = await fetch("https://fakestoreapi.com/products/categories");
  //converting response into json
  const categories = await response.json();
  // getting container
  const container = document.getElementById("category");
  // mapping categories to container
  categories.map((category) => {
    const option = document.createElement("option");
    option.textContent = category;
    option.value = category;
    container.appendChild(option);
  });
};
fetchCategories();


// categories filter  

const categoryHandler = async () => {
    // getting container
    const container = document.getElementById("products_container");
    container.innerHTML="";
    let response;
    const category = document.getElementById("category").value;
    if (category==="all"){
        response = await fetch("https://fakestoreapi.com/products")
    }
    else{
        response = await fetch("https://fakestoreapi.com/products/categories/${category}")
    }

    // converting response in to json

    const product = await response.json();
    //mapping product to container 

    product.map((product) => {
        const div = document.createElement("div");
        div.classList.add("product");
        div.innerHTML =`
        <img src = "${product.image}" alt ="${product.title}">
        <h3> ${product.title}</h3>
        <p>${product.price}</p>`;

        container.appendChild(div);
    })
}

// search functionality 

const searchHandler = () => {
    const searchField = document.getElementById("search")
    searchField.addEventListener('keyup', async (e) => {
        const container = document.getElementById("products_container");
        container.innerHTML = "";
        const searchText = e.target.value.toLowerCase();
        const response = await fetch("https://fakestoreapi.com/products")
        const products = await response.json();
        products.map((product)=>{
            if(product.title.toLowerCase().includes(searchText)){
                const div = document.createElement("div");
                div.classList.add("product");
                div.innerHTML =`
                <img src = "${product.image}" alt ="${product.title}">
                <h3> ${product.title}</h3>
                <p>${product.price}</p>`;
        
                container.appendChild(div);
            }
        })
    })
}
searchHandler();


// sort function

const sortHandler = async () => {
    const container = document.getElementById("products_container")
    container.innerHTML="";

    const response = await fetch("https://fakestoreapi.com/products");

    const products = await response.json();
    const ascending = document.getElementById("sort_by_price").value;

    products.sort((a, b) => ascending==="true" ? a.price - b.price : ascending ==="false"? b.price - a.price : '').map((product)=>{
        const div = document.createElement("div");
        div.classList.add("product");
        div.innerHTML =`
        <img src = "${product.image}" alt ="${product.title}">
        <h3> ${product.title}</h3>
        <p>${product.price}</p>`;

        container.appendChild(div);

    });
}