
/* Global Variables */
const apiKey = "0beafec112f102586c440eff7b680a94";
let zipCode = "";
let basicURL = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apiKey}`;
const zipcodeInput = document.getElementById("zip");
console.log(zipcodeInput)

const updateZipcode = (event) => {
    return zipCode = `${event.target.value}`;

}
zipcodeInput.addEventListener("input", updateZipcode)





// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();



// Async function to make GET request to the OpenWeatherMap API
const getWeather = async (url) => {
    const response = await fetch(url);
    try {
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.log("error", error);
    }
}


// creating an event listener to the "Generate" button to exectute the Get request to the openWeatherMap 
// when clicked.


const generateButton = document.getElementById("generate");
generateButton.addEventListener("click", () => {
    getWeather(basicURL)
    console.log(zipCode)
    console.log(basicURL)
})