function createEmployeeRecord (employee) {
    //[firstName, familyName, title, payPerHour] = employee
    return {
        firstName: employee[0],       //bc firstName is a value that is the same as the key, you can jsut put a ','
        familyName: employee[1],
        title: employee[2],
        payPerHour: employee[3],
        timeInEvents: [],
        timeOutEvents: []
    }

}

function createEmployeeRecords (employees) {
        return employees.map(employee => createEmployeeRecord(employee))
    
    }
    

function createTimeInEvent(event) {
    let [date, hour] = event.split(' ');
    this.timeInEvents.push({
        type: 'TimeIn',
        hour:parseInt(hour),
        date,
    })
   return this
}

function createTimeOutEvent(event){
    let [date,hour] = event.split(' ')
    
    this.timeOutEvents.push({
         type: 'TimeOut',
         hour:parseInt(hour),
         date:date,
    })
    return this
}

function hoursWorkedOnDate(date) {
    const timeIn = this.timeInEvents.find(event => event.date ===date)
    const timeOut = this.timeOutEvents.find(event => event.date ===date)
    
    return (timeOut.hour-timeIn.hour)/100
}

// function wagesEarnedOnDate(date) {
//     const hours = hoursWorkedOnDate(this, date)*this.payPerHour
//    // console.log('look here', employee.payPerHour)
//     return hours
// }

let wagesEarnedOnDate = function(dateSought){
    let rawWage = hoursWorkedOnDate.call(this, dateSought)
        * this.payPerHour
    return parseFloat(rawWage.toString())
}

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function findEmployeeByFirstName(collection, firstNameString) {
    return collection.find(employee => employee.firstName === firstNameString)
}

function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce(function(currentValue, total) {
        return allWagesFor.call(total) + currentValue
    },0)
}

