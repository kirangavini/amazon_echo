function getDateTime() {

    var date = new Date();

    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;

    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;

    var sec  = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;

    var year = date.getFullYear();

    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;

     return year + ":" + month + ":" + day + ":" + hour + ":" + min + ":" + sec;

}
var x = getDateTime();
var arr = x.split(":");
var m = new Date();
var monthbyname = new Array(12);
monthbyname[1] = "january";
monthbyname[2] = "febraury";
monthbyname[3] = "march";
monthbyname[4] = "april";
monthbyname[5] = "may";
monthbyname[6] = "june";
monthbyname[7] = "july";
monthbyname[8] = "august";
monthbyname[9] = "september";
monthbyname[10] = "october";
monthbyname[11] = "november";
monthbyname[12] = "december";



var month = monthbyname[m.getMonth()+1];
    

    console.log(month);



var d = new Date();
var weekday = new Array(7);
weekday[0] =  "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";

var day = weekday[d.getDay()];
console.log(day);

function getSeason() {
    var q = new Date();
    var month = q.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;
    season = '';
    switch(month) {
        case '12':
        case '01':
        case '02':
            season = 'winter';
        break;
        case '03':
        case '04':
        case '05':
            season = 'spring';
        break;
        case '06':
        case '07':
        case '08':
            season = 'summer';
        break;
        case '09':
        case '10': 
        case '11':
            season = 'fall';
        break;
    }
    return season;
}

console.log(getSeason());


var wifiLocation = require('wifi_location')

wifiLocation.wifiTowers(function(err, val) {
    console.log(err, val)
})

wifiLocation.location(function(err, val) {
    console.log(err, val)
})
