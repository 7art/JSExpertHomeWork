"use strict";
var btn = document.getElementById("play");
let copyData = [...data];
let delField = "id";

//удаляем 6-й элемент массива
let deleteSixthEl = item => {
  return item.id !== 6;
};

//удаляем id из масива
let deleteIdFromData = item => {
  let keyArr = Object.keys(item);
  let newArr = {};
  keyArr.forEach(key => {
    if (key !== delField) {
      newArr[key] = item[key];
    }
  });
  return newArr;
};

//получаем один объект из массива и преобразоваем его поля по заданным правилам
let convertArray = item => {
  return {
    url: addHttp(item.url),
    name: capitalize(item.name),
    params: `${item.params.status}=>${item.params.progress}`,
    isVisible: item.params.status,
    desc: cutString(item.description),
    date: moment(item.date).format("YYYY/MM/DD HH:mm")
  };
};

//filter, выбираем только те элементы у которых isVisible == true
let filteredArr = copyData
  .filter(deleteSixthEl)
  .map(deleteIdFromData)
  .map(convertArray)
  .filter(item => item.isVisible);

//добавляем http
function addHttp(str) {
  return str.startsWith("http://") ? str : "http://" + str;
}

//делаем первую букву большой, остальные маленькие
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

//обрезаем до 15 символов и добавляем многоточие (…)
function cutString(str) {
  return str.length >= 15 ? str.substring(0, 15) + "..." : str;
}

//полученный результат печатаем в консоль.
function printResult(count = filteredArr.length) {
  let newArr = [];
  for (let i = 0; i < count; i++) {
    newArr.push(filteredArr[i]);
  }
  console.table(newArr);
  //console.log(newArr);
}

function transform() {
  //Полученный результат печатаем в консоль,количество элементов в результате 
  //должно быть не два а сколько укажете в переменной
  printResult(3);
}

btn.addEventListener("click", transform);
