

// NEW VERSION
function animalRequest() {
    let request = new XMLHttpRequest();
  request.open("GET", "https://zoo-animal-api.herokuapp.com/animals/rand/");
  request.send();
  request.onload = () => {
    console.log(request);
    if (request.status == 200) {
      var animalJSON = JSON.parse(request.response)
      console.log(animalJSON);
      animalPresent(animalJSON);
    } else {
      console.log(`error ${request.status} ${request.statusText}`)
    }
  }
}

function animalPresent(animalJSON) {
  var factsArray = ["name", "image_link", "animal_type", "length_min", "length_max", "weight_min", "weight_max", "habitat", "diet", "geo_range"];
  var arrayLength = factsArray.length;
  for (var i = 0; i < arrayLength; i++) {
    console.log(factsArray[i]);
    fact_name = factsArray[i]
    fact_content = animalJSON[factsArray[i]]
    document.getElementById(fact_name).innerHTML = fact_content ;
    };
  document.getElementById("image_link").src= animalJSON.image_link;
}


function memeRequest() {
  let request = new XMLHttpRequest();
request.open("GET", "https://imgflip.com/tag/funny+animals/get_memes");
request.send();
request.onload = () => {
  console.log(request);
  if (request.status == 200) {
    var memeJSON = JSON.parse(request.response)
    console.log(memeJSON);
    memePresent(memeJSON);
  } else {
    console.log(`error ${request.status} ${request.statusText}`)
  }
}
}
function memePresent(animalJSON) {
  var factsArray = ["name", "image_link", "animal_type", "length_min", "length_max", "weight_min", "weight_max", "habitat", "diet", "geo_range"];
  var arrayLength = factsArray.length;
  for (var i = 0; i < arrayLength; i++) {
    console.log(factsArray[i]);
    fact_name = factsArray[i]
    fact_content = animalJSON[factsArray[i]]
    document.getElementById(fact_name).innerHTML = fact_content ;
    };
  document.getElementById("image_link").src= animalJSON.image_link;
}

fetch('https://meme-api.herokuapp.com/gimme/memes')
  .then(r=>r.json())
  .then(json=>{
    console.log( json.url )
  })
// OLD VERSION

// function animalRequest() {
//     let request = new XMLHttpRequest();
//   request.open("GET", "https://zoo-animal-api.herokuapp.com/animals/rand/");
//   request.send();
//   request.onload = () => {
//     console.log(request);
//     if (request.status == 200) {
//       var animalJSON = JSON.parse(request.response)
//       console.log(animalJSON);
//       animalPresent(animalJSON);
//     } else {
//       console.log(`error ${request.status} ${request.statusText}`)
//     }
//   }
// }

// function animalPresent(animalJSON) {
//   var animal_name = animalJSON.name;
//   var image_link = animalJSON.image_link;
//   var animal_type = animalJSON.animal_type;
//   var length_min = animalJSON.length_min;
//   var length_max = animalJSON.length_max;
//   var weight_min = animalJSON.weight_min;
//   var weight_max = animalJSON.weight_max;
//   var habitat = animalJSON.habitat;
//   var diet = animalJSON.diet;
//   var geo_range = animalJSON.geo_range;
//   document.getElementById("animal_name").innerHTML = animal_name;

//   var facts_list_1 = ["animal_name", "image_link", "animal_type", "length_min", "length_max", "weight_min", "weight_max", "habitat", "diet", "geo_range"];
//   var facts_list_2 = [animal_name, image_link, animal_type, length_min, length_max, weight_min, weight_max, habitat, diet, geo_range];
//   var arrayLength = facts_list_2.length;
//   for (var i = 0; i < arrayLength; i++) {
//     console.log(facts_list_2[i]);
//     document.getElementById(facts_list_1[i]).innerHTML =  facts_list_2[i] ;
//     };
//   document.getElementById("image_link").src= image_link;
// }
