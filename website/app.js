
/* Global Variables */
const apiKey = "0beafec112f102586c440eff7b680a94";
let zipCode = "";
let basicURL = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apiKey}`;

// updating the basicURL by adding an input event listener to the "zip" ID
const zipcodeInput = document.getElementById("zip");
const updateZipcode = (event) => {
    zipCode = `${event.target.value}`;  
    basicURL = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apiKey}`
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

// Async function to mae POST request to send the temperature received from the OpenWeatherApi,the date and the userResponse received 

const postFeeling=async(url="",data={})=>{
    const response=await fetch(url,{
    method:"POST",
    credentials:"same-origin",
    header:{
        "content-type":"application/json",
    },
    body:JSON.stringify(data)
})
try{
    const newData=await response.json()
    console.log(newData);
}catch(error){
console.log("error")
}
}
// creating an event listener to the "Generate" button to exectute the Get request to the openWeatherMap 
// when clicked.


const generateButton = document.getElementById("generate");
generateButton.addEventListener("click", () => {
    getWeather(basicURL);
   
})