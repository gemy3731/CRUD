var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productCat = document.getElementById("productCat");
var productDesc = document.getElementById("productDesc");
var addButton = document.getElementById("addButton")
var updateButton = document.getElementById("updateButton")
var productList = [];
if(localStorage.getItem("productList")!=null){
    productList=JSON.parse(localStorage.getItem("productList"));
    displayProduct(productList);
}

function addProduct() {
    var product = {
        name : productName.value,
        price : productPrice.value,
        cat : productCat.value,
        desc : productDesc.value,
        id : productList.length,
    }
    productList.push(product);
    clearData()
    displayProduct(productList);
    updateLocalStorage()
}
function displayProduct(list) {
    var container = "";
    for(var i= 0 ; i<list.length ; i++){
        container+=` <div class="col-lg-4">
                     <div class="border border-2 rounded border-primary overflow-hidden">
                    <img src="image/7061_5ff3cbe5d9f6b-1609812965.jpg" class="w-100" alt="">
                    <div class="p-3">
                        <h2>
                            Name : ${list[i].name}
                        </h2>
                        <h3>
                            Price : ${list[i].price}
                        </h3>
                        <h3>
                            Category : ${list[i].cat}
                        </h3>
                        <h3>
                            Description : ${list[i].desc}
                        </h3>
                        <h3>
                            id : ${productList[i].id}
                        </h3>
                        <button onclick="getProductToUpdate(${productList[i].id})" id="updateBtn" class="btn btn-outline-warning w-100 mb-2">Update</button>
                        <button onclick="deleteProduct(${productList[i].id})" id="deleteBtn" class="btn btn-outline-danger w-100">Delete</button>
                    </div>
                </div>
                </div>`
    }
    document.getElementById("card").innerHTML=container;
}
function clearData() {
    productName.value = null;
    productPrice.value = null;
    productCat.value = null;
    productDesc.value = null;
}
function updateLocalStorage() {
    localStorage.setItem("productList",JSON.stringify(productList));
}
function deleteProduct(index) {
    console.log(index);
    for (const item of productList) {
        console.log(item);
        if (item.id==index) {
            console.log(item,productList.indexOf(item));
            productList.splice(productList.indexOf(item),1);
        }
    }
    displayProduct(productList);
    updateLocalStorage();
}
var currentIndex;
function getProductToUpdate(index) {
    for (const item of productList) {
        console.log(item);
        if (item.id==index) {
            currentIndex = index;
            console.log(item);
            productName.value = productList[productList.indexOf(item)].name;
            productPrice.value = productList[productList.indexOf(item)].price;
            productCat.value = productList[productList.indexOf(item)].cat;
            productDesc.value = productList[productList.indexOf(item)].desc;
        }
    }
    addButton.classList.add("d-none")
    updateButton.classList.remove("d-none")
}
function updateProduct() {
    console.log(currentIndex);
    for (const item of productList) {
        if (item.id==currentIndex) {
            productList[productList.indexOf(item)].name = productName.value;
            productList[productList.indexOf(item)].price = productPrice.value;
            productList[productList.indexOf(item)].cat = productCat.value;
            productList[productList.indexOf(item)].desc = productDesc.value;
    }
}
    displayProduct(productList);
    addButton.classList.remove("d-none");
    updateButton.classList.add("d-none");
    updateLocalStorage();
    clearData();
}
function search(searchValue) {
    var searchItem = [];
    for (const item of productList) {
        if(item.name.toLowerCase().includes(searchValue.toLowerCase())){
            searchItem.push(item);
        }
    }
    displayProduct(searchItem);
}