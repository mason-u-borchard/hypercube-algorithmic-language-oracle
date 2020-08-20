var fs = require('fs');
var request = require('request');
const path = require('path');

// import path from 'path';
// import request from 'request';
// import fs from 'node-fs';



  fs.exists(path.join('src/database', 'express-bytes.txt'), function (exists) {

  // fs.exists(path.resolve(__dirname, 'express-bytes.txt'), function (exists) {
    if(!exists){
        fs.createWriteStream(path.join('src/database', 'express-bytes.txt'), (err) => {
          if (err) {
            throw err;
          }
        })
    }
    setInterval(function(){
      var bitArr = [];
      for (var i = 0; i < 8; i++){
        bitArr.push(Math.floor(Math.random() * Math.floor(2)));
        }
        console.log(bitArr);
        // res.send(bitArr);
        fs.appendFile('src/database/express-bytes.txt', bitArr + '\n', (err) => {
          if (err) {
            throw err
          }
        });
    }, 1000)
  });


