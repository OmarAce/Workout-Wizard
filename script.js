//Field Variables
var formEl = $('#search-form')
var displayWorkOutsEl = document.querySelector('#display')
var displayExerciseEl = document.querySelector('#display2')
var displayVideosEl = document.querySelector('#display3')

//Muscle Variables
var deltEl = $('#delts')
var bicepArmsEl = $('#bicepArms')
var bicepLegsEl = $('#bicepLegs')
var elbowEl = $('#elbow')
var calvesEl = $('#calves')
var buttEl = $('#butt')
var latsEl = $('#lats')
var obliqueEl = $('#oblique')
var pecsEl = $('#pecs')
var quadsEl = $('#quads')
var pecs2El = $('#pecs2')
var calvesEl = $('#calves2')
var trapsEl = $('#traps')
var trisEl = $('#tris')

///Searches for Muscle Involving Exercise
  function getMuscle(){
    event.preventDefault();
    $('.workout:hidden').show("slow");
    var muscle = $(this).attr('data-id'); //Grabs Muscle's Data-id that is embedded into the HTML
    console.log(muscle);
    //Data-Id placed into URL
    urlMuscle = "https://wger.de/api/v2/exercise/?muscles="+muscle+"&language=2";
    
    //URL Fetch with Auth
    fetch(urlMuscle, {
      headers: {
          'Authorization': 'Token 954c1b128bf5599c33df6960a53dc2a5d3a7b6b4'
      }
    })
    .then(function (response){
      console.log(response);
      return response.json();
    })
    .then(function (data){
      console.log(data);
      //Clears Out Previous Results if there is any
      displayWorkOutsEl.innerHTML = "";
      //Render's Dynamic List of Buttons depending on data results length
        for (var i = 0; i < data.results.length; i++) {
          console.log(data.results[i].name)


          displayWorkOutsEl.innerHTML = displayWorkOutsEl.innerHTML+`<button onclick="window.location.href='#results'" data-exercise="${data.results[i].id}" data-name="${ data.results[i].name }" class="btn btn-exercise btn-primary col-12">${ data.results[i].name }</button>

        `}

        //Looks for Exercise Click and runs getExercise Function
        $(document).ready(function() {
          $('.btn-exercise').on('click', getExercise)
          $('.btn-exercise').on('click', getVideos)
        })
        

    });      
  }

//Looks Up Exercise that was click on
function getExercise(){
  event.preventDefault();
  $('.results:hidden').show("slow");
  //Grabs the exercise id that was dynamically embedded into the HTML in the last function
  var exercise = $(this).attr('data-exercise');
  //Exercise value placed into URL
  urlMuscle = "https://wger.de/api/v2/exerciseinfo/"+exercise+"/?language=2";

  //Fetches Exercise Info
  fetch(urlMuscle, {
    headers: {
        'Authorization': 'Token 954c1b128bf5599c33df6960a53dc2a5d3a7b6b4'
    }
  })
  .then(function (response){
    console.log(response);
    return response.json();
  })
  .then(function (data){
    console.log(data);
    //Clears Out Previous Exercise if there was one
    displayExerciseEl.innerHTML = "";
        console.log(data.name)
        //Renders Exercise and Instructions

        //If there is no Data Desciption/Instructions just Render Name
        if (data.description == false) {
          displayExerciseEl.innerHTML = displayExerciseEl.innerHTML+`
          <div class="card bg-light text-dark mb-3 p-3 ">
          <div class="card-body ">
            <h3>${ data.name } </h3>
          </div>
        </div>
      `} else //If there is Render Both
        displayExerciseEl.innerHTML = displayExerciseEl.innerHTML+`
        <div class="card bg-light text-dark mb-3 p-3 ">
        <div class="card-body">
          <h3>${ data.name } </h3>
            <p><strong>Instructions:</strong> ${data.description} <br>
        </div>
      </div>
    `
  })
};      

function getVideos(){
  event.preventDefault();
  //Grabs the search terms for youtube api based on previously embedded data name/workout
  var search = $(this).attr('data-name');
  //Search value placed into URL
  YoutubeURL = `https://www.googleapis.com/youtube/v3/search?key=AIzaSyAzle8T8qTfCwHaxweXv8KqTXuvdqDjWIc&part=snippet&q=${search}+workout+instrutctions&maxResults=5&type=video`;;

  //Fetches Youtube Videos Info
  fetch(YoutubeURL, {
    headers: {
        'Accept': 'application/json'
    }
  })
  .then(function (response){
    console.log(response);
    return response.json();
  })
  .then(function (data){
    console.log(data);
    //Clears Out Previous Videos if there were any
    displayVideosEl.innerHTML = "";
        console.log(data.items)
        //Renders Video List
        for (var i = 0; i < data.items.length; i++) {
        displayVideosEl.innerHTML = displayVideosEl.innerHTML+`
        <div class="card bg-light text-dark mb-3 p-3">
        <div class="card-body">
          <h3 class="p-3">${ data.items[i].snippet.title } </h3>
            <p><strong>Description</strong> ${data.items[i].snippet.description} <br>
        </div>
        <a class="text-center" href="https://www.youtube.com/watch?v=${data.items[i].id.videoId}"><img src="${data.items[i].snippet.thumbnails.high.url}" class="img-fluid img-thumbnail" alt="Link to Video"/></a>
      </div>
    `}
  })
};

//Looks for Muscle Click
$('.btn-muscle').on('click', getMuscle)
