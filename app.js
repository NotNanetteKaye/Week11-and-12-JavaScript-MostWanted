/*
    Author: devCodeCamp
    Description: Most Wanted Starter Code
*/
//////////////////////////////////////////* Beginning Of Starter Code *//////////////////////////////////////////

"use strict";
//? Utilize the hotkey to hide block level comment documentation
////* Mac: Press "CMD"+"K" and then "CMD"+"/"
////* PC: Press "CTRL"+"K" and then "CTRL"+"/"

/**
 * This is the main logic function being called in index.html.
 * It operates as the entry point for our entire application and allows
 * our user to decide whether to search by name or by traits.
 * @param {Array} people        A collection of person objects.
 */
function app(people) {
  // promptFor() is a custom function defined below that helps us prompt and validate input more easily
  // Note that we are chaining the .toLowerCase() immediately after the promptFor returns its value
  let searchType = promptFor(
    "Do you know the name of the person you are looking for? Enter 'yes' or 'no'",
    yesNo
  ).toLowerCase();
  let searchResults;
  // Routes our application based on the user's input
  switch (searchType) {
    case "yes":
      searchResults = searchByName(people);
      break;
    case "no":
      //! TODO #4: Declare a searchByTraits (multiple traits) function //////////////////////////////////////////
      //! TODO #4a: Provide option to search for single or multiple //////////////////////////////////////////
      searchResults = searchByTraits(people);
      break;
    default:
      // Re-initializes the app() if neither case was hit above. This is an instance of recursion.
      app(people);
      break;
  }
  // Calls the mainMenu() only AFTER we find the SINGLE PERSON
  mainMenu(searchResults, people);
}
// End of app()

/**
 * After finding a single person, we pass in the entire person-object that we found,
 * as well as the entire original dataset of people. We need people in order to find
 * descendants and other information that the user may want.
 * @param {Object[]} person     A singular object inside of an array.
 * @param {Array} people        A collection of person objects.
 * @returns {String}            The valid string input retrieved from the user.
 */
function mainMenu(person, people) {
  // A check to verify a person was found via searchByName() or searchByTrait()
  if (!person[0]) {
    alert("Could not find that individual.");
    // Restarts app() from the very beginning
    return app(people);
  }
  let displayOption = prompt(
    `Found ${person[0].firstName} ${person[0].lastName}. Do you want to know their 'info', 'family', or 'descendants'?\nType the option you want or type 'restart' or 'quit'.`
  );
  // Routes our application based on the user's input
  switch (displayOption) {
    case "info":
      //! TODO #1: Utilize the displayPerson function //////////////////////////////////////////
      // HINT: Look for a person-object stringifier utility function to help
      let personInfo = displayPerson(person[0]);
      alert(personInfo);
      break;
    case "family":
      //! TODO #2: Declare a findPersonFamily function //////////////////////////////////////////
      // HINT: Look for a people-collection stringifier utility function to help
      let personFamily = findPersonFamily(person[0], people);
      alert(personFamily);
      break;
    case "descendants":
      //! TODO #3: Declare a findPersonDescendants function //////////////////////////////////////////
      // HINT: Review recursion lecture + demo for bonus user story
      let personDescendants = findPersonDescendants(person[0], people);
      displayPeople(personDescendants);
      break;
    case "restart":
      // Restart app() from the very beginning
      app(people);
      break;
    case "quit":
      // Stop application execution
      return;
    case "test":
    default:
      // Prompt user again. Another instance of recursion
      return mainMenu(person, people);
  }
}
// End of mainMenu()

/**
 * This function is used when searching the people collection by
 * a person-object's firstName and lastName properties.
 * @param {Array} people        A collection of person objects.
 * @returns {Array}             An array containing the person-object (or empty array if no match)
 */
