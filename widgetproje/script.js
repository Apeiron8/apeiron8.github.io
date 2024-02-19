const url = "https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=7d0b7154f66501be1f3399c3b6b667c4";
const key = "7d0b7154f66501be1f3399c3b6b667c4";



const setQuery = (e) => {
    if(e.keyCode === 13)
        getResult(searchBar.value);
}

const getResult = (cityName) => {
    let query = `${url}&q=${cityName}&units=metric&lang=tr&appid=${key}`;
    fetch(query)
        .then(weather => {
            return weather.json();
        })
        .then(displayResult);
}

const setBackgroundImage = (temperature, weatherDescription) => {
    const bodyElement = document.body;

    if (weatherDescription.toLowerCase().includes('rain')) {
        bodyElement.style.backgroundImage = 'url("rainy.jpg")';
    } else if (weatherDescription.toLowerCase().includes('snow')) {
        bodyElement.style.backgroundImage = 'url("snowy.jpg")';
    } else if (temperature > 20) {
        bodyElement.style.backgroundImage = 'url("hot.jpg")';
    } else if (temperature >= 15 && temperature <= 20) {
        bodyElement.style.backgroundImage = 'url("natural.jpg")';
    } else if (temperature >= 0 && temperature < 15) {
        bodyElement.style.backgroundImage = 'url("rainy.jpg")';
    } else if (temperature  < 0) {
        bodyElement.style.backgroundImage = 'url("cold.jpg")';
    } else {
        bodyElement.style.backgroundImage = 'url("rain.jpg")';
    }
};



const displayResult = (result) => {
    const cityElement = document.querySelector('.city');
    const tempElement = document.querySelector('.temp');
    const descElement = document.querySelector('.desc');
    const minmaxElement = document.querySelector('.minmax');
    const adviceElement = document.querySelector('.advice');

    const temperature = Math.round(result.main.temp); // Küsürat kısmını kaldırmak için Math.round() kullanın
    const minTemperature = Math.round(result.main.temp_min);
    const maxTemperature = Math.round(result.main.temp_max);
    const isDay = result.weather[0].icon.includes('d'); // Gün durumu kontrolü

    setBackgroundImage(result.main.temp, result.weather[0].description);

    cityElement.textContent = `${result.name}, ${result.sys.country}`;
    tempElement.textContent = `${temperature}°C`;
    descElement.textContent = result.weather[0].description;
    minmaxElement.textContent = `${minTemperature}°C / ${maxTemperature}°C`;

    // Kıyafet tavsiyesi eklemesi
    let advice = '';

    if (isDay) {
        // Gün durumu
        if (temperature < 10) {
            advice = 'Soğuk bir gün! Kalın giyinmeyi unutma.';
        } else if (temperature >= 10 && temperature < 20) {
            advice = 'Ilıman bir hava! Hafif giyinmeyi düşünebilirsin.';
        } else {
            advice = 'Sıcak bir gün! Serin kalman için hafif giyin.';
        }

        if (result.weather[0].main.toLowerCase().includes('rain')) {
            advice += ' Ayrıca şemsiye ve su geçirmez mont da alabilirsin.';
        }
    } else {
        // Gece durumu
        if (temperature < 0) {
            advice = 'Soğuk bir gece! Kalın giyinmeyi unutma.';
        } else {
            advice = 'Serin bir gece! Üzerine bir şeyler almayı düşünebilirsin.';
        }
    }

    adviceElement.textContent = advice;
}

const searchBar = document.getElementById("searchBar");
searchBar.addEventListener("keypress", setQuery);


// Kıyafet tavsiyesini göster
function displayOutfitAdvice(weatherDescription) {
    const gender = genderSelect.value;
    
    if (outfitSuggestions[gender] && outfitSuggestions[gender][weatherDescription]) {
        outfitAdvice.textContent = outfitSuggestions[gender][weatherDescription];
    } else {
        outfitAdvice.textContent = 'Bugün için uygun bir kıyafet tavsiyesi bulunamadı.';
    }
}


function addTask() {
    const todoList = document.getElementById('todoList');
    const newTask = document.createElement('li');
    newTask.innerHTML = `
        <input type="text" placeholder="New Task" />
        <button onclick="removeTask(this)">Remove</button>
    `;
    todoList.appendChild(newTask);
}

function removeTask(button) {
    const task = button.parentElement;
    task.remove();
}




// Takvimin Dinamikleri 


// Takvimin altındaki mesaj kutusu işlevselliği
// Add these functions for the calendar functionality


