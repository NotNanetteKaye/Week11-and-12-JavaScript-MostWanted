'use strict'; // makes JavaScript more strongly-typed

// Function
function ageIsGreater(userInput) {
    if (userInput > 23) {
        return true;
    }
    return false;

}

// Invocation
let isAgeGreater = ageIsGreater(parseInt(prompt('Are you older than me? Please enter your age in whole numbers: ')))

if (isAgeGreater) {
    alert('You are older than me')
}
alert('I am older than you')





// Previous Examples:
//// console.log('Hello World');

// function counterPrinter(userInput) {
//     for(let i=0; i < userInput; i++) {
//         console.log(`My new favorite number is ${i}.`)
// 
//     }
// }

counterPrinter(parseInt(prompt('Please enter a whole number: ')));