function searchByName(people) {
  let firstName = promptFor("What is the person's first name?", chars);
  let lastName = promptFor("What is the person's last name?", chars);

  // The foundPerson value will be of type Array. Recall that .filter() ALWAYS returns an array.
  let foundPerson = people.filter(function (person) {
    if (person.firstName === firstName && person.lastName === lastName) {
      return true;
    }
  });
  return foundPerson;
}
// End of searchByName()

/**
 * This function will be useful for STRINGIFYING a collection of person-objects
 * first and last name properties in order to easily send the information
 * to the user in the form of an alert().
 * @param {Array} people        A collection of person objects.
 */
function displayPeople(people) {
  alert(
    people
      .map(function (person) {
        return `${person.firstName} ${person.lastName}`;
      })
      .join("\n")
  );
}
// End of displayPeople()

/**
 * This function will be useful for STRINGIFYING a person-object's properties
 * in order to easily send the information to the user in the form of an alert().
 * @param {Object} person       A singular object.
 */
function displayPerson(person) {
  let personInfo = `First Name: ${person.firstName}\n`;
  personInfo += `Last Name: ${person.lastName}\n`;
  personInfo += `Gender: ${person.gender}\n`;
  personInfo += `DOB: ${person.dob}\n`;
  personInfo += `Height: ${person.height}\n`;
  personInfo += `ID: ${person.id}\n`;
  personInfo += `Weight: ${person.weight}\n`;
  personInfo += `Eye color: ${person.eyeColor}\n`;
  personInfo += `Occupation: ${person.occupation}\n`;
  return personInfo;
}
// End of displayPerson()

/**
 * This function's purpose is twofold:
 * First, to generate a prompt with the value passed in to the question parameter.
 * Second, to ensure the user input response has been validated.
 * @param {String} question     A string that will be passed into prompt().
 * @param {Function} valid      A callback function used to validate basic user input.
 * @returns {String}            The valid string input retrieved from the user.
 */
function promptFor(question, valid) {
  do {
    var response = prompt(question).trim();
  } while (!response || !valid(response));
  return response;
}
// End of promptFor()

/**
 * This helper function checks to see if the value passed into input is a "yes" or "no."
 * @param {String} input        A string that will be normalized via .toLowerCase().
 * @returns {Boolean}           The result of our condition evaluation.
 */
function yesNo(input) {
  return input.toLowerCase() === "yes" || input.toLowerCase() === "no";
}
// End of yesNo()

/**
 * This helper function operates as a default callback for promptFor's validation.
 * Feel free to modify this to suit your needs.
 * @param {String} input        A string.
 * @returns {Boolean}           Default validation -- no logic yet.
 */
function chars(input) {
  return true; // Default validation only
}

// End of chars()

//////////////////////////////////////////* End Of Starter Code *//////////////////////////////////////////
// Any additional functions can be written below this line 👇. Happy Coding! 😁

function findPersonFamily(person = {}, people = []) {
  let currentSpouse = findCurrentSpouse(person, people);

  let currentParentsArray = findCurrentParents(person, people);
  let currentParentsName = [];
  for (let i = 0; i < currentParentsArray.length; i++) {
    currentParentsName.push(currentParentsArray[i].firstName);
  }

  let currentSiblingArray = findCurrentSiblings(person, people);
  let currentSiblingsName = [];
  for (let i = 0; i < currentSiblingArray.length; i++) {
    currentSiblingsName.push(currentSiblingArray[i].firstName);
  }

  let personFamily = `Current Spouse: ${currentSpouse[0].firstName} ${currentSpouse[0].lastName}\n`;
  personFamily += `Current Parents: ${currentParentsName}\n`;
  personFamily += `Current Sibilings: ${currentSiblingsName}\n`;
  return personFamily;
}
// find current spouse
function findCurrentSpouse(person = {}, people = []) {
  let result;
  result = people.filter(function (potentialSpouse) {
    if (potentialSpouse.id === person.currentSpouse) {
      return true;
    }
  });
  return result;
}
// end of finding current spouse

