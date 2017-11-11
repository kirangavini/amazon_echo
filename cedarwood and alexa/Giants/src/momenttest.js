var moment = require('moment');
var date = new Date();
var today = (date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + date.getDate()).slice(-2));
var intentDate = today;
console.log(intentDate);
console.log(moment(intentDate).diff(moment(today)));



