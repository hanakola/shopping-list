// Define variables
const form = document.querySelector("#shopping-form");
const shoppingList = document.querySelector(".collection");
const clearButton = document.querySelector(".clear-items");
const filter = document.querySelector("#filter");
const itemInput = document.querySelector("#item");

// Load event listeners
loadEventListeners();

function loadEventListeners() {
  form.addEventListener("submit", addItem);
  shoppingList.addEventListener("click", removeItem);
  clearButton.addEventListener("click", clearItems);
  filter.addEventListener("keyup", filterItems);
}

// Get items from local storage
function getListItems() {
  let items;
  if (localStorage.getItem("items") === null) {
    items = [];
  } else {
    items = JSON.parse(localStorage.getItem("items"));
  }

  items.forEach(function (item) {
    const li = document.createElement("li");
    li.className = "collection-item";
    li.appendChild(document.createTextNode(item));

    const link = document.createElement("a");
    link.className = "delete-item secondary-content";
    link.innerHTML = '<i class="fa fa-remove"></i>';

    li.appendChild(link);

    shoppingList.appendChild(li);
  });
}

// Add item
function addItem(event) {
  if (itemInput.value === "") {
    alert("Add an item");
  }

  const li = document.createElement("li");
  li.className = "collection-item";
  li.appendChild(document.createTextNode(itemInput.value));

  const link = document.createElement("a");
  link.className = "delete-item secondary-content";
  link.innerHTML = '<i class="fa fa-remove"></i>';

  li.appendChild(link);

  shoppingList.appendChild(li);

  // Store in local storage
  storeItemInLocalStorage(itemInput.value);

  itemInput.value = "";

  event.preventDefault();
}

// Store item
function storeItemInLocalStorage(item) {
  let items;
  if (localStorage.getItem("items") === null) {
    items = [];
  } else {
    items = JSON.parse(localStorage.getItem("items"));
  }

  items.push(item);

  localStorage.setItem("items", JSON.stringify(items));
}

// Remove item
function removeItem(event) {
  if (event.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are you sure?")) {
      event.target.parentElement.parentElement.remove();

      // Remove from local storage
      removeItemFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

// Remove from local storage
function removeItemFromLocalStorage(shopItem) {
  let items;
  if (localStorage.getItem("items") === null) {
    items = [];
  } else {
    items = JSON.parse(localStorage.getItem("items"));
  }

  items.forEach(function (item, index) {
    if (shopItem.textContent === item) {
      items.splice(index, 1);
    }
  });

  localStorage.setItem("items", JSON.stringify(items));
}

// Clear items
function clearItems() {
  while (shoppingList.firstChild) {
    shoppingList.removeChild(shoppingList.firstChild);
  }

  // Clear from local storage
  clearItemsFromLocalStorage();
}

// Clear items from local storage
function clearItemsFromLocalStorage() {
  localStorage.clear();
}

// Filter items
function filterItems(event) {
  const text = event.target.value.toLowerCase();

  document
    .querySelectorAll(".collection-item")
    .forEach(function (shoppingItem) {
      const item = shoppingItem.firstChild.textContent;
      if (item.toLowerCase().indexOf(text) != -1) {
        shoppingItem.style.display = "block";
      } else {
        shoppingItem.style.display = "none";
      }
    });
}
