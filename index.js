// Function to create an equipment card
function createEquipmentCard(equipment) {
    const card = document.createElement('div');
    card.classList.add('card');

    card.innerHTML = `
        <h2>${equipment.name}</h2>
        <p>Type: ${equipment.type}</p>
        <p>Worth: ${equipment.Worth}</p>
        <p>Description: ${equipment.description}</p>
        <img src="${equipment.image_url}" alt="${equipment.name}" class="equipment-image">
        <button class="buy-btn">Buy</button>
        <button class="delete-btn">Delete Equipment</button>
    `;

    // Add event listener for buy button
    const buyButton = card.querySelector('.buy-btn');
    buyButton.addEventListener('click', () => buy(equipment));

    // Add event listener for delete button
    card.querySelector('.delete-btn').addEventListener('click', () => deleteEquipment(equipment));

    return card;
}

// Define buy function
function buy(equipment) {
    // Show confirmation prompt
    const confirmBuy = confirm(`Are you sure you want to buy ${equipment.name}?`);

    if (confirmBuy) {
        // If user confirms, execute buy action
        
        // Show success message
        alert(`${equipment.name} bought! Give yourself the best shot!`);
        
        // Change button text to "Item bought"
        const buyButton = document.querySelector(`[alt="${equipment.name}"] + .buy-btn`);
        if (buyButton) {
            buyButton.innerText = "Item bought";
            buyButton.disabled = true; // Optionally disable the button to prevent further clicks
        }
    } else {
        // If user cancels, do nothing or show a message
        console.log('Buy action cancelled.');
    }
}

// Call fetchEquipmentData function when the page loads
fetchEquipmentData();

// Function to fetch equipment data from db.json
function fetchEquipmentData() {
    fetch('db.json')
        .then(response => response.json())
        .then(data => {
            const equipmentList = document.getElementById('equipment-list');

            // Loop through each equipment object and create a card for it
            data.equipment.forEach(equipment => {
                const card = createEquipmentCard(equipment);
                equipmentList.appendChild(card);
            });
        })
        .catch(error => console.error('Error fetching equipment data:', error));
}
