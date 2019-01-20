(function() {
  "use strict";
  const btn = document.getElementById("play"),
    firstBlock = document.querySelector("#first-line"),
    secondBlock = document.querySelector("#second-line"),
    thirdBlock = document.querySelector("#third-line"),
    typeSelector = document.getElementById("type-selector"),
    lineSelector = document.getElementById("line-selector"),
    firstGroup = document.querySelector(".first-group").classList,
    secondGroup = document.querySelector(".second-group").classList,
    thirdGroup = document.querySelector(".third-group").classList;

  //шаблон построения галлереи с помощю replace
  let replaceItemTemplate =
    '<div class="col-sm-3 col-xs-6">\
    <img src="$url" alt="$name" class="img-thumbnail">\
    <div class="info-wrapper">\
    <div class="text-muted">$name</div>\
    <div class="text-muted top-padding">$description</div>\
    <div class="text-muted">$date</div>\
    </div>\
    </div>';

  //метод replace
  function showUsingReplase(array) {
    let resultHTML = "";
    showOrHide(firstGroup, secondGroup, thirdGroup);
    array.forEach(item => {
      resultHTML += replaceItemTemplate
        .replace(/\$name/gi, item.name)
        .replace("$url", item.url)
        .replace("$description", item.description)
        .replace("$date", item.date);
    });
    firstBlock.innerHTML = resultHTML;
  }

  //метод с использованием шаблонных строк
  function showUsingStrTpl(array) {
    let resultHTML = "";
    showOrHide(secondGroup, firstGroup, thirdGroup);
    array.forEach(item => {
      resultHTML += `<div class="col-sm-3 col-xs-6">\
        <img src="${item.url}" alt="${item.name}" class="img-thumbnail">\
        <div class="info-wrapper">\
            <div class="text-muted">${item.name}</div>\
            <div class="text-muted top-padding">${item.description}</div>\
            <div class="text-muted">${item.date}</div>\
        </div>\
        </div>`;
    });
    secondBlock.innerHTML = resultHTML;
  }

  //метод с использованием CreateElement
  function showUsingCreateElem(array) {
    let divResult = "";
    showOrHide(thirdGroup, firstGroup, secondGroup);
    array.forEach(item => {
      let divInner = document.createElement("div");
      let divWrapper = document.createElement("div");
      divWrapper.className = "info-wrapper";
      let divMutedFirst = document.createElement("div");
      divMutedFirst.className = "text-muted";
      divMutedFirst.appendChild(document.createTextNode(`${item.name}`));
      divWrapper.appendChild(divMutedFirst);
      let divMutedSecond = divMutedFirst.cloneNode();
      divMutedSecond.classList.add("top-padding");
      divMutedSecond.appendChild(
        document.createTextNode(`${item.description}`)
      );
      divWrapper.appendChild(divMutedSecond);
      let divMutedThird = divMutedFirst.cloneNode();
      divMutedThird.appendChild(document.createTextNode(`${item.date}`));
      divWrapper.appendChild(divMutedThird);
      let div = document.createElement("div");
      div.className = "col-sm-3 col-xs-6";
      let img = document.createElement("img");
      img.setAttribute("src", `${item.url}`);
      img.setAttribute("alt", `${item.name}`);
      img.className = "img-thumbnail";
      div.appendChild(img);
      div.appendChild(divWrapper);
      divInner.appendChild(div);
      divResult += divInner.innerHTML;
    });
    thirdBlock.innerHTML = divResult;
  }

  //обрезаем строку
  function cutString(str) {
    return str.length >= 26 ? str.substring(0, 26) : str;
  }

  //добавляем http
  function addHttp(str) {
    return str.startsWith("http://") ? str : "http://" + str;
  }

  //преобразование даты
  function formatDate(date) {
    return moment(date).format("YYYY/MM/DD HH:mm");
  }

  //прячем ненужные блоки
  function showOrHide() {
    arguments[0].remove("hide");
    arguments[0].add("show");

    arguments[1].remove("show");
    arguments[1].add("hide");

    arguments[2].remove("show");
    arguments[2].add("hide");
  }

  function init() {
    let sliceData,
      newData = [];

    //получаем результирующий массив объектов
    data.forEach(function(item) {
      newData.push({
        url: addHttp(item.url),
        name: item.name,
        description: cutString(item.description),
        date: formatDate(item.date)
      });
    });

    //обрезаем результирующий массив
    sliceData =
      Number(lineSelector.value) > 0
        ? newData.slice(0, lineSelector.value * 3)
        : newData;

    //показываем галерею
    switch (Number(typeSelector.value)) {
      case 1:
        showUsingReplase(sliceData);
        break;
      case 2:
        showUsingStrTpl(sliceData);
        break;
      case 3:
        showUsingCreateElem(sliceData);
        break;
      case 0:
      default:
        if (document.querySelector(".show")) {
          const classList = document.querySelector(".show").classList;
          classList.remove("show");
          classList.add("hide");
        }
        break;
    }
  }

  btn.addEventListener("click", init);
})();
