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
    thirdGroup = document.querySelector(".third-group").classList,
    message = document.querySelector(".message");

  //метод replace
  function showUsingReplase(array) {
    let resultHTML = "";
    const replaceItemTemplate =
      '<div class="col-sm-3 col-xs-6">\
    <img src="$url" alt="$name" class="img-thumbnail">\
    <div class="info-wrapper">\
    <div class="text-muted">$name</div>\
    <div class="text-muted top-padding">$description</div>\
    <div class="text-muted">$date</div>\
    </div>\
    </div>';
    showBlock(firstGroup);
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
    showBlock(secondGroup);
    array.forEach(item => {
      resultHTML += `<div class="col-sm-3 col-xs-6">
        <img src="${item.url}" alt="${item.name}" class="img-thumbnail">
        <div class="info-wrapper">
            <div class="text-muted">${item.name}</div>
            <div class="text-muted top-padding">${item.description}</div>
            <div class="text-muted">${item.date}</div>
        </div>
        </div>`;
    });
    secondBlock.innerHTML = resultHTML;
  }

  //метод с использованием CreateElement
  function showUsingCreateElem(array) {
    thirdBlock.innerHTML = "";
    const fragment = document.createDocumentFragment();
    showBlock(thirdGroup);
    array.forEach(item => {
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

      let img = document.createElement("img");
      img.setAttribute("src", `${item.url}`);
      img.setAttribute("alt", `${item.name}`);
      img.className = "img-thumbnail";

      let div = document.createElement("div");
      div.className = "col-sm-3 col-xs-6";

      div.appendChild(img);
      div.appendChild(divWrapper);

      fragment.appendChild(div);
    });
    thirdBlock.appendChild(fragment);
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

  //показываем ненужные блоки
  function showBlock(block) {
    block.remove("hide");
    block.add("show");
  }

  //прячем ненужные блоки
  function hideBlock(...blocks) {
    blocks.forEach(item => {
      item.remove("show");
      item.add("hide");
    });
  }

  //выводим сообщение 
  function showMessage(block, message) {
    block.innerHTML = message;
    setTimeout(function() {
      block.innerHTML = "";
    }, 2500);
  }

  //получаем результирующий массив объектов
  function prepareData(data) {
    let limit;
    if (+lineSelector.value) limit = lineSelector.value * 3;
    if (limit) data = data.slice(0, limit);

    return data.map(item => {
      return {
        url: addHttp(item.url),
        name: item.name,
        description: cutString(item.description),
        date: formatDate(item.date)
      };
    });
  }

  function buildGallery() {
    hideBlock(firstGroup, secondGroup, thirdGroup);
    //message.innerHTML = "";
    const galleryData = prepareData(data);

    //показываем галерею
    switch (+typeSelector.value) {
      case 1:
        showUsingReplase(galleryData);
        break;
      case 2:
        showUsingStrTpl(galleryData);
        break;
      case 3:
        showUsingCreateElem(galleryData);
        break;
      case 0:
      default:
        showMessage(
          message,
          '<div class="alert alert-warning">Выберите один из вариантов отображения галереи!</div>'
        );
        //  setTimeout('alert(1)', 2000);
        break;
    }
  }

  btn.addEventListener("click", buildGallery);
})();
