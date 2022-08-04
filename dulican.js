//A - We can represent the data into an array like this
var employeeOne = [
  //monday
  //checkin @3:20 missed 50 minutes i.e
  //checkout @10:50 missed 40 minutes
  //monday total = 90 minutes missed
  {
    "id": 1,
    "checkin": "2022-08-01 09:20",
    "checkout": "2022-08-01 16:50"
  },
  //tuesday
  //checkin @2:40 missed 10 minutes
  //checkout @11:25 missed 25 minutes
  //tuesday total = 35 minutes missed
  {
    "id": 2,
    "checkin": "2022-08-02 08:40",
    "checkout": "2022-08-02 17:05"
  },
  // //sunday will not be calculated 
  {
    "id": 3,
    "checkin": "2022-07-31 08:30",
    "checkout": "2022-07-31 17:30"
  },
  //saturday check out is @12:30
  //checkin @3:10 missed 40 minutes
  //checkout @5:45 missed 45 minutes
  //saturday total = 85 minutes missed
  {
    "id": 4,
    "checkin": "2022-07-30 09:10",
    "checkout": "2022-07-30 11:45"
  }
]


var missedTotal = calculateMinutes(employeeOne);

console.log("Employee missed " + missedTotal + " minutes!");

//B - function that will calculate the amount of minutes each employee missed using the array ..
function calculateMinutes(employee) {
  var missedMinutes = 0;
  var missedHours = 0;
  var totalHours = 0;
  var totalMinutes = 0;

  var actualCheckInHours = "8"; // i.e 2 o'clock
  var actualCheckOutHours = "17"; //i.e 11 o'clock
  var actualCheckOutHoursSat = "12"; // i.e 6 o'clock for saturday
  var actualCheckInOutMinutes = "30"; // i.e 30 minutes for all check in and outs


  employee.forEach(data => {
    var checkin = new Date(data.checkin);
    var checkout = new Date(data.checkout);

    missedHours = 0;
    missedMinutes = 0;

    //if sunday no operation otherwise go inside if
    if (checkin.getDay() != 0 || checkout.getDay() != 0) {
      //if the day is saturday
      if (checkin.getDay() == 6) {
        if (checkin.getHours() > actualCheckInHours) {
          if (checkin.getMinutes() > 30)
            missedHours += checkin.getHours() - actualCheckInHours;
          missedMinutes += 30 + checkin.getMinutes();
        }
        if (checkin.getMinutes() > actualCheckInOutMinutes) {
          missedMinutes += checkin.getMinutes() - actualCheckInOutMinutes;
        }
        if (checkout.getHours() < actualCheckOutHoursSat) {
          if (checkout.getMinutes() < 30)
            missedHours += actualCheckOutHoursSat - checkout.getHours();
          missedMinutes += 90 - checkout.getMinutes();
        }
        if (checkout.getMinutes() < actualCheckInOutMinutes) {
          missedMinutes += actualCheckInOutMinutes - checkout.getMinutes();
        }
      }
      //if it is b/n monday to friday
      else {
        if (checkin.getHours() > actualCheckInHours) {
          if (checkin.getMinutes() > 30)
            missedHours += checkin.getHours() - actualCheckInHours;
          missedMinutes += 30 + checkin.getMinutes();
        }
        if (checkin.getMinutes() > actualCheckInOutMinutes) {
          missedMinutes += checkin.getMinutes() - actualCheckInOutMinutes;
        }
        if (checkout.getHours() < actualCheckOutHours) {
          if (checkout.getMinutes() < 30)
            missedHours += actualCheckOutHours - checkout.getHours();
          missedMinutes += 90 - checkout.getMinutes();
        }
        if (checkout.getMinutes() < actualCheckInOutMinutes) {
          missedMinutes += actualCheckInOutMinutes - checkout.getMinutes();
        }
      }
    }

    totalHours += missedHours;
    totalMinutes += missedMinutes;
  });

  return (totalHours * 60) + totalMinutes;
}