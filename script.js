// Update the URL to point to your actual CSV file
const csvFileUrl = 'food_data.csv';

// Function to fetch and parse the CSV file
async function fetchAndParseCSV(url) {
    const response = await fetch(url);
    const text = await response.text();
    return Papa.parse(text, { header: true });
}

// Function to add food items with staggered animation
async function addFoodItems() {
    const csvData = await fetchAndParseCSV(csvFileUrl);

    csvData.data.forEach((row, index) => {
        const div = document.createElement('div');
        div.className = 'food-item';
        div.style.animationDelay = `${index * 0.1}s`;

        const item = document.createElement('div');
        item.className = 'item';

        const foodName = document.createElement('span');
        foodName.textContent = row['FoodItem']; // Assuming the column name is 'FoodItem'
        item.appendChild(foodName);

        const price = document.createElement('span');
        price.textContent = '₹' + row['Price']; // Assuming the column name is 'Price'
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
    });
}

// Call the function to add food items
addFoodItems();

document.getElementById('container').addEventListener('click', function(event) {
    if (event.target.textContent === '+') {
        const count = parseInt(event.target.previousSibling.textContent);
        event.target.previousSibling.textContent = count + 1;
    } else if (event.target.textContent === '-') {
        const count = parseInt(event.target.nextSibling.textContent);
        event.target.nextSibling.textContent = count > 0 ? count - 1 : 0;
    }
});