// find current parents
function findCurrentParents(personObj = {}, peopleArray = []) {
  let result = peopleArray.filter(function (potentialParent) {
    if (personObj.parents.includes(potentialParent.id)) {
      return true;
    }
  });
  return result;
}
// end of finding current parents

// find current siblings
function findCurrentSiblings(personObj = {}, peopleArray = []) {
  let result = peopleArray.filter(function (sibling) {
    if (personObj.parents.includes(sibling.parents[0] || sibling.parents[1])) {
      return true;
    }
  });
  return result;
}

function findPersonDescendants(personObj = {}, peopleArray = []) {
  let subPeopleArray = peopleArray.filter((obj) =>
    obj.parents.includes(personObj.id)
  );
  console.log("subPeopleArray:", subPeopleArray);
  if (subPeopleArray.length === 0) return subPeopleArray;
  for (let i = 0; i < subPeopleArray.length; i++) {
    subPeopleArray = subPeopleArray.concat(
      findPersonDescendants(subPeopleArray[i], peopleArray)
    );
  }
  return (subPeopleArray);
}

// validity functions here: 
function belowSixTraits(input) {
  if (input <= 5) {
    return true;
  }
}

function checkingSingularTraitSpelling(input){
  if (input === "gender" ||input === "dob" ||input === "height" ||input === "weight" ||input === "eyeColor" ||input === "occupation"
  ) {
    return true;
  }
}

function genderInputIsCorrect (input) {
  if (input === "female" || input === "male")  {
    return true;
  }

}

function eyeColorInputIsCorrect (input) {
  if (input === "brown" || input === "black"  || input === "hazel" || input === "blue" || input === "green")  {
    return true;
  }

}

function occupationInputIsCorrect (input) {
  if (input === "programmer" || input === "assistant" || input == "landscaper" || input === "nurse" || input === "student" || input === "architect" || input === "doctor" || input === "landscaper" || input === "politician")  {
    return true;
  }

}

function dobInputIsCorrect (input) {
  if (input === "1/18/1949" || input === "4/1/1947" || input === "5/9/1951" || input === "9/6/1945" || input === "3/16/1938" || input === "4/10/1940" || input === "12/18/1952" ||input === "10/28/1948" ||input === "3/16/1938" ||input === "4/20/1939" ||input === "5/6/1937" ||input === "2/8/1972" ||input === "12/23/1969" ||input === "12/18/1969" ||input === "11/4/1970") {
    return true;
  }
}
// end of validity functions



// function to searchByTraits:
function searchByTraits(people) {
  let searchTraits = promptFor(
    "We can search for people based on traits! Please enter number of traits you would like to find the individual. Maximum of 5: ",
    belowSixTraits
  );
  let searchResults;
  searchTraits = parseInt(searchTraits);
  switch (searchTraits) {
    case 1:
      searchResults = searchBySingularTrait(people);
      searchResults = findMatchingTrait(searchResults, people)
      break;
    case 2:
      searchResults = searchByTwoTraits(people);
      searchResults = matchingTraitstoIncomingArray(searchResults);
      searchResults = findMatchingTraits(searchResults, people);
      break;
    case 3:
      searchResults = searchByThreeTraits(people);
      searchResults = matchingTraitstoIncomingArray(searchResults);
      searchResults = findMatchingTraits(searchResults, people);
      break;
    case 4:
      searchResults = searchByFourTraits(people);
      searchResults = matchingTraitstoIncomingArray(searchResults);
      searchResults = findMatchingTraits(searchResults, people);
      break;
    case 5:
      searchResults = searchByFiveTraits(people);
      searchResults = matchingTraitstoIncomingArray(searchResults);
      searchResults = findMatchingTraits(searchResults, people);
      break;
    default:
      searchByTraits(people);
      break;
  }
  displayPeople(searchResults);
}

