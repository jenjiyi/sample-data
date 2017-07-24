fs = require('fs'); //require file system
// read file and execute function
fs.readFile("sample_data.csv", function(error, data){

  // 1. parse csv
  var dataString = data.toString();
  // split data string at carage return, new line
  var allRows = dataString.split(/\r?\n|\r/);
  var reasons_array = [];
  // loop through each row beginning after the first header row
  for (var i = 1; i < allRows.length; i++){
    var line = allRows[i].split(',');
    // push reason value, the 2nd index value to reasons_array variable
    reasons_array.push(line[1]);
  }

  // 2. make data easier to manage

  // sorts by reason - groups reasons together
  reasons_array = reasons_array.sort();

  // creates an count object
  var countObj = {};

  // loops and counts each reason in reason_array, stores in new countObj
  reasons_array.forEach(function(value, index) {
    // increment current reason value
    countObj[value] = (countObj[value]||0)+1;

  });

   var sortable = [];

   // loops through object to get value of each reason
   for (var reason in countObj) {
     // creates value var for reason
     var value = countObj[reason];
     // pushes key / value to sortable array
     sortable.push([reason, value]);
   }

   sortable.sort(function(a, b) {
     // sorts in descending order
     return b[1]-a[1];
   });

   // 3. Print to console

    // loops through the first ten reason (top ten)
   for ( i = 0; i<10; i++){
     var lineNumber = i+1;
     // logs line number, reason and quantity in console
     console.log(lineNumber + '. ' + sortable[i][0] +  '\noccured times: ' + sortable[i][1] + '\n');
  }

})
