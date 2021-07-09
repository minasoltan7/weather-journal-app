
/* Global Variables */
const apiKey = "0beafec112f102586c440eff7b680a94";
let zipCode = "";
let basicURL = "";
let feelingsTextarea = document.getElementById("feelings");
const error = document.getElementById("error");
// updating the basicURL by adding an input event listener to the "zip" ID
const zipcodeInput = document.getElementById("zip");
const updateZipcode = (event) => {
    zipCode = event.target.value;
    basicURL = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apiKey}&units=metric`
}

zipcodeInput.addEventListener("input", updateZipcode)

// updating the feelinng textarea by adding "input" event listener to the "feeling"ID
const updateFeelings = (event) => {
    feelingsTextarea.innerHTML = event.target.value
}
feelingsTextarea.addEventListener("input", updateFeelings);


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();



// Async function to make GET request to the OpenWeatherMap API
const getWeather = async (url) => {
    const response = await fetch(url);
    try {
        const data = await response.json();
        if (data.cod != 200) {
            // if any error occured show it in the UI
            error.innerHTML = data.message;
            // hide the error after 2 seconds
            setTimeout(() => {
                error.innerHTML = "";
            }, 2000)
            // to show the error message in the console
            throw ` <div id="date"></div>
            <div id="temp"></div>
            <div id="content"></div>
            <div id="country"></div>
            <div id="city"></div>
            <div id="weather"></div>${data.message}`
        } else {

            return data
        }
    } catch (error) {
        console.log("error", error);
    }
}

// Async function to make POST request send the data received from the OpenWeatherApi,the date and the userResponse received 

const postFeeling = async (url = "", data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        // Body data type must match "Content-Type" header        
        body: JSON.stringify(data),
    })
    try {
        const newData = await response.json()
    } catch (error) {
        console.log("error")
    }
}


// updating the UI by sending a get Request to the server and recieve the latest projectData
// Then  changing the DOM elements

const updateUI = async (url) => {
    const res = await fetch(url);
    try {
        const data = await res.json()
        document.getElementById("date").innerHTML = `Today: ${data.date}`;
        document.getElementById("temp").innerHTML = `Temperature: ${Math.ceil(data.temperature)}&degC `;
        document.getElementById("content").innerHTML = `Your Feeling: ${data.userResponse}`;
        document.getElementById("country").innerHTML = `Country Code: ${data.country}`;
        document.getElementById("city").innerHTML = `City: ${data.name}`;
        document.getElementById("weather").innerHTML = `Weather Description: ${data.description} `;
    } catch (error) {
        console.log(error, "error")
    }
}

// creating an event listener to the "Generate" button to exectute the Get request to the openWeatherMap 
// when clicked.

const generateButton = document.getElementById("generate");
generateButton.addEventListener("click", () => {
    getWeather(basicURL)
        .then((data) => {
            // destructuring the main info we want from the data Object 
            if (data) {
                const {
                    main: { temp },
                    weather: [{ description }],
                    sys: { country },
                    name,
                } = data

                const dataToSend = {
                    temperature: temp,
                    date: newDate,
                    userResponse: feelingsTextarea.innerHTML,
                    name: name,
                    description: description,
                    country: country,
                }

                postFeeling("http://127.0.0.1:3000/weathertoday", dataToSend)
                updateUI("http://127.0.0.1:3000/weathertoday");
            }
        })

})