function findMatchingTraits(searchResults, peopleArray=[]) {
  let i=0;
  let subPeopleTraitsArray = peopleArray.filter((obj) =>
  (obj.weight === searchResults[i]) || (obj.height === searchResults[i]) || (obj.gender === searchResults[i]) || (obj.dob=== searchResults[i]) || (obj.eyeColor === searchResults[i]) || (obj.occupation === searchResults[i]));
  console.log("subPeopleTraitsArray:", subPeopleTraitsArray);
  if (subPeopleTraitsArray.length === 0) return subPeopleTraitsArray;
  for (let i =1; i< subPeopleTraitsArray.length; i++) {
    subPeopleTraitsArray = subPeopleTraitsArray.filter((obj) =>
    (obj.weight === searchResults[i]) || (obj.height === searchResults[i]) || (obj.gender === searchResults[i]) || (obj.dob=== searchResults[i]) || (obj.eyeColor === searchResults[i]) || (obj.occupation === searchResults[i]));
    console.log("new subPeopleTraitsArray:", subPeopleTraitsArray)
  }
  return subPeopleTraitsArray;
};


function findMatchingTrait(searchResults, peopleArray=[]) {
  let subPeopleTraitsArray = peopleArray.filter((obj) =>
    (obj.weight === searchResults) || (obj.height === searchResults) || (obj.gender === searchResults) || (obj.dob=== searchResults) || (obj.eyeColor === searchResults) || (obj.occupation === searchResults)
  );
  console.log("subPeopleTraitsArray:", subPeopleTraitsArray);
  if (subPeopleTraitsArray.length === 0) return subPeopleTraitsArray;
  for (let i = 0; i < subPeopleTraitsArray.length; i++) {
    subPeopleTraitsArray = subPeopleTraitsArray.concat(
      findMatchingTraits(subPeopleTraitsArray[i], peopleArray)
    );
  }
  return (subPeopleTraitsArray);
}


// only looking for one trait at a time:
function searchBySingularTrait() {
  let userInputTrait = promptFor(
    "What trait would you like to search for? Options are gender, dob, height, weight, eyeColor, occupation: ",
    checkingSingularTraitSpelling
  );
  if ((userInputTrait === "weight") || (userInputTrait === "height")) {
    let searchResultsWeightorHeight = promptFor("Please enter value: ", parseInt);
    searchResultsWeightorHeight = parseInt(searchResultsWeightorHeight);
    return searchResultsWeightorHeight;
  } 
  if (userInputTrait === "gender") {
    let searchResultsGender = promptFor("Are you looking for a male or a female?", genderInputIsCorrect);
    return searchResultsGender;
  }
  if (userInputTrait === "dob") {
    let searchResultsDOB = promptFor("Please enter dob of person in this format (ex: 11/4/1970): ", dobInputIsCorrect);
    return searchResultsDOB;
};
  if (userInputTrait === "eyeColor") {
    let searchResultsEyeColor = promptFor("Please enter color of eyes: ", eyeColorInputIsCorrect);
    return searchResultsEyeColor; 
  }
  if (userInputTrait === "occupation") {
    let searchResultsOccupation = promptFor("Please enter person's occupation: ", occupationInputIsCorrect);
    return searchResultsOccupation; 
  }
}


