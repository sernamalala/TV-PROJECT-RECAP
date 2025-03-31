let allEpisodeList;
let allShowsList;
let id = 82;
function setup() {
  fetchData(id);
}

//API url
async function fetchData(identity) {
//ASYNC function used to retrieve data from an API URL
  try {
    let episodeURL = `https://api.tvmaze.com/shows/${identity}/episodes`;
    let showURL = "https://api.tvmaze.com/shows";

    const response = await fetch(episodeURL);
    const data = await response.json();
    console.log(data)
    //need to use await because data needs to load and be in program


    const showResponse = await fetch(showURL);
    const showData = await showResponse.json();

   
    allEpisodeList = data;
    allShowsList = showData;
    root.innerHTML = "";
    displayEpisodes(allEpisodeList);
    initialiseDropDown(allEpisodeList);
    initialiseShowDropDown(allShowsList);
    
  } catch (error) {
    console.error("Error retrieving data: ", error)
    alert("Error fetching data. Please reload page")
  }
  
}

const root = document.getElementById("root");
//DISPLAY EPISODES
function displayEpisodes(episodeList) {

  episodeList.forEach(element => {
  const card = document.createElement("div");
  card.id = "card";

  const name = document.createElement("p");
  name.id = "name";
  const season = `S${element.season.toString().padStart(2,"0")}E${element.number.toString().padStart(2,"0")}`;
  name.innerHTML = `${element.name} - ${season}`;

  const image = document.createElement("img");
  image.src = `${element.image.medium}`;
  const summary = document.createElement("p");
   summary.innerHTML = `${element.summary}`;

   card.append(name);
   card.append(image);
   card.append(summary);
   root.append(card)
  });

  
}

//TAKE USER INPUT
const userSearchInput = document.getElementById("search");
const displayNum = document.getElementById("display");

function filterEpisodes(allEpisodeList) {

  let userInput = userSearchInput.value.toLowerCase();
  console.log(userInput);
  
  let filteredEpisodesList = allEpisodeList.filter(episode =>{
  
    return episode.name.toLowerCase().includes(userInput) || episode.summary.toLowerCase().includes(userInput);
  
  })

 

  if(userSearchInput.value.length > 0){
  displayNum.innerHTML = `Displaying ${filteredEpisodesList.length}/${allEpisodeList.length} episodes`;
  root.innerHTML = "";
  displayEpisodes(filteredEpisodesList);
  }
  else{
    displayNum.innerHTML=" ";
    root.innerHTML = "";
    displayEpisodes(allEpisodeList);
  }

  }

userSearchInput.addEventListener("input", ()=>{

  filterEpisodes(allEpisodeList);
})


//EPISODE-DROPDOWN

const episodeDropdown = document.getElementById("episode-dropdown");
let allEpisodes = document.createElement("option");
allEpisodes.textContent = "Display All episodes";
episodeDropdown.appendChild(allEpisodes);
function initialiseDropDown(list) {

  list.forEach(episode =>{
    let option = document.createElement("option");
    const season = `S${episode.season.toString().padStart(2,"0")}E${episode.number.toString().padStart(2,"0")}`;
    option.textContent = `${season} - ${episode.name}`
    episodeDropdown.appendChild(option);
  })
}

function selectEpisode(list) {
  
  let optionSelected = episodeDropdown.value.slice(9).toLowerCase();
  //slice the episode name only
  console.log(optionSelected);


  let selectedEpisode = list.filter(episode =>{
  
    return episode.name.toLowerCase().includes(optionSelected);
  
  })

  
  if(episodeDropdown.value === "Display All episodes"){
   selectedEpisode = list;
  }
  console.log(selectedEpisode)
  displayNum.innerHTML=" ";
  root.innerHTML = "";
  displayEpisodes(selectedEpisode);

}

episodeDropdown.addEventListener("change", ()=>{
  selectEpisode(allEpisodeList);
});

//SHOW-DROPDOWN

const showDropdown = document.getElementById("show-dropdown");

function initialiseShowDropDown(list) {

  list.sort((show1,show2) => show1.name.localeCompare(show2.name));

  list.forEach(show =>{
    let option = document.createElement("option");
    option.id = show.id;
    option.textContent = `${show.name}`
    showDropdown.appendChild(option);
  })
}


showDropdown.addEventListener("change", ()=>{

  let selectedShow = document.querySelector("#show-dropdown option:checked");
  let newId = Number(selectedShow.id);
 
  episodeDropdown.innerHTML = "";
  
  if(id!==newId){
  fetchData(newId);
  }
});
window.onload = setup;
