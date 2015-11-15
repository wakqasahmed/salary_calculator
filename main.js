var config = require('./configs/config.js');
var lib = require('./libs/lib.js');
var prompt = require('prompt');

console.log('Welcome to Salary Calculator.');
console.log('//=========================//');
console.log('To calculate weekly wage of an employee, follow the instructions below:');
console.log('');
console.log('Enter No. of Hours for each day separated by spaces, where week starts from Sunday.');
console.log('Example (S, M, T, W, T, F, S): 8 8 8 8 8 8 8');

prompt.start();
prompt.get('weekHoursWorked', function (err, result) {
  if (err) { return onErr(err); }

  main(result.weekHoursWorked);
});

function onErr(err) {
  console.log(err);
  return 1;
}

var main = function(weekHoursWorked) {
	console.log("Salary for the week: $" + lib.salaryCalc(weekHoursWorked));
}