function searchByTwoTraits() {
  let userInputTraitsCategories = [];
  alert( "We are identifying a person by 2 traits! The traits you can search by are gender, dob, height, weight, eyeColor, occupation.")
  while (userInputTraitsCategories.length < 1) {
    let traitCategory = promptFor("would you like to search by gender? Please enter yes or no: ", yesNo)
    if (traitCategory === "yes") {
      userInputTraitsCategories.push("gender")
    }
    traitCategory = promptFor("would you like to search by dob? Please enter yes or no: ", yesNo)
    if (traitCategory === "yes") {
      userInputTraitsCategories.push("dob")
    }
    if (userInputTraitsCategories.length === 2) return userInputTraitsCategories;
    traitCategory = promptFor("would you like to search by height? Please enter yes or no: ", yesNo)
    if (traitCategory === "yes") {
      userInputTraitsCategories.push("height")
    }
    if (userInputTraitsCategories.length === 2) return userInputTraitsCategories;
    traitCategory = promptFor("would you like to search by weight? Please enter yes or no: ", yesNo)
    if (traitCategory === "yes") {
      userInputTraitsCategories.push("weight")
    }
    if (userInputTraitsCategories.length === 2) return userInputTraitsCategories;
    traitCategory = promptFor("would you like to search by eyeColor? Please enter yes or no: ", yesNo)
    if (traitCategory === "yes") {
      userInputTraitsCategories.push("eyeColor")
    }
    if (userInputTraitsCategories.length === 2) return userInputTraitsCategories;
    traitCategory = promptFor("would you like to search by occupation? Please enter yes or no: ", yesNo)
    if (traitCategory === "yes") {
      userInputTraitsCategories.push("occupation")
    }
    if (userInputTraitsCategories.length === 2) return userInputTraitsCategories;
    }
  promptFor("Starting over because you did not choose two traits.", searchByTwoTraits)
}

function matchingTraitstoIncomingArray(searchResults=[]) {
  let userInputTraitsCharacteristics = []
  let i=0
  while (i < searchResults.length) {
    if (searchResults[i] === "weight") {
      let searchResultsWeightorHeight = promptFor("Please enter weight: ", parseInt);
      searchResultsWeightorHeight = parseInt(searchResultsWeightorHeight);
      userInputTraitsCharacteristics.push(searchResultsWeightorHeight);
    } 
    if (searchResults[i] === "height") {
      let searchResultsWeightorHeight = promptFor("Please enter height: ", parseInt);
      searchResultsWeightorHeight = parseInt(searchResultsWeightorHeight);
      userInputTraitsCharacteristics.push(searchResultsWeightorHeight);
    } 
    if (searchResults[i] === "gender") {
      let searchResultsGender = promptFor("Are you looking for a male or a female?", genderInputIsCorrect);
      userInputTraitsCharacteristics.push(searchResultsGender);
    }
    if (searchResults[i] === "dob") {
      let searchResultsDOB = promptFor("Please enter dob of person in this format (ex: 11/4/1970): ", dobInputIsCorrect);
      userInputTraitsCharacteristics.push(searchResultsDOB);
    };
    if (searchResults[i] === "eyeColor") {
      let searchResultsEyeColor = promptFor("Please enter color of eyes: ", eyeColorInputIsCorrect);
      userInputTraitsCharacteristics.push(searchResultsEyeColor); 
    }
    if (searchResults[i] === "occupation") {
      let searchResultsOccupation = promptFor("Please enter person's occupation: ", occupationInputIsCorrect);
      userInputTraitsCharacteristics.push(searchResultsOccupation); 
    }
    i++;
  }
  return userInputTraitsCharacteristics;
}

function searchByThreeTraits() {
  let userInputTraitsCategories = [];
  alert( "We are identifying a person by 3 traits! The traits you can search by are gender, dob, height, weight, eyeColor, occupation.")
  while (userInputTraitsCategories.length < 1) {
    let traitCategory = promptFor("would you like to search by gender? Please enter yes or no: ", yesNo)
    if (traitCategory === "yes") {
      userInputTraitsCategories.push("gender")
    }
    traitCategory = promptFor("would you like to search by dob? Please enter yes or no: ", yesNo)
    if (traitCategory === "yes") {
      userInputTraitsCategories.push("dob")
    }
    traitCategory = promptFor("would you like to search by height? Please enter yes or no: ", yesNo)
    if (traitCategory === "yes") {
      userInputTraitsCategories.push("height")
    }
    if (userInputTraitsCategories.length === 3) return userInputTraitsCategories;
    traitCategory = promptFor("would you like to search by weight? Please enter yes or no: ", yesNo)
    if (traitCategory === "yes") {
      userInputTraitsCategories.push("weight")
    }
    if (userInputTraitsCategories.length === 3) return userInputTraitsCategories;
    traitCategory = promptFor("would you like to search by eyeColor? Please enter yes or no: ", yesNo)
    if (traitCategory === "yes") {
      userInputTraitsCategories.push("eyeColor")
    }
    if (userInputTraitsCategories.length === 3) return userInputTraitsCategories;
    traitCategory = promptFor("would you like to search by occupation? Please enter yes or no: ", yesNo)
    if (traitCategory === "yes") {
      userInputTraitsCategories.push("occupation")
    }
    if (userInputTraitsCategories.length === 3) return userInputTraitsCategories;
    }
  promptFor("Starting over because you did not choose three traits.", searchByThreeTraits)
}

