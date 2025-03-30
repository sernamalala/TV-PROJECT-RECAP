let allEpisodeList;
function setup() {
  allEpisodeList = getAllEpisodes();
  displayEpisodes(allEpisodeList);
  initialiseDropDown(allEpisodeList);
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


//DROPDOWN

const dropdown = document.getElementById("dropdown");
let allEpisodes = document.createElement("option");
allEpisodes.textContent = "Display All episodes";
dropdown.appendChild(allEpisodes);
function initialiseDropDown(list) {

  list.forEach(episode =>{
    let option = document.createElement("option");
    const season = `S${episode.season.toString().padStart(2,"0")}E${episode.number.toString().padStart(2,"0")}`;
    option.textContent = `${season} - ${episode.name}`
    dropdown.appendChild(option);
  })
}

function selectEpisode(list) {
  
  let optionSelected = dropdown.value.slice(9).toLowerCase();
  //slice the episode name only
  console.log(optionSelected);


  let selectedEpisode = list.filter(episode =>{
  
    return episode.name.toLowerCase().includes(optionSelected);
  
  })

  
  if(dropdown.value === "Display All episodes"){
   selectedEpisode = list;
  }
  console.log(selectedEpisode)
  displayNum.innerHTML=" ";
  root.innerHTML = "";
  displayEpisodes(selectedEpisode);

}

dropdown.addEventListener("change", ()=>{
  selectEpisode(allEpisodeList);
});
window.onload = setup;
