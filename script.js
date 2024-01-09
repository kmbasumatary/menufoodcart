 
// Function to add food items with staggered animation
async function addFoodItems() {
    const apiUrl = 'https://script.google.com/macros/s/AKfycbzJmNYjY85dHx__pow9OlgskUcoGIQa2-zvWUMjpe1AUvXOrMqrbsYuLswzZhipHhuG/exec'; // Replace with your API endpoint
    const apiData = await fetchDataFromAPI(apiUrl);
    if (!apiData || !apiData.data || apiData.data.length === 0) {
        console.error('Error fetching data from the API');
        return;
    }
    // Skip the first item (header) in the API response
    const foodItems = apiData.data.slice(1);

    foodItems.forEach((row, index) => {
        if (row['FoodItem'] && row['Price']) {
            const div = document.createElement('div');
            div.className = 'food-item';
            div.style.animationDelay = `${index * 0.1}s`;
            const item = document.createElement('div');
            item.className = 'item';
            const foodName = document.createElement('span');
            foodName.textContent = row['FoodItem'];
            item.appendChild(foodName);
            const price = document.createElement('span');
            price.textContent = '₹' + row['Price'];
            item.appendChild(price);
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
