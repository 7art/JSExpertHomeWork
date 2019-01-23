"use strict";
var btn = document.getElementById("play");
let copyData = [...data];
let delField = "id";
let numObjInPrintResult = 4;

//удаляем 6-й элемент массива
let deleteSixthEl = (item, itemNum) => {
  return itemNum !== 5;
};

//удаляем id из масива
let deleteIdFromData = item => {
  let keyArr = Object.keys(item);
  let newObj = {};
  keyArr.forEach(key => {
    if (key !== delField) {
      newObj[key] = item[key];
    }
  });
  return newObj;
};

//получаем один объект из массива и преобразоваем его поля по заданным правилам
let convertArr = item => {
  return {
    url: addHttp(item.url),
    name: capitalize(item.name),
    params: `${item.params.status}=>${item.params.progress}`,
    isVisible: item.params.status,
    desc: cutString(item.description),
    date: moment(item.date).format("YYYY/MM/DD HH:mm")
  };
};

//выбираем только те элементы у которых isVisible == true
let filteredArr = item => item.isVisible;

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
function printResult(arr, count) {
  if (count > arr.length) {
    count = arr.length;
  }
  let newArr = [];
  for (let i = 0; i < count; i++) {
    newArr.push(arr[i]);
  }
  console.table(newArr);
  //console.log(newArr);
}

function transform() {

  //преобразовываем массив объектов
  let resultArr = copyData
    .filter(deleteSixthEl)
    .map(deleteIdFromData)
    .map(convertArr)
    .filter(filteredArr);

  //Полученный результат печатаем в консоль, количество элементов в результате
  //должно быть не два а сколько укажете в переменной
  printResult(resultArr, numObjInPrintResult);
}

btn.addEventListener("click", transform);
