// Define variables
const form = document.querySelector("#shopping-form");
const shoppingList = document.querySelector(".collection");
const itemInput = document.querySelector("#item");

// Load event listeners
loadEventListeners();

function loadEventListeners() {
  form.addEventListener("submit", addItem);
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
