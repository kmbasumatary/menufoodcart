const foodItems = ['Pizza', 'Burger', 'Pasta', 'Fried Rice', 'Ice Cream'];

function addFoodItem(index) {
    const div = document.createElement('div');
    div.className = 'food-item';
    div.style.animationDelay = `${index * 0.2}s`;

    const item = document.createElement('div');
    item.className = 'item';

    const foodName = document.createElement('span');
    foodName.textContent = foodItems[index];
    item.appendChild(foodName);

    const price = document.createElement('span');
    price.textContent = '₹' + prices[index]; // Assuming 'prices' array is defined
    item.appendChild(price);

    div.appendChild(item);

    const counter = document.createElement('div');
    counter.className = 'counter';

    const minusButton = document.createElement('button');
    minusButton.textContent = '-';
    minusButton.setAttribute('aria-label', 'Decrease quantity');

    const countBox = document.createElement('span');
    countBox.textContent = '0';

    const plusButton = document.createElement('button');
    plusButton.textContent = '+';
    plusButton.setAttribute('aria-label', 'Increase quantity');

    counter.appendChild(minusButton);
    counter.appendChild(countBox);
    counter.appendChild(plusButton);

    div.appendChild(counter);

    document.getElementById('container').appendChild(div);
}

// Add food items with a staggered animation
for (let i = 0; i < foodItems.length; i++) {
    addFoodItem(i);
}

document.getElementById('container').addEventListener('click', function(event) {
    if (event.target.textContent === '+') {
        const count = parseInt(event.target.previousSibling.textContent);
        event.target.previousSibling.textContent = count + 1;
    } else if (event.target.textContent === '-') {
        const count = parseInt(event.target.nextSibling.textContent);
        event.target.nextSibling.textContent = count > 0 ? count - 1 : 0;
    }
});
