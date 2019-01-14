(function() {
  "use strict";
  const todayDate = document.querySelectorAll(".today-date");
  const clock = document.querySelectorAll(".clock .number");

  let now = new Date();
  let nowDate = now.getDate();
  let newYear = new Date("jan,01,2020,00:00:00");
  let totalRemains = newYear.getTime() - now.getTime();
  let qtyFullDays = parseInt(totalRemains / 1000 / 60 / 60 / 24);

  function getWeekDay(date) {
    return [
      "воскресенье",
      "понедельник",
      "вторник",
      "среда",
      "черверг",
      "пятница",
      "суббота"
    ][date.getDay()];
  }

  function getMonthName(date) {
    return [
      "января",
      "февраля",
      "марта",
      "апреля",
      "мая",
      "июня",
      "июля",
      "августа",
      "сентября",
      "октября",
      "ноября",
      "декабря"
    ][date.getMonth()];
  }

  todayDate[0].innerHTML = `Сегодня ${getWeekDay(now)}, ${nowDate} ${getMonthName(now)}.`;

  todayDate[1].innerHTML = `До 2020 года осталось ${qtyFullDays} дней.`;  

  setInterval(function() {
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    if (hours < 10) hours = "0" + hours;
    if (minutes < 10) minutes = "0" + minutes;
    if (seconds < 10) seconds = "0" + seconds;
    // clock[0].innerHTML = hours + ":" + minutes + ":" + seconds;
    hours = String(hours);
    minutes = String(minutes);
    seconds = String(seconds);

    clock[0].innerHTML = hours[0];
    clock[1].innerHTML = hours[1];
    clock[2].innerHTML = minutes[0];
    clock[3].innerHTML = minutes[1];
    clock[4].innerHTML = seconds[0];
    clock[5].innerHTML = seconds[1];
    
  }, 1000);
})();
