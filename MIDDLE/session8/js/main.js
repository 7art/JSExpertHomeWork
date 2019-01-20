"use strict";
var btn = document.getElementById("play");

function transform() {
  //вырезать 6-й элемент массива
  data.splice(5, 1);

  //В процессе создания нового массива объектов, избавьтесь от ключа id.
  var newData = [];
  data.forEach(function(item) {
    newData.push({
      url: item.url,
      name: item.name,
      params: {
        status: item.params.status,
        progress: item.params.progress
      },
      description: item.description,
      date: item.date
    });
  });

  //отобразить дату в виде «2015/07/02 14:15»
  var newDate = function(date) {
    var tmpDate = new Date(date);
    return (
      tmpDate.getFullYear() + "/" +
      tmpDate.getMonth() + "/" +
      tmpDate.getDate() + " " +
      tmpDate.getHours() + ":" +
      tmpDate.getMinutes()
    );
  };

  //получаем один объект из массива и преобразоваем его поля по заданным правилам
  let convertArray = newData.map(function(arrObject) {
    return {
      url: "http://" + arrObject.url,
      name: capitalize(arrObject.name),
      params: `${arrObject.params.status}=>${arrObject.params.progress}`,
      isVisible: arrObject.params.status,
      desc: cutString(arrObject.description),
      date = newDate(arrObject.date)
      //date: moment(arrObject.date).format("YYYY/MM/DD hh:mm")
    };
  });

  //filter, выбираем только те элементы у которых isVisible == true
  let filteredArr = convertArray.filter(arrObject => {
    return arrObject.isVisible === true;
  });

  printResult(4);

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
    console.log(newArr);
  }
}

btn.addEventListener("click", transform);