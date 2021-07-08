
/* Global Variables */
const apiKey = "0beafec112f102586c440eff7b680a94";
let zipCode = "";
let basicURL = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},&appid=${apiKey}&units=metric`;
const feelingsTextarea = document.getElementById("feelings");
let feelings = ""
const error = document.getElementById("error");
// updating the basicURL by adding an input event listener to the "zip" ID
const zipcodeInput = document.getElementById("zip");
const updateZipcode = (event) => {
    zipCode = `${event.target.value}`;
    basicURL = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apiKey}&units=metric`
}
zipcodeInput.addEventListener("input", updateZipcode)

// updating the feelinng textarea by adding "input" event listener to the "feeling"ID
const updateFeelings = (event) => {
    let feelings = event.target.value
    console.log(feelings);
}
feelingsTextarea.addEventListener("input", updateFeelings);


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();



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
            throw `${data.message}`
        } else {

            console.log(data);
            return data
        }
    } catch (error) {
        console.log("error", error);
    }
}

// Async function to mae POST request to send the temperature received from the OpenWeatherApi,the date and the userResponse received 

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
        console.log(newData);
    } catch (error) {
        console.log("error")
    }
}


// updating the UI by dending a get Request to the server and recieve the latest projectData

const updateUI = async (url) => {
    const res = await fetch(url);
    try {
        const data = await res.json()
        console.log(data)
        document.getElementById("date").innerHTML = data[0].date;
        document.getElementById("temp").innerHTML = data[0].temperature;
        document.getElementById("content").innerHTML = data[0].userResponse;
        document.getElementById("country").innerHTML = data[0].country;
        document.getElementById("city").innerHTML = data[0].name;
        document.getElementById("weather").innerHTML = data[0].description;
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
                    userResponse: feelings,
                    name: name,
                    description: description,
                    country: country,
                }
                postFeeling("http://127.0.0.1:3000/weathertoday", dataToSend)
                console.log(dataToSend);
                updateUI("http://127.0.0.1:3000/weathertoday");
            }
        })

})