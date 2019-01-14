'use strict';

function shortString(str) {
     return (str.length >= 15) 
                ? str.substring(0, 15) + "..."       
                : str;  
}

console.log(shortString("Создайте функцию, возвращающую слово «ворона» в правильной форме в зависимости от переданого числа n. Например: На ветке сидит 1 ворона; На ветке сидит 4 вороны; На ветке сидит 26 ворон."));


function getRaven (num){ 
    let letter;
    if(num>4 && num<21){
        letter = "";      
    }else{
        switch (num%10){
            case 1:
                letter = "a";
                break;
            case 2:
            case 3:
            case 4:
                letter = "ы";
                break;
            default:
                letter = "";
                break;
        }  
    }  
  return "ворон"+letter;
}

for (let index = 0; index < 40; index++) {
    console.log("на дереве " + index + "  " + getRaven(index));    
}
console.log("на дереве 1253 "  + getRaven(1253));

function isLeapYear (val) {
  let value = (typeof val !== 'number')
        ? Number(val)
        : val;

  if(!isNaN(value)){
      if(value %4 === 0){
        if (value % 100 === 0){
          if(value % 400 === 0){
            return true;
          } else {
            return false;
          }
        } else {
          return true;
        }    
      }else{
        return false;
      }
  } else { 
    return "Error - year is not found";
  }
}


console.log(isLeapYear(2016));  //true
console.log(isLeapYear(2100));  //false
console.log(isLeapYear(2012)); //true
console.log(isLeapYear());    //Error - year is not found
console.log(isLeapYear("2020"));
console.log(isLeapYear("2040year"));
