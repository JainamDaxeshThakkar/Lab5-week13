/* Variables
-------------------------------------------------- */
// STEP 1a: Grab the first <dd> element for displaying the battery charging status
const chargeStatus = document.querySelector('#battery dd:nth-of-type(1)');
// STEP 1b: Grab the <output> element inside the second <dd> element for displaying the battery charge level
const chargeLevel = document.querySelector('#battery dd:nth-of-type(2) output');
// STEP 1c: Grab the <progress> element inside the second <dd> element for a more graphical representation of the battery's state of charge (SOC)
const chargeMeter = document.querySelector('#battery dd:nth-of-type(2) progress');
// New Step: Create or select an existing image element for displaying the RoboHash image based on battery level
let batteryImage = document.querySelector('#batteryImage');
if (!batteryImage) {
    batteryImage = document.createElement('img');
    batteryImage.id = 'batteryImage';
    document.body.appendChild(batteryImage); // Append the new image element to the body if it doesn't already exist
}

/* Functions
-------------------------------------------------- */
// STEP 3a: Create the updateBatteryStatus() function
function updateBatteryStatus(battery) {
    console.log(battery);
    // STEP 3b: Update the charging status
    if (battery.charging === true) {
        chargeStatus.textContent = "Charging...";
    } else {
        chargeStatus.textContent = "Discharging...";
    }
    // STEP 3c: Update the charge level
    const level = Math.round(battery.level * 100);
    chargeLevel.textContent = level + "%";
    chargeMeter.value = level;
    
    
    batteryImage.src = `https://robohash.org/${level}.png`;
    batteryImage.alt = `Image representing battery level at ${level}%`; 
}

// STEP 2a: Using the getBattery() method of the navigator object, 
// create a promise to retrieve the battery information
navigator.getBattery().then(battery => {
    // STEP 2b: See what the battery object contains
    console.log(battery);
    // STEP 3d: Update the battery information when the promise resolves
    updateBatteryStatus(battery);
    // STEP 4a: Event listener for changes to the charging status
    battery.addEventListener("chargingchange", () => {
        updateBatteryStatus(battery);
    });
    // STEP 4b: Event listener for changes to the charge level
    battery.addEventListener("levelchange", () => {
        updateBatteryStatus(battery);
    });
});

/* This script adapted from the excellent code examples found at https://www.w3.org/TR/battery-status/#examples and https://developer.mozilla.org/en-US/docs/Web/API/Battery_Status_API */
