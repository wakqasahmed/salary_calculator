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

var assert = require('assert');
var lib = require('../libs/lib.js');

describe('salaryCalc()', function() {
  var tests = [
    {
      args: "0 0 0 0 0",
      expectedSalary: 0,
      expectedDays: 7,
      expectedValidity: true,
      expectedSalaryMsg: "Null input test, with only weekdays input"
    }, //null input test with only weekdays input
    {
      args: "0 0 0 0 0 0 0 0 0",
      expectedSalary: 0,
      expectedDays: 7,
      expectedValidity: true,
      expectedSalaryMsg: "Null input test, with mistaken extra days input"
    }, //null input test with mistaken extra days input
    {
      args: "0 0 0 a 0 b 0",
      expectedSalary: 'NA',
      expectedDays: 7,
      expectedValidity: false,
      expectedSalaryMsg: "Null input test, with invalid characters"
    }, //null input test with invalid characters
    {
      args: "0 0 0 0 0 0 0",
      expectedSalary: 0,
      expectedDays: 7,
      expectedValidity: true,
      expectedSalaryMsg: "Null input test"
    }, //null input test
    {
      args: "24",
      expectedSalary: 264,
      expectedDays: 7,
      expectedValidity: true,
      expectedSalaryMsg: "Not null input test, with only Sunday worked hours mentioned"
    }, //Not null input test, with only Sunday worked hours mentioned   
    {
      args: "25 1 2 3 4 5 6",
      expectedSalary: 'NA',
      expectedDays: 7,
      expectedValidity: false,
      expectedSalaryMsg: "Wrong input test, 25 worked hours mentioned for a day"
    }, //wrong input test        
    {
      args: "-1 1 2 3 4 5 6",
      expectedSalary: 'NA',
      expectedDays: 7,
      expectedValidity: false,
      expectedSalaryMsg: "Wrong input test, -1 worked hours mentioned for a day"
    }, //wrong input test            
    {
      args: "8 8 8 8 8 0 0",
      expectedSalary: 400,
      expectedDays: 7,
      expectedValidity: true,
      expectedSalaryMsg: "Basic input test, total 40hrs weekdays, without overtime"
    }, //basic input test //40hrs=10*40 because $10/hr if <= 8hrs/day (weekday)
    {
      args: "8 9 7 8 8 0 0",
      expectedSalary: 401.5,
      expectedDays: 7,
      expectedValidity: true,
      expectedSalaryMsg: "Basic input test, total 41hrs (39+2) weekdays, with overtime"
    }, //basic input test with overtime //40hrs=(10*39)+(11.5*1)   $10+$1.5/hr if > 8hrs/day (weekday)
    {
      args: "8 8 8 8 8 8 0",
      expectedSalary: 580,
      expectedDays: 7,
      expectedValidity: true,
      expectedSalaryMsg: "Basic + Friday Bonus input test, 40hrs weekdays + 8hrs Friday"
    }, //basic + bonus input test //40hrs=10*40 + 8hrs=(10+(10/100*125))*8 because $10/hr + 125% if working on Friday
    {
      args: "8 8 8 8 8 0 8",
      expectedSalary: 520,
      expectedDays: 7,
      expectedValidity: true,
      expectedSalaryMsg: "Basic + Saturday Bonus input test, 40hrs weekdays + 8hrs Saturday"
    }, //basic + bonus input test //40hrs=10*40 + 8hrs=(10+(10/100*50))*8 because $10/hr + 50% if working on Saturday    
    {
      args: "8 8 8 8 8 8 8",
      expectedSalary: 700,
      expectedDays: 7,
      expectedValidity: true,
      expectedSalaryMsg: "Basic + Bonus input test, 40hrs Weekdays, 8hrs Friday & Saturday each"
    }, //basic + bonus input test //Weekdays, Friday & Saturday both   
    {
      args: "9 9 9 9 9 8 8",
      expectedSalary: 770,
      expectedDays: 7,
      expectedValidity: true,
      expectedSalaryMsg: "Basic + Overtime + Bonus input test, 45hrs Weekdays, 8hrs Friday & Saturday each"
    } //basic + overtime + bonus input test //Weekdays, Friday & Saturday both       
  ];

  tests.forEach(function(test) {

    it('has correct number of inputs, which is ' + lib.strToArr(test.args).length + ' elements (cleaning might have applied)', function() {
      console.log('============================================================');
      var res = lib.strToArr(test.args).length;
      assert.equal(res, test.expectedDays);
    });

    it('has correct type of inputs: ' + test.expectedValidity + '', function() {
      var res = lib.isInputValid(lib.strToArr(test.args));
      assert.equal(res, test.expectedValidity);
    });

    it(test.expectedSalaryMsg + ' | Input string: ' + test.args, function() {
      var res = lib.salaryCalc(test.args);
      assert.equal(res, test.expectedSalary);
    });

  });
});