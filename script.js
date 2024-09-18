// script.js

const fridgeItems = [
    { name: 'Milk', quantity: 1, expiration: '2024-09-20' },
    { name: 'Eggs', quantity: 12, expiration: '2024-09-25' },
];

const shoppingList = [];

const totalBudget = {
    value: 0,
    remaining: 0
};

document.addEventListener('DOMContentLoaded', () => {
    // Display fridge contents
    displayFridgeContents();

    // Add item to shopping list
    const shoppingForm = document.getElementById('add-to-shopping-list');
    shoppingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const itemName = document.getElementById('item-name').value;
        const itemQuantity = document.getElementById('item-quantity').value;
        addToShoppingList(itemName, itemQuantity);
    });

    // Set budget
    const setBudgetButton = document.getElementById('set-budget');
    setBudgetButton.addEventListener('click', () => {
        const budgetInput = document.getElementById('budget-input').value;
        setBudget(budgetInput);
    });
});

function displayFridgeContents() {
    const fridgeContainer = document.getElementById('fridge-items');
    fridgeContainer.innerHTML = '';  // Clear the container
    fridgeItems.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.textContent = `${item.name} - ${item.quantity} (Expires: ${item.expiration})`;
        fridgeContainer.appendChild(itemElement);
    });
}

function addToShoppingList(name, quantity) {
    const shoppingContainer = document.getElementById('shopping-items');
    const newItem = { name, quantity };
    shoppingList.push(newItem);

    const itemElement = document.createElement('li');
    itemElement.textContent = `${name} - ${quantity}`;
    shoppingContainer.appendChild(itemElement);
}

function setBudget(budget) {
    totalBudget.value = budget;
    totalBudget.remaining = budget;
    document.getElementById('total-budget').textContent = totalBudget.value;
    document.getElementById('remaining-budget').textContent = totalBudget.remaining;
}
