let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let count = document.getElementById("count");
let category = document.getElementById("category");
let Createbtn = document.getElementById("create");
let total = document.getElementById("total");
// Gettotal

let mood = "create";
let tmp;

function GetTotal() {
  if (price.value != "") {
    let res = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = res;
    total.style.backgroundColor = "#040";
  } else {
    total.style.backgroundColor = "#ff204e";
  }
}

// Create product

let dataPro;
if (localStorage.product != null) {
  dataPro = JSON.parse(localStorage.product);
} else {
  dataPro = [];
}
Createbtn.onclick = function () {
  GetTotal();
  let data = {
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    count: count.value,
    category: category.value,
  };
  // if (title.value != "" && price.value != "" && dataPro.count <= 100) {
  if (mood === "create") {
    if (data.count > 1) {
      for (let i = 0; i < data.count; i++) {
        dataPro.push(data);
      }
    } else {
      dataPro.push(data);
    }
  } else {
    dataPro[tmp] = data;
    mood = "create";
    Createbtn.innerHTML = "Create";
    count.style.display = "block";
  }
  // } else {
  // }
  localStorage.setItem("product", JSON.stringify(dataPro));
  clearAll();
  showData();
};

// save local
// clearAll

function clearAll() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  count.value = "";
  category.value = "";
}
// Read

function showData() {
  let table = "";

  for (let i = 0; i < dataPro.length; i++) {
    table += `
            <tr>
            <td>${i}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].count}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick=" update( ${i})" id="update">update</button></td>
            <td><button onclick="deletes( ${i})" id="delete">delete</button></td>
            </tr>
            
            `;
  }
  document.getElementById("tobody").innerHTML = table;
  var del = document.querySelector(".deletAll");
  if (dataPro.length > 0) {
    del.innerHTML = `
    <button onclick="DeleteAll()">delete All (${dataPro.length})</button>
    `;
  } else {
    del.innerHTML = "";
  }
}
showData();
// count
// delete
function deletes(i) {
  dataPro.splice(i, 1);
  localStorage.product = JSON.stringify(dataPro);
  showData();
}
function DeleteAll() {
  localStorage.clear();
  dataPro.splice(0);
  showData();
}
// update

function update(i) {
  title.value = dataPro[i].title.toLowerCase();
  price.value = dataPro[i].price;
  taxes.value = dataPro[i].taxes;
  ads.value = dataPro[i].ads;
  discount.value = dataPro[i].discount;
  GetTotal();
  count.style.display = "none";
  category.value = dataPro[i].category;
  Createbtn.innerText = "Update";
  tmp = i;
  mood = "update";
  // Scroll to the top of the page
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

// search
let searchmood = "tit";
function Search(id) {
  let search = document.querySelector("#search");
  if (id == "tit") {
    searchmood = "tit";
    search.placeholder = "search by Title";
  } else {
    searchmood = "cat";
    search.placeholder = "search by Category";
  }
  search.focus();
  search.value = "";
  showData();
}

function SearchAll(value) {
  let table;
  if (searchmood == "tit") {
    for (let i = 0; i < dataPro.length; i++) {
      if (dataPro[i].title.includes(value.toLowerCase())) {
        // console.log(i);
        table += `
        <tr>
        <td>${i}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].count}</td>
        <td>${dataPro[i].category}</td>
        <td><button onclick=" update( ${i})" id="update">update</button></td>
        <td><button onclick="deletes( ${i})" id="delete">delete</button></td>
        </tr>
        `;
      } else {
        if (dataPro[i].category.includes(value.toLowerCase())) {
          // console.log(i);
          table += `
        <tr>
        <td>${i}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].count}</td>
        <td>${dataPro[i].category}</td>
        <td><button onclick=" update( ${i})" id="update">update</button></td>
        <td><button onclick="deletes( ${i})" id="delete">delete</button></td>
        </tr>
        `;
        }
      }
    }
  }
  document.getElementById("tobody").innerHTML = table;
}
// clean Code
