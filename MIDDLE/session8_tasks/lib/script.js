let goods = ['foods', 'fruits', 'technics', 'phones', 'computers'];
let delElement = goods.splice(2, 1);
console.log(goods.join(', '));

var now = new Date();
console.log(`${now.getHours()}:${now.getMinutes()} ${now.getDate()}/${now.getMonth()}/${now.getFullYear()}`);

function getExt(path){
 // let arr = path.split(".");
  console.log(path.split(".")[1]);  
}
getExt("/home/user/project/script.js");

// [1, 2, 4, 5, 7, 8, 3, 6]
var arr = [1, 2, 2, 4, 5, 4, 7, 8, 7, 3, 6];

function sort(arr){ 
 let test = arr.filter(function (elem, pos, arr) {
    return pos == arr.indexOf(elem) || pos !== arr.lastIndexOf(elem);   
  });
  return test;
}
console.log(sort(arr));