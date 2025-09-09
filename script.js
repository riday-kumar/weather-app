const getId = (f) => document.getElementById(f);

// get all parent
const getThreeInfoId = getId("three-info");
const userInputedCity = getId("getCity");

document.getElementById("search-btn").addEventListener("click", () => {
  const userInput = userInputedCity.value.trim().toLowerCase();
  fetch(
    `http://api.weatherapi.com/v1/current.json?key=3f7189117a24416da5d194645250809&q=${userInput}&aqi=yes`
  )
    .then((res) => res.json())
    .then((info) => showData(info));
});

const byDefault = () => {
  fetch(
    "http://api.weatherapi.com/v1/current.json?key=3f7189117a24416da5d194645250809&q=Dhaka&aqi=yes"
  )
    .then((res) => res.json())
    .then((data) => showData(data));
};

const showData = (temp) => {
  getThreeInfoId.innerHTML = "";
  const createInfo = document.createElement("div");
  createInfo.innerHTML = `
    <div class = "flex items-center gap-5 mb-3 text-left text-gray-900">
        <div class="space-y-3" >
            <p class="font-bold text-2xl">${temp.location.name}, ${temp.location.country}</p>
            <h1 class="font-semibold text-4xl">${temp.current.temp_c}° C</h1>
            <p class="font-medium text-[18px]">${temp.current.condition.text}</p>
        </div>
        <div>
        <img src="${temp.current.condition.icon}" class="w-11" alt="" />
        </div>
    </div>
    <div class="text-[18px] space-y-2 text-left text-gray-600">
        <p>Humidity : <span>${temp.current.humidity}%</span></p>
        <p>Wind Speed : <span>${temp.current.wind_kph} km/h</span></p>
        <p> <span>${temp.location.localtime}</span></p>
    </div>
  `;
  getThreeInfoId.appendChild(createInfo);
};

byDefault();
