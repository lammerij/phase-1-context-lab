function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
  return {
    firstName: firstName,
    familyName: familyName,
    title: title,
    payPerHour: payPerHour,
    timeInEvents: [],
    timeOutEvents: [],
  };
}

function createEmployeeRecords(employees) {
  // console.log(employees)
  return employees.map((employee) => createEmployeeRecord(employee));
}

function createTimeInEvent(dateStamp) {
  // console.log(dateStamp)
  let hour = parseInt(dateStamp.split(" ")[1]);
  let date = dateStamp.split(" ")[0];
  this.timeInEvents.push({ type: "TimeIn", hour: hour, date: date });
  return this;
}

function createTimeOutEvent(dateStamp) {
  let hour = parseInt(dateStamp.split(" ")[1]);
  let date = dateStamp.split(" ")[0];
  this.timeOutEvents.push({ type: "TimeOut", hour: hour, date: date });
  return this;
}

function hoursWorkedOnDate(date) {
  let event = this.timeInEvents.find((event) => {
    return event.date === date;
  });
  let eventOut = this.timeOutEvents.find((eventOut) => {
    return eventOut.date === date;
  });
  return (eventOut.hour - event.hour) / 100;
}

function wagesEarnedOnDate(day) {
  //   console.log(day)
  let payRate = this.payPerHour;
  //   console.log('pay', payRate);
  let hoursWorked = hoursWorkedOnDate.call(this, day);
  //   console.log(hoursWorked)
  return payRate * hoursWorked;
}

function findEmployeeByFirstName(employees, firstName){
    console.log(employees)
   return employees.find((employee) => employee.firstName === firstName)
}

function calculatePayroll(employees) {
    console.log(employees);
    let allWages = employees.map((employee) => allWagesFor.call(employee));
    return allWages.reduce(
      (previousValue, currentValue) => previousValue + currentValue
    );
  }


/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
  const eligibleDates = this.timeInEvents.map(function (e) {
    return e.date;
  });

  const payable = eligibleDates.reduce(
    function (memo, d) {
      return memo + wagesEarnedOnDate.call(this, d);
    }.bind(this),
    0
  ); // <== Hm, why did we need to add bind() there? We'll discuss soon!

  return payable;
};
