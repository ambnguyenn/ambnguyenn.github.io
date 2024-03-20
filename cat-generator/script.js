/* 
	Tell us about your project below!👇

  This Cat generator website allows the user to click on a generate cat button and uses a cat image API and a cat fact API to provide the user with a different cat image and a different cat fact everytime (although the cat fact API onlt has 5 facts for some reason O_o ). It uses the axios library to get the responses.

  1. Create variable and get element with "cat-image" id
  2. Use axios library with get/then request to access the URL and handle the response when received
  3. Update the cat image src with the image url
  4. Create a variable and get element with "cat-fact" id
  5. Generate a random number 0-4 and store it in a variable
  6. Use axios get/then, and use the random number to access a random fact in the API's array
*/

function generateCat() {
  let catImage = document.getElementById('cat-image');

  axios.get("https://cataas.com/cat").then(response => {
    catImage.src = response.request.responseURL;
  })

  let catFact = document.getElementById('cat-fact');

  let randomNumber = Math.floor(Math.random() * 4);

  axios.get('https://cat-fact.herokuapp.com/facts').then(response => {
    //console.log(response.data[randomNumber].text);
    catFact.innerHTML = response.data[randomNumber].text;
  })
}


