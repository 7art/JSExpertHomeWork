(function () {
  "use strict";
  const btn = document.getElementById("play"),
    mainDiv = document.getElementById("mainGallery"),
    sortTypeSelectbox = document.getElementById("sort-type"),
    counter = document.querySelector("#counter");
  let hiddenGalleryItems = [];
  let displayedGalleryItems = [];

  //деактивируем/активируем кнопку
  function setToggleButton(array) {
    if (data.length === array.length) {
      btn.setAttribute("disabled", true);
      $(".bs-example-modal-sm").modal("show");
    } else {
      btn.removeAttribute("disabled");
    }
  }

  //проверяем localStorage на наличие sortType
  function setSortType() {
    let sortTypeFromStorage = localStorage.getItem("sortType");
    if (sortTypeFromStorage) {
      sortTypeSelectbox.value = sortTypeFromStorage;
    }
  }

  //сохранение информации в localStorage
  function setStorageData() {
    let sortType = +sortTypeSelectbox.value;
    localStorage.setItem("hData", JSON.stringify(hiddenGalleryItems));
    localStorage.setItem("sData", JSON.stringify(displayedGalleryItems));
    localStorage.setItem("sortType", sortType);
  }

  //получаем данные из localStorage если они там есть
  function getStorageData() {
    let hDataFromStorage = JSON.parse(localStorage.getItem("hData"));
    let sDataFromStorage = JSON.parse(localStorage.getItem("sData"));
    hiddenGalleryItems = !hDataFromStorage ? prepareData(data) : hDataFromStorage;
    if (sDataFromStorage) {
      displayedGalleryItems = sDataFromStorage;
      buildGallery(displayedGalleryItems);
    }

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

  //делаем первую букву большой, остальные маленькие
  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  //получаем результирующий массив объектов
  function prepareData(data) {
    return data.map(item => {
      return {
        url: addHttp(item.url),
        id: item.id,
        name: item.name,
        description: cutString(item.description),
        date: item.date
      };
    });
  }

  //формируем и отображаем галерею
  function buildGallery(array) {
    let resultHtml = "";
    array.forEach(item => {
      resultHtml += `<div class="col-md-3 col-sm-4 col-xs-6 text-center">
      <div class="thumbnail">
        <img src="${item.url}" alt="${item.name}"> 
        <div class="caption">
          <h3>${item.id}: ${item.name}</h3>
          <p>${item.description}</p\
          <p>${formatDate(item.date)}</p>
        </div>
        <button class="btn btn-danger" data-id="${item.id}">
        Удалить
        </button>
      </div>
    </div>`;
    });
    mainDiv.innerHTML = resultHtml;
    counter.innerHTML = array.length;
  }

  //сортируем массив объектов выбраным способом
  function sortData(data, value) {
    let sortedData = data.sort((a, b) => a.name.localeCompare(b.name));

    switch (value) {
      case 1:
        return sortedData.reverse();
      case 2:
        return data.sort((a, b) => Number(b.date) - Number(a.date));
      case 3:
        return data.sort((a, b) => Number(a.date) - Number(b.date));
      case 0:
      default:
        return sortedData;
    }
  }

  //при нажатии на btn берем один элемент из массива hiddenGalleryItems
  function addOneItem() {
    displayedGalleryItems = displayedGalleryItems.concat(
      hiddenGalleryItems.splice(0, 1)
    );
    setToggleButton(displayedGalleryItems);
    buildGallery(displayedGalleryItems);
  }

  //при нажатии на btn-danger удаляем один элемент из массива displayedGalleryItems
  function removeOneItem(e) {
    const movedItemId = +e.target.getAttribute("data-id");
    if (movedItemId) {
      let movedItem = displayedGalleryItems.filter(item => {
        return item.id === movedItemId;
      });
      hiddenGalleryItems = hiddenGalleryItems.concat(movedItem);
      displayedGalleryItems = displayedGalleryItems.filter(item => {
        return item.id !== movedItemId;
      });
      setToggleButton(displayedGalleryItems);
      buildGallery(displayedGalleryItems);
    }
  }
  //при изменении выбора в selectbox галерея перестраивается
  function sortItems() {
    let sortType = +sortTypeSelectbox.value;
    displayedGalleryItems = sortData(displayedGalleryItems, sortType);
    buildGallery(displayedGalleryItems);
  }

  getStorageData();
  setSortType();

  mainDiv.addEventListener("click", removeOneItem);
  btn.addEventListener("click", addOneItem);
  sortTypeSelectbox.addEventListener("change", sortItems);
  window.addEventListener("beforeunload", setStorageData);

})();