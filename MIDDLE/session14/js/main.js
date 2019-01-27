(function() {
  "use strict";
  const btn = document.getElementById("play"),
    mainDiv = document.getElementById("mainGallery"),
    typeSelector = document.getElementById("sort-type"),
    counter = document.querySelector("#counter"),
    message = document.querySelector(".message");
  let hiddenGalleryItems = prepareData(data);
  let displayedGalleryItems = [];

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

  //выводим сообщение
  function showMessage(block, message) {
    block.innerHTML = message;
    setTimeout(function() {
      block.innerHTML = "";
    }, 2500);
  }

  //формируем и отображаем галерею
  function buildGallery(array) {
    let resultHtml = "";
    toggleButton(array);
    array.forEach(item => {
      resultHtml += `<div class="col-md-3 col-sm-4 col-xs-6 text-center">
      <div class="thumbnail">
        <img src="${item.url}" alt="${item.name}"> 
        <div class="caption">
          <h3>${item.id}: ${item.name}</h3>
          <p>${item.description}</p\
          <p>${item.date}</p>
        </div>
        <button class="btn btn-danger" >
        Удалить
        </button>
      </div>
    </div>`;
    });
    mainDiv.innerHTML = resultHtml;
    counter.innerHTML = array.length;
  }

  //получаем результирующий массив объектов
  function prepareData(data) {
    // let limit;
    // if (+lineSelector.value) limit = lineSelector.value * 3;
    // if (limit) data = data.slice(0, limit);

    return data.map(item => {
      return {
        url: addHttp(item.url),
        id: item.id,
        name: item.name,
        description: cutString(item.description),
        date: formatDate(item.date)
      };
    });
  }

  //деактивируем/активируем кнопку
  function toggleButton(array) {
    if (data.length === array.length) {
      btn.setAttribute("disabled", true);
    } else {
      btn.removeAttribute("disabled");
    }
  }

  //при нажатии на btn показываем один элемент из массива hiddenGalleryItems
  function showOneItem() {
    //добавляем первый обьэкт из массива hiddenGalleryItems в массив displayedGalleryItems
    displayedGalleryItems = displayedGalleryItems.concat(
      hiddenGalleryItems.splice(0, 1)
    );

    buildGallery(displayedGalleryItems);
  }

  //при нажатии на btn удаляем один элемент из массива displayedGalleryItems
  function removeOneItem(e) {
    //console.log(e.target.parentElement.childNodes[1].src);
    const targetNode = e.target.parentElement.childNodes[1].src; 
    // находим объєкт с помощью атрибута src в массиве displayedGalleryItems 
    let findItem = displayedGalleryItems.filter(item => {
      return item.url === targetNode; 
    });
    // добавляєм его в массив hiddenGalleryItems
    hiddenGalleryItems = hiddenGalleryItems.concat(findItem); 

    //удаляем объєкт из массива displayedGalleryItems
    displayedGalleryItems = displayedGalleryItems.filter(item => {
      return item.url !== targetNode;
    });

    buildGallery(displayedGalleryItems);
  }

  mainDiv.addEventListener("click", removeOneItem);
  btn.addEventListener("click", showOneItem);
})();
