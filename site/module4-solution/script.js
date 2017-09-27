// *******************************
// START HERE IF YOU WANT A MORE CHALLENGING STARTING POINT FOR THIS ASSIGNMENT
// *******************************
//
// Module 4 Assignment Instructions.
//
// The idea of this assignment is to take an existing array of names
// and then output either Hello 'Name' or Good Bye 'Name' to the console.
// The program should say "Hello" to any name except names that start with a "J"
// or "j", otherwise, the program should say "Good Bye". So, the final output
// on the console should look like this:
/*
Hello Yaakov
Good Bye John
Good Bye Jen
Good Bye Jason
Hello Paul
Hello Frank
Hello Larry
Hello Paula
Hello Laura
Good Bye Jim

WARNING!!! WARNING!!!
The code does NOT currently work! It is YOUR job to make it work
as described in the requirements and the steps in order to complete this
assignment.
WARNING!!! WARNING!!!

*/

// STEP 1:
// Wrap the entire contents of script.js inside of an IIFE
// See Lecture 52, part 2
// (Note, Step 2 will be done in the SpeakHello.js file.)
(function(window){

  var greeter = {};
  greeter.names = ["Yaakov", "John", "Jen", "Jason", "Paul", "Frank", "Larry", "Paula", "Laura", "Jim"];
  
  console.log("Part 1 solution ********************");

  // STEP 10:
  // Loop over the names array and say either 'Hello' or "Good Bye"
  // using the 'speak' method or either helloSpeaker's or byeSpeaker's
  // 'speak' method.
  // See Lecture 50, part 1
  for (var i=0; i < greeter.names.length; i++) {

    // STEP 11:
    // Retrieve the first letter of the current name in the loop.
    // Use the string object's 'charAt' function. Since we are looking for
    // names that start with either upper case or lower case 'J'/'j', call
    // string object's 'toLowerCase' method on the result so we can compare
    // to lower case character 'j' afterwards.
    // Look up these methods on Mozilla Developer Network web site if needed.
    var firstLetter = greeter.names[i].charAt(0).toLowerCase();

    // STEP 12:
    // Compare the 'firstLetter' retrieved in STEP 11 to lower case
    // 'j'. If the same, call byeSpeaker's 'speak' method with the current name
    // in the loop. Otherwise, call helloSpeaker's 'speak' method with the current
    // name in the loop.
    if (firstLetter == 'j' || firstLetter == "J") {
      byeSpeaker.speak(greeter.names[i]);
    } else {
      helloSpeaker.speak(greeter.names[i]);
    }
  }
  console.log("******************** END Part 1 solution");

  // 4.2: Helper function: returns a greeting based on name
  function getNamesSimpleArray(name) {

    var firstLetter = name.charAt(0).toLowerCase();
    if (firstLetter == 'j' || firstLetter == "J") {
      return byeSpeaker.speakSimple(name);
    } else {
      return helloSpeaker.speakSimple(name);
    }
  }

  // 4.2: Array.prototype.map: pass the function as a parameter
  greeter.namesSimple = greeter.names.map(
    getNamesSimpleArray
  );

  // 4.2: Print the custom made array above
  console.log("Part 2 solution ********************");
  for (var i=0; i < greeter.namesSimple.length; i++) {
    console.log(greeter.namesSimple[i]);
  }
  console.log("******************** END Part 2 solution");
  
  // 4.3 Extra Credit
  var helloIndex = 0;
  var byeIndex = 0;

  var newArr = greeter.namesSimple.reduce(function(accumulator, currentValue, currentIndex) {

    var substring = "Hello";
    if (currentValue.includes(substring)) {
       accumulator.hello[helloIndex] = currentValue;
       helloIndex++;
    } else {
       accumulator.bye[byeIndex] = currentValue;
       byeIndex++;
    }
    return accumulator;

  }, {hello: [], bye: []});


  console.log("Part 3 Extra Credit solution ***************");
  
  // 4.3: Print all hello greetings
  for (var i=0; i<newArr.hello.length; i++) {
    console.log(newArr.hello[i]);
  }

  // 4.3: Print all bye greetings
  for (var i=0; i<newArr.bye.length; i++) {
    console.log(newArr.bye[i]);
  } 

  console.log("*************** END Part 3 Extra Credit solution");
  
  window.greeter = greeter;

})(window);





