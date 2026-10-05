"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/ChatHub").build();


connection.on("Receive", function (type, val) {


    console.log(type);
    console.log(val);

   // li.textContent = `${user} says ${message}`;
});

connection.start().then(function () {
  
}).catch(function (err) {
    return console.error(err.toString());
});