const fridgeList = JSON.parse(localStorage.getItem('fridgeList')) || [];

document.addEventListener("DOMContentLoaded", () => {
    const fridgeForm = document.getElementById("add-to-fridge");
    const toggleViewButton = document.getElementById("toggle-view");

    // Load saved items from localStorage
    loadFridgeList();

    // Toggle between table view and block view
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

    // Add item to fridge list
    fridgeForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const itemName = document.getElementById("item-name").value;
        const itemQuantity = document.getElementById("item-quantity").value;
        const itemExpiration = document.getElementById("item-expiration").value;
        addToFridgeList(itemName, itemQuantity, itemExpiration);
    });
});

function loadFridgeList() {
    const fridgeTableBody = document.getElementById("fridge-items");
    const blockViewContainer = document.getElementById("block-view");

    fridgeList.forEach(item => {
        addToView(item, fridgeTableBody, blockViewContainer);
    });
}

function addToView(item, tableBody, blockContainer) {
    // Table view
    const row = document.createElement("tr");
    const nameCell = document.createElement("td");
    nameCell.textContent = item.name;
    const quantityCell = document.createElement("td");
    quantityCell.textContent = item.quantity;
    const expirationCell = document.createElement("td");
    expirationCell.textContent = item.expiration;
    row.appendChild(nameCell);
    row.appendChild(quantityCell);
    row.appendChild(expirationCell);

    // Delete button for table view
    const deleteCell = document.createElement("td");
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-button");
    deleteButton.addEventListener("click", () => deleteItem(item.name));
    deleteCell.appendChild(deleteButton);
    row.appendChild(deleteCell);

    tableBody.appendChild(row);

    // Block view
    const blockItem = document.createElement("div");
    blockItem.classList.add("fridge-item-block");

    const img = document.createElement("img");
    img.src = "./images/work-in-progress.png"; // Placeholder image, change to actual product image
    img.alt = item.name;
    img.classList.add("fridge-item-image");

    const itemDetails = document.createElement("div");
    itemDetails.classList.add("fridge-item-details");
    itemDetails.innerHTML = `
        <p><strong>${item.name}</strong></p>
        <p>Quantity: ${item.quantity}</p>
        <p>Expires on: ${item.expiration}</p>
    `;

    // Delete button for block view
    const blockDeleteButton = document.createElement("button");
    blockDeleteButton.textContent = "Delete";
    blockDeleteButton.classList.add("delete-button");
    blockDeleteButton.addEventListener("click", () => deleteItem(item.name));

    blockItem.appendChild(img);
    blockItem.appendChild(itemDetails);
    blockItem.appendChild(blockDeleteButton);
    blockContainer.appendChild(blockItem);
}

function addToFridgeList(name, quantity, expiration) {
    const fridgeTableBody = document.getElementById("fridge-items");
    const blockViewContainer = document.getElementById("block-view");

    // Check if item already exists
    const existingItem = fridgeList.find(item => item.name === name);

    if (existingItem) {
        // Update the quantity of the existing item
        existingItem.quantity = parseInt(existingItem.quantity) + parseInt(quantity);
    } else {
        // Add new item
        const newItem = { name, quantity, expiration };
        fridgeList.push(newItem);
    }

    // Save to localStorage
    localStorage.setItem('fridgeList', JSON.stringify(fridgeList));

    // Clear and reload the views
    fridgeTableBody.innerHTML = '';
    blockViewContainer.innerHTML = '';
    loadFridgeList();
}

function deleteItem(name) {
    const fridgeTableBody = document.getElementById("fridge-items");
    const blockViewContainer = document.getElementById("block-view");

    // Remove item from fridgeList
    const updatedFridgeList = fridgeList.filter(item => item.name !== name);
    localStorage.setItem('fridgeList', JSON.stringify(updatedFridgeList));

    // Update the fridgeList in memory
    fridgeList.length = 0;
    fridgeList.push(...updatedFridgeList);

    // Clear and reload the views
    fridgeTableBody.innerHTML = '';
    blockViewContainer.innerHTML = '';
    loadFridgeList();
}
