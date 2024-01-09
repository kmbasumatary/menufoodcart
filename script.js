// Function to fetch and parse data from the API
async function fetchDataFromAPI(apiUrl) {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
}

// Function to add food items with staggered animation
async function addFoodItems() {
    const apiUrl = 'https://script.googleusercontent.com/macros/echo?user_content_key=q7FEfSIYsVQyKI5kJTtOqP1zh-Svvb2xxRt_HJTrtg6DZIe1tU4LEYgAJV8ENpVbh_0qsRIEFn-LSLte2WTcx9usrS2ayU-wm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnP05PFVPxzpL9-Zrxl-VgkrUovzDEDnD52Jq5uZL_QZrFiDVq2xCH1l65KXeDJ9788NsEeOpEkdT3CVlSHwLgdmfJMRCcv9cYw&lib=M5Vm1xh9r8dr321LV8j87Hh6RA8Byw0OJ'; // Replace with your API endpoint
    const apiData = await fetchDataFromAPI(apiUrl);

    if (!apiData || !apiData.data || apiData.data.length === 0) {
        console.error('Error fetching data from the API');
        return;
    }

    apiData.data.forEach((row, index) => {
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
