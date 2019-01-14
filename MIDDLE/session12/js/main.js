(function() {
"use strict"
  let btn = document.getElementById("play"),
    firstBlock = document.querySelector("#first-line"),
    secondBlock = document.querySelector("#second-line"),
    thirdBlock = document.querySelector("#third-line"),
    typeSelector = document.getElementById("type-selector"),
    lineSelector = document.getElementById("line-selector");

  //получаем результирующий массив объектов
  let newData = [];
  data.forEach(function(item) {
    newData.push({
      url: item.url,
      name: item.name,
      description: item.description,
      date: item.date
    });
  });

  function init() {
    let sliceData,
      resultHTML = "";
    const firstGroup = document.querySelector(".first-group").classList;
    const secondGroup = document.querySelector(".second-group").classList;
    const thirdGroup = document.querySelector(".third-group").classList;

    //шаблон построения галлереи с помощю replace
    let replaceItemTemplate =
      '<div class="col-sm-3 col-xs-6">\
    <img src="http://$url" alt="$name" class="img-thumbnail">\
    <div class="info-wrapper">\
    <div class="text-muted">$name</div>\
    <div class="text-muted top-padding">$description</div>\
    <div class="text-muted">$date</div>\
    </div>\
    </div>';

    //метод replace
    function showGalUsingReplase(array) {
      array.forEach(item => {
        resultHTML += replaceItemTemplate
          .replace(/\$name/gi, item.name)
          .replace("$url", item.url)
          .replace("$description", cutString(item.description))
          .replace("$date",moment(item.date).format("YYYY/MM/DD hh:mm"));
      })
      firstBlock.innerHTML = resultHTML;
    }

    //метод для шаблонных строк
    function showGalUsingStrTpl(array) {    
      array.forEach(item => {
        resultHTML += `<div class="col-sm-3 col-xs-6">\
        <img src="http://${item.url}" alt="${item.name}" class="img-thumbnail">\
        <div class="info-wrapper">\
            <div class="text-muted">${item.name}</div>\
            <div class="text-muted top-padding">${cutString(item.description)}</div>\
            <div class="text-muted">${moment(item.date).format("YYYY/MM/DD hh:mm")}</div>\
        </div>\
        </div>`;
      })
      secondBlock.innerHTML = resultHTML;
    }

    //метод для CreateElement
    function showGalUsingCreateElem(array) {
      thirdBlock.innerHTML = "";       
      array.forEach(item => {          
        let div = document.createElement("div");
        div.className = "col-sm-3 col-xs-6";
        div.innerHTML = `<img src="http://${item.url}" alt="${item.name}" class="img-thumbnail">\
        <div class="info-wrapper">\
            <div class="text-muted">${item.name}</div>\
            <div class="text-muted top-padding">${cutString(item.description)}</div>\
            <div class="text-muted">${moment(item.date).format("YYYY/MM/DD hh:mm")}</div>\
        </div>`;
        thirdBlock.appendChild(div);
      })      
    }

    //обрезаем строку
    function cutString(str) {
      return (str.length >= 26) ? str.substring(0, 26) : str;
    }

    //выставляем нужные нам css класы
    function showOrHide() {
      arguments[0].remove("hide");  
      arguments[0].add("show");

      arguments[1].remove("show");
      arguments[1].add("hide");      
     
      arguments[2].remove("show");
      arguments[2].add("hide");  
    }

    //когда выбран один из авриантов
    if (Number(typeSelector.value) > 0) {
      //обрезаем результирующий массив
      switch (Number(lineSelector.value)) {
        case 0:
          sliceData = newData;    
          break;
        case 1:
          sliceData = newData.slice(0,3);
          break;
        case 2:
          sliceData = newData.slice(0,6);
          break;
      }      
      
      //прячем ненужные блоки и показываем галерею
      switch (Number(typeSelector.value)) {
        case 1:         
          showOrHide(firstGroup, secondGroup, thirdGroup);
          showGalUsingReplase(sliceData);
          break;
        case 2:          
          showOrHide(secondGroup, firstGroup, thirdGroup);
          showGalUsingStrTpl(sliceData);
          break;
        case 3:         
          showOrHide(thirdGroup, firstGroup, secondGroup);
          showGalUsingCreateElem(sliceData);
          break;
      }
    }
  }
  
  btn.addEventListener("click", init);
})();
