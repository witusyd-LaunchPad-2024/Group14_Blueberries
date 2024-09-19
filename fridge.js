const fridgeList = JSON.parse(localStorage.getItem('fridgeList')) || [];
let totalBudget = localStorage.getItem('totalBudget') ? parseFloat(localStorage.getItem('totalBudget')) : 0;
let remainingBudget = totalBudget;

document.addEventListener("DOMContentLoaded", () => {
    const fridgeForm = document.getElementById("add-to-fridge");
    const toggleViewButton = document.getElementById("toggle-view");

    const budgetModal = document.getElementById("budget-modal");
    const budgetButton = document.getElementById("adjust-budget-btn");
    const closeModal = document.querySelector(".close");
    const saveBudgetButton = document.getElementById("save-budget");
    const budgetInput = document.getElementById("budget-input");

    loadFridgeList();
    updateBudgetDisplay();

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

    budgetButton.addEventListener("click", () => {
        budgetModal.style.display = "block";
    });

    closeModal.addEventListener("click", () => {
        budgetModal.style.display = "none";
    });
    window.addEventListener("click", (e) => {
        if (e.target === budgetModal) {
            budgetModal.style.display = "none";
        }
    });

    saveBudgetButton.addEventListener("click", () => {
        const budgetValue = parseFloat(budgetInput.value);
        if (!isNaN(budgetValue)) {
            totalBudget = budgetValue;
            localStorage.setItem('totalBudget', totalBudget);
            updateBudgetDisplay();
            budgetModal.style.display = "none";
        } else {
            alert("Please enter a valid budget amount.");
        }
    });

    fridgeForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const itemName = document.getElementById("item-name").value;
        const itemQuantity = parseInt(document.getElementById("item-quantity").value);
        const itemExpiration = document.getElementById("item-expiration").value;
        const itemPrice = parseFloat(document.getElementById("item-price").value);

        addToFridgeList(itemName, itemQuantity, itemExpiration, itemPrice);
        updateBudgetDisplay();
    });
});

function loadFridgeList() {
    const fridgeTableBody = document.getElementById("fridge-items");
    const blockViewContainer = document.getElementById("block-view");

    fridgeTableBody.innerHTML = '';
    blockViewContainer.innerHTML = '';

    fridgeList.forEach(item => {
        addToView(item, fridgeTableBody, blockViewContainer);
    });
}

function addToView(item, tableBody, blockContainer) {
    const row = document.createElement("tr");
    const nameCell = document.createElement("td");
    nameCell.textContent = item.name;
    const quantityCell = document.createElement("td");
    quantityCell.textContent = item.quantity;
    const expirationCell = document.createElement("td");
    expirationCell.textContent = item.expiration;
    const priceCell = document.createElement("td");
    priceCell.textContent = item.price;
    row.appendChild(nameCell);
    row.appendChild(quantityCell);
    row.appendChild(expirationCell);
    row.appendChild(priceCell);

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
        <p>Expires on: ${item.expiration}</p>
        <p>Price: ${item.price} $</p>
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

function addToFridgeList(name, quantity, expiration, price) {
    const fridgeTableBody = document.getElementById("fridge-items");
    const blockViewContainer = document.getElementById("block-view");

    const existingItem = fridgeList.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity = parseInt(existingItem.quantity) + quantity;
    } else {
        const newItem = { name, quantity, expiration, price };
        fridgeList.push(newItem);
    }

    localStorage.setItem('fridgeList', JSON.stringify(fridgeList));

    fridgeTableBody.innerHTML = '';
    blockViewContainer.innerHTML = '';
    loadFridgeList();
}

function deleteItem(name) {
    const fridgeTableBody = document.getElementById("fridge-items");
    const blockViewContainer = document.getElementById("block-view");

    const updatedFridgeList = fridgeList.filter(item => item.name !== name);
    localStorage.setItem('fridgeList', JSON.stringify(updatedFridgeList));

    fridgeList.length = 0;
    fridgeList.push(...updatedFridgeList);

    fridgeTableBody.innerHTML = '';
    blockViewContainer.innerHTML = '';
    loadFridgeList();
}

function calculateTotalItemCost() {
    return fridgeList.reduce((total, item) => total + (parseFloat(item.price) * parseInt(item.quantity)), 0);
}

function updateBudgetDisplay() {
    const totalItemCost = calculateTotalItemCost();
    remainingBudget = totalBudget - totalItemCost;
    document.getElementById('total-budget-display').textContent = `$${totalBudget.toFixed(2)}`;
    document.getElementById('remaining-budget-display').textContent = `$${remainingBudget.toFixed(2)}`;
}
