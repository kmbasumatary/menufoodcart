// Function to fetch and parse the CSV file
async function fetchAndParseCSV(url) {
    const response = await fetch(url);
    const text = await response.text();
    return Papa.parse(text, { header: true, skipEmptyLines: true });
}

// Function to add food items with staggered animation
async function addFoodItems() {
    const csvData = await fetchAndParseCSV('food_data.csv'); // Use the correct path to your CSV file
    if (csvData.errors.length > 0) {
        console.error('Error parsing CSV:', csvData.errors);
        return;
    }
    csvData.data.forEach((row, index) => {
        if (row['FoodItem'] && row['Price'] && row['DiscountedPrice'] && row['ItemsLeft']) {
            const div = document.createElement('div');
            div.className = 'food-item';
            div.style.animationDelay = `${index * 0.1}s`;

            const item = document.createElement('div');
            item.className = 'item';

            const foodName = document.createElement('span');
            foodName.textContent = row['FoodItem'];
            item.appendChild(foodName);

            const itemsLeft = document.createElement('div');
            itemsLeft.textContent = 'Items left: ' + row['ItemsLeft'];
            item.appendChild(itemsLeft);

            const priceDiv = document.createElement('div');
            priceDiv.style.display = 'flex'; // Add this line to make the prices display side by side

            const price = document.createElement('span');
            price.textContent = '₹' + row['Price'];
            price.style.textDecoration = 'line-through'; // Strike out the old price
            priceDiv.appendChild(price);

            const discountedPrice = document.createElement('span');
            discountedPrice.textContent = '₹' + row['DiscountedPrice']; // Display the discounted price from the CSV file
            discountedPrice.style.color = 'red'; // Highlight the discounted price
            discountedPrice.style.marginLeft = '10px'; // Add some space between the discounted price 
            priceDiv.appendChild(discountedPrice);

            item.appendChild(priceDiv);
            div.appendChild(item);

            const counter = document.createElement('div');
            counter.className = 'counter';

            const minusButton = document.createElement('button');
            minusButton.textContent = '–';
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
    });
}

// Call the function to add food items
addFoodItems();

document.getElementById('container').addEventListener('click', function(event) {
    if (event.target.textContent === '–') {
        const count = parseInt(event.target.nextSibling.textContent);
        event.target.nextSibling.textContent = count > 0 ? count - 1 : 0;
    } else if (event.target.textContent === '+') {
        const count = parseInt(event.target.previousSibling.textContent);
        event.target.previousSibling.textContent = count + 1;
    }
});
