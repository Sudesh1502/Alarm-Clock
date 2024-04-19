
// SCRIPT FOR UPDATING THE TIME 
let hrs = document.querySelector('#hrs');
let min = document.querySelector('#min');
let sec = document.querySelector('#sec');
let meridiem = document.querySelector('#am-pm');





// ===================================================================================
// Setting current time using setInterval
setInterval(() => {
    let currentTime = new Date();

    hrs.textContent = (currentTime.getHours() < 10 ? "0" : "") + (currentTime.getHours() > 12 ? currentTime.getHours() - 12 : currentTime.getHours()) ;
    min.textContent = (currentTime.getMinutes() < 10 ? "0" : "") + currentTime.getMinutes();
    sec.textContent = (currentTime.getSeconds() < 10 ? "0" : "") + currentTime.getSeconds();

    meridiem.textContent = (currentTime.getHours() > 12 ? 'PM': 'AM');
}, 1000);





// ===================================================================================
// Function to start the alarm
function startAlarm(hrs, mins) {
    let alarmTriggered = false; // Flag to track whether alarm has been triggered

    const id = setInterval(() => {
        let currentTime = new Date();
        
        if (!alarmTriggered && currentTime.getHours() === parseInt(hrs) && currentTime.getMinutes() === parseInt(mins)) {
            alarmTriggered = true; // Set the flag to true when alarm is triggered
            
            alert("Alarm is ringing...");
            clearInterval(id); // Stop the interval
            deleteAlarm(hrs, mins); // Delete the specific alarm from DOM
        }

    }, 1000);

    return id;
}




// ===================================================================================

// closing the alarm to stop alert
function close(id){

    clearInterval(id);
}



// ===================================================================================
// Setting up the select options for hours and minutes
let setHrs = document.querySelector('#set-hrs');
for (let i = 0; i <= 12; i++) {
    const opt = document.createElement('option');
    opt.textContent = (i < 10 ? "0" : "") + i;
    setHrs.appendChild(opt);
}

let setMins = document.querySelector('#set-mins');
for (let i = 0; i < 60; i++) {
    const opt = document.createElement('option');
    opt.textContent = (i < 10 ? "0" : "") + i;
    setMins.appendChild(opt);
}
let setAmPm = document.querySelector('#set-ampm');

// Adding event listener to the set button
const setBtn = document.querySelector('#set-btn');
setBtn.addEventListener('click', function() {
    addAlarm();
    setHrs.selectedIndex = 0; 
    setMins.selectedIndex = 0;
});



// ===================================================================================
// Function to add alarm
function addAlarm() {
   
    let hr = setHrs.value; 
    let min = setMins.value;
    let ampm = setAmPm.value;
    if(hr === 'Hours' || min === 'Minutes'){
        alert('Set a valid alarm...');
        return;
    }
    hr = parseInt(hr); 
    min = parseInt(min);
    if(ampm === 'PM'){
        hr = hr + 12; 
    }
    
    const id = startAlarm(hr, min); // Store the interval ID when starting the alarm
    if(ampm === 'PM'){
        hr = Math.abs(hr - 12); 
    }
    const alarm = document.createElement('div');
    alarm.className = 'alarms';
    const time = document.createElement('span');
    time.className = 'time';
    time.textContent = `${hr > 10 ? hr : '0' + hr} : ${min > 10 ? min : '0' + min } : 00 ${ampm}`;
    const del = document.createElement('button');
    del.className = 'del';
    del.textContent = 'Delete';
    del.addEventListener('click', function(e) {
        clearInterval(id); // Clear the interval associated with this alarm
        let item = this.parentNode;
        item.parentNode.removeChild(item);
    });

    const fixedAlarm = document.querySelector('.fixed-alarms');
    fixedAlarm.appendChild(alarm);
    alarm.appendChild(time);
    alarm.appendChild(del);
    
    alert(`Alarm is set for ${hr} : ${min} : 00 ${ampm}`)
    return id; // Return the interval ID
}
// ===================================================================================

