const shoppingList = JSON.parse(localStorage.getItem('shoppingList')) || [];

document.addEventListener("DOMContentLoaded", () => {
    const fridgeForm = document.getElementById("add-to-fridge");
    const toggleViewButton = document.getElementById("toggle-view");

    loadFridgeList();

    toggleViewButton.addEventListener("click", () => {
        const tableView = document.getElementById("fridge-items-table");
        const blockView = document.getElementById("block-view");

        if (tableView.style.display === "none") {
            tableView.style.display = "table";
            blockView.style.display = "none";
            toggleViewButton.textContent = "Switch to Block View";
        } else {
            tableView.style.display = "none";
            blockView.style.display = "flex";
            toggleViewButton.textContent = "Switch to Table View";
        }
    });

    fridgeForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const itemName = document.getElementById("item-name").value;
        const itemQuantity = document.getElementById("item-quantity").value;
        addToFridgeList(itemName, itemQuantity);
    });
});

function loadFridgeList() {
    const fridgeTableBody = document.getElementById("fridge-items");
    const blockViewContainer = document.getElementById("block-view");

    shoppingList.forEach(item => {
        addToView(item, fridgeTableBody, blockViewContainer);
    });
}

function addToView(item, tableBody, blockContainer) {
    const row = document.createElement("tr");
    const nameCell = document.createElement("td");
    nameCell.textContent = item.name;
    const quantityCell = document.createElement("td");
    quantityCell.textContent = item.quantity;
    row.appendChild(nameCell);
    row.appendChild(quantityCell);

    const deleteCell = document.createElement("td");
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-button");
    deleteButton.addEventListener("click", () => deleteItem(item.name));
    deleteCell.appendChild(deleteButton);
    row.appendChild(deleteCell);

    tableBody.appendChild(row);

    const blockItem = document.createElement("div");
    blockItem.classList.add("fridge-item-block");

    const img = document.createElement("img");
    img.src = "./images/work-in-progress.png";
    img.alt = item.name;
    img.classList.add("fridge-item-image");

    const itemDetails = document.createElement("div");
    itemDetails.classList.add("fridge-item-details");
    itemDetails.innerHTML = `
        <p><strong>${item.name}</strong></p>
        <p>Quantity: ${item.quantity}</p>
    `;

    const blockDeleteButton = document.createElement("button");
    blockDeleteButton.textContent = "Delete";
    blockDeleteButton.classList.add("delete-button");
    blockDeleteButton.addEventListener("click", () => deleteItem(item.name));

    blockItem.appendChild(img);
    blockItem.appendChild(itemDetails);
    blockItem.appendChild(blockDeleteButton);
    blockContainer.appendChild(blockItem);
}

function addToFridgeList(name, quantity) {
    const fridgeTableBody = document.getElementById("fridge-items");
    const blockViewContainer = document.getElementById("block-view");

    const existingItem = shoppingList.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity = parseInt(existingItem.quantity) + parseInt(quantity);
    } else {
        const newItem = { name, quantity };
        shoppingList.push(newItem);
    }

    localStorage.setItem('shoppingList', JSON.stringify(shoppingList));

    fridgeTableBody.innerHTML = '';
    blockViewContainer.innerHTML = '';
    loadFridgeList();
}

function deleteItem(name) {
    const fridgeTableBody = document.getElementById("fridge-items");
    const blockViewContainer = document.getElementById("block-view");

    const updatedFridgeList = shoppingList.filter(item => item.name !== name);
    localStorage.setItem('shoppingList', JSON.stringify(updatedFridgeList));

    shoppingList.length = 0;
    shoppingList.push(...updatedFridgeList);

    fridgeTableBody.innerHTML = '';
    blockViewContainer.innerHTML = '';
    loadFridgeList();
}
