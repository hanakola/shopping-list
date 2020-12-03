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

// Add item
function addItem(event) {
  if (itemInput.value === "") {
    alert("Add a task");
  }

  const li = document.createElement("li");
  li.className = "collection-item";
  li.appendChild(document.createTextNode(itemInput.value));

  const link = document.createElement("a");
  link.className = "delete-item secondary-content";
  link.innerHTML = '<i class="fa fa-remove"></i>';

  li.appendChild(link);

  shoppingList.appendChild(li);

  itemInput.value = "";

  event.preventDefault();
}

// Remove item
function removeItem(event) {
  if (event.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are you sure?")) {
      event.target.parentElement.parentElement.remove();
    }
  }
}

// Clear items
function clearItems() {
  while (shoppingList.firstChild) {
    shoppingList.removeChild(shoppingList.firstChild);
  }
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
