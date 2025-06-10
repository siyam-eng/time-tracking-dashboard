/*
1. Load the json on page load and save it to browser memory
2. Loop throught the data to create cards as needed
3. Handle the daily, weekly, and monthly reports on 'click' events and update data from the local storage this time. Though you might need to request everytime for realtime data or you might also need to update the data on the screen in realtime for some kind of data. Learn that and implement later. 
4. Design the components well
5. Remake the same site with react!

*/

// Load the data
const cardsContainer = document.getElementById("cardsContainer");
const timeTrackerPromise = fetch("time-tracking-dashboard/data.json"); // for Github Pages
// const timeTrackerPromise = fetch("/data.json"); // for Local server
const primaryColors = [
  "--Orange-300",
  "--Blue-300",
  "--Pink-400",
  "--Green-400",
  "--Purple-700",
  "--Yellow-300",
]; // Might use a hashtable/object for more accuracy

// different frequencies
const daily = document.getElementById("daily");
const weekly = document.getElementById("weekly");
const monthly = document.getElementById("monthly");
let selectedTimeframe = "weekly";

function appendComponent(i, obj) {
  let timeframe;
  let lastTimeText;
  if (selectedTimeframe == "weekly") {
    timeframe = obj.timeframes.weekly;
    lastTimeText = "Last week"
    
  } else if (selectedTimeframe == "daily") {
    timeframe = obj.timeframes.daily;

    lastTimeText = "Yesterday"
  } else if (selectedTimeframe == "monthly") {
    timeframe = obj.timeframes.monthly;

    lastTimeText = "Last month"
  }
  const svgFileName = obj.title.toLowerCase().replace(" ", "-");
  const component = `
        <section class="bg-(${primaryColors[i]}) flex flex-col w-9/10 rounded-xl mx-auto my-8 overflow-hidden">
          <i class="self-end me-3"><img src="./images/icon-${svgFileName}.svg" alt="" class="h-[2.5rem] w-[6rem] object-cover"/></i>
          <div
            class="flex justify-between p-8 bg-(--Navy-900) rounded-xl"
          >
            <div>
              <p class="font-bold text-xl" id="category">${obj.title}</p>
              <h1 class="text-3xl mt-2" id="hours">${timeframe.current}hrs</h1>
            </div>
            <a class="" href="#"
              ><div class="text-(--Navy-200) flex flex-col items-end gap-8">
                <img src="./images/icon-ellipsis.svg" alt="" class="" />
                <p class="last-week">${lastTimeText} - ${timeframe.previous}hrs</p>
              </div></a
            >
          </div>
        </section>
       `;
  console.log(component);
  cardsContainer.innerHTML += component;
}

document.addEventListener("DOMContentLoaded", async (e) => {
    await updateUI();
  });

async function updateUI(){
timeTrackerPromise
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      return response.json();
    })
    .then((data) => {
      localStorage.setItem("timeTrackerData", JSON.stringify(data));
      let frequency;
      for ([i, obj] of data.entries()) {
        appendComponent(i, obj, frequency);
      }
    });

};

async function updateUIOnClick(){
    const timeTrackerData = JSON.parse(localStorage.getItem("timeTrackerData"));
    console.log("TEST ");

    cardsContainer.innerHTML = "";
    for ([i, obj] of timeTrackerData.entries()){
        appendComponent(i, obj)
    }

}

weekly.addEventListener('click', async (e) =>{
    selectedTimeframe = "weekly";
    if (!weekly.classList.contains("text-white")){
    weekly.classList.add("text-white");
    daily.classList.remove("text-white");
    monthly.classList.remove("text-white");
    await updateUIOnClick();
    
    }
})

daily.addEventListener('click', async (e) =>{
    selectedTimeframe = "daily";
    if (!daily.classList.contains("text-white")){
    daily.classList.add("text-white");
    weekly.classList.remove("text-white");
    monthly.classList.remove("text-white");
    await updateUIOnClick();
    
    }
})

monthly.addEventListener('click', async (e) =>{
    selectedTimeframe = "monthly";
    if (!monthly.classList.contains("text-white")){
    monthly.classList.add("text-white");
    daily.classList.remove("text-white");
    weekly.classList.remove("text-white");
    await updateUIOnClick();
    
    }
})
/* 
1. how to deal with promises to save and retrieve data in a variable?
2. promise and local storage
3. */

//   .then((dataArray) => {
//       for ([i, obj] of dataArray.entries()) {
//         console.log(obj);
//         appendComponent(i, obj);
//       }
//     });
