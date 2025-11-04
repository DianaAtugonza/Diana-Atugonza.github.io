// Variables
let name = "Alice"; // Can be reassigned
const age = 30;     // Cannot be reassigned (constant)
var oldWay = "Avoid"; // Older way, has scope issues

// Data Types
const string = "Hello World";
const number = 42;
const boolean = true;
const array = [1, 2, 3, "apple"];
const object = { 
  key: "value", 
  score: 100 
};
const isNull = null;
const isUndefined = undefined;

// If...Else
let temperature = 25;
if (temperature > 30) {
  console.log("It's hot!");
} else if (temperature > 20) {
  console.log("The weather is nice."); // This will run
} else {
  console.log("It's cold!");
}

// For Loop
for (let i = 0; i < 5; i++) {
  console.log("Iteration number: " + i);
}

// While Loop
let count = 0;
while (count < 3) {
  console.log("Count is: " + count);
  count++;
}