function searchByFourTraits() {
  let userInputTraitsCategories = [];
  alert( "We are identifying a person by 4 traits! The traits you can search by are gender, dob, height, weight, eyeColor, occupation.")
  while (userInputTraitsCategories.length < 1) {
    let traitCategory = promptFor("would you like to search by gender? Please enter yes or no: ", yesNo)
    if (traitCategory === "yes") {
      userInputTraitsCategories.push("gender")
    }
    traitCategory = promptFor("would you like to search by dob? Please enter yes or no: ", yesNo)
    if (traitCategory === "yes") {
      userInputTraitsCategories.push("dob")
    }
    traitCategory = promptFor("would you like to search by height? Please enter yes or no: ", yesNo)
    if (traitCategory === "yes") {
      userInputTraitsCategories.push("height")
    }
    traitCategory = promptFor("would you like to search by weight? Please enter yes or no: ", yesNo)
    if (traitCategory === "yes") {
      userInputTraitsCategories.push("weight")
    }
    if (userInputTraitsCategories.length === 4) return userInputTraitsCategories;
    traitCategory = promptFor("would you like to search by eyeColor? Please enter yes or no: ", yesNo)
    if (traitCategory === "yes") {
      userInputTraitsCategories.push("eyeColor")
    }
    if (userInputTraitsCategories.length === 4) return userInputTraitsCategories;
    traitCategory = promptFor("would you like to search by occupation? Please enter yes or no: ", yesNo)
    if (traitCategory === "yes") {
      userInputTraitsCategories.push("occupation")
    }
    if (userInputTraitsCategories.length === 4) return userInputTraitsCategories;
    }
  promptFor("Starting over because you did not choose four traits.", searchByFourTraits)
}

function searchByFiveTraits() {
  let userInputTraitsCategories = [];
  alert( "We are identifying a person by 5 traits! The traits you can search by are gender, dob, height, weight, eyeColor, occupation.")
  while (userInputTraitsCategories.length < 1) {
    let traitCategory = promptFor("would you like to search by gender? Please enter yes or no: ", yesNo)
    if (traitCategory === "yes") {
      userInputTraitsCategories.push("gender")
    }
    traitCategory = promptFor("would you like to search by dob? Please enter yes or no: ", yesNo)
    if (traitCategory === "yes") {
      userInputTraitsCategories.push("dob")
    }
    traitCategory = promptFor("would you like to search by height? Please enter yes or no: ", yesNo)
    if (traitCategory === "yes") {
      userInputTraitsCategories.push("height")
    }
    traitCategory = promptFor("would you like to search by weight? Please enter yes or no: ", yesNo)
    if (traitCategory === "yes") {
      userInputTraitsCategories.push("weight")
    }
    traitCategory = promptFor("would you like to search by eyeColor? Please enter yes or no: ", yesNo)
    if (traitCategory === "yes") {
      userInputTraitsCategories.push("eyeColor")
    }
    if (userInputTraitsCategories.length === 5) return userInputTraitsCategories;
    traitCategory = promptFor("would you like to search by occupation? Please enter yes or no: ", yesNo)
    if (traitCategory === "yes") {
      userInputTraitsCategories.push("occupation")
    }
    if (userInputTraitsCategories.length === 5) return userInputTraitsCategories;
    }
  promptFor("Starting over because you did not choose five traits.", searchByFiveTraits)
}