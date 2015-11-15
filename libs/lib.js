/* Brief

Basic pay: $10/hr
Overtime 1: $1.50/hr extra for hours beyond 8 in a day (weekdays)
Overtime 2: $2.50/hr extra for hours beyond 40 in any one week (weekdays)
Bonus 1: 125% for working on Friday (weekend only)
Bonus 2: 50% for working on Saturday (weekend only)

NB: Bonus hours doesn't mean overtime.

Input: will be 7 numbers separated by spaces.
Input Assumption: space separated means a string
*/

var config = require('../configs/config.js');

var strToArr = function(str) {
  var arr = [];

  try {
      arr = str.split(" ").map(Number);    
  } catch (ex) {
      console.error("Splitting of input failed due to the following error: ", ex.message);
  } finally {
      //Handling array that has less or more days data than expected
      //salary_calc function expects 7 days data
      //1) weekdays only, containing 5 working days data (data is right but less number of days)
      //2) containing more than 7 days data by mistake

      if(arr.length != 7) {
        while(arr.length < 7) arr.push(0); //add 0 for fri and sat
        while(arr.length > 7) arr.pop(); //remove more than 7 days data      
      }
  }

  return arr;
}

var isInputValid = function(inputArr){
  var isValid = true;
  
  inputArr.forEach(function(element, index, array) {
    if(isNaN(element) || element > 24)
      isValid = false;    
  })

  return isValid;
}

var salaryCalc = function(inputStr) {

  var inputArr = strToArr(inputStr);

  if(isInputValid(inputArr)) {

    var totalWeekdayHours = 0; 
    return Array.prototype.slice.call(inputArr).reduce(function(prevAccumulatedSalary, dayHoursWorked, dayNumber, weekArr) {
      
      if(dayNumber <= 4) {
        //prevAccumulatedSalary += (dayHoursWorked<=8) ? (dayHoursWorked*10) : ((dayHoursWorked*10)+((dayHoursWorked-8)*1.5));
        prevAccumulatedSalary += 
          (dayHoursWorked<=config.workingHoursDaily) ? (dayHoursWorked*config.basic) : ((dayHoursWorked*config.basic)+((dayHoursWorked-config.workingHoursDaily)*config.overtimeDaily));
        
        totalWeekdayHours += dayHoursWorked;

      } else if(dayNumber == 5) { // Friday 125% bonus Wohoo!

        //prevAccumulatedSalary += dayHoursWorked*(10+125/10); // (125 * 10)/100
        prevAccumulatedSalary += dayHoursWorked*(config.basic+(config.weekendBonusFri*config.basic)/100); // (125 * 10)/100

      } else { // if(dayNumber == 6) { // Saturday 50% bonus, not so celebrative but problem solving must be fun and satisfactory :)

        //prevAccumulatedSalary += dayHoursWorked*(10+50/10); // (50 * 10)/100
        prevAccumulatedSalary += dayHoursWorked*(config.basic+(config.weekendBonusSat*config.basic)/100); // (50 * 10)/100        

        //Apply weekly overtime if hours worked is beyond normal
        if(totalWeekdayHours > config.workingHoursWeekly) {
          //prevAccumulatedSalary += (totalWeekdayHours-40)*2.50;          
          prevAccumulatedSalary += (totalWeekdayHours-config.workingHoursWeekly)*2.50;
        }
      }

      return prevAccumulatedSalary;

    }, 0);
  } else {
    console.log('Invalid input, contains non-numeric elements');
    return 'NA';
  }

}

module.exports = {
  strToArr: strToArr,
  isInputValid: isInputValid,
  salaryCalc: salaryCalc
}