// Function to fetch and parse the Excel file
async function fetchAndParseExcel(url) {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const data = new Uint8Array(arrayBuffer);
    const workbook = XLSX.read(data, { type: 'array' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    return XLSX.utils.sheet_to_json(sheet, { header: 1, raw: false });
}

// Function to add food items with staggered animation
async function addFoodItems() {
    const excelData = await fetchAndParseExcel('food_data.xlsx'); // Use the correct path to your Excel file
    excelData.slice(1).forEach((row, index) => {
        if (row[0] && row[1]) {
            const div = document.createElement('div');
            div.className = 'food-item';
            div.style.animationDelay = `${index * 0.1}s`;
            const item = document.createElement('div');
            item.className = 'item';
            const foodName = document.createElement('span');
            foodName.textContent = row[0];
            item.appendChild(foodName);
            const price = document.createElement('span');
            price.textContent = '₹' + row[1];
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

document.getElementById('container').addEventListener('click', function (event) {
    if (event.target.textContent === '–') {
        const count = parseInt(event.target.nextSibling.textContent);
        event.target.nextSibling.textContent = count > 0 ? count - 1 : 0;
    } else if (event.target.textContent === '+') {
        const count = parseInt(event.target.previousSibling.textContent);
        event.target.previousSibling.textContent = count + 1;
    }
});
