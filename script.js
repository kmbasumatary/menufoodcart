const foodItems = ['Pizza', 'Burger', 'Pasta', 'Fried Rice', 'Ice Cream'];
const prices = [10, 8, 12, 9, 5]; // Corresponding prices for each food item

for (let i = 0; i < foodItems.length; i++) {
    const div = document.createElement('div');
    div.className = 'food-item'; // Corrected class name

    const item = document.createElement('div');
    item.className = 'item';

    const foodName = document.createElement('span');
    foodName.textContent = foodItems[i];
    item.appendChild(foodName);

    const price = document.createElement('span');
    price.textContent = '₹' + prices[i];
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

document.getElementById('container').addEventListener('click', function(event) {
    if (event.target.textContent === '+') {
        const count = parseInt(event.target.previousSibling.textContent);
        event.target.previousSibling.textContent = count + 1;
    } else if (event.target.textContent === '-') {
        const count = parseInt(event.target.nextSibling.textContent);
        event.target.nextSibling.textContent = count > 0 ? count - 1 : 0;
    }
});
