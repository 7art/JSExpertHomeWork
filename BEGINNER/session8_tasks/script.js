
let elemResult = document.getElementById('result');

// exercise 1

for (var i = 1; i <= 7; i++) {
     elemResult.innerHTML += 'Квадрат ' + i + ' = ' + i*i + '<br>';
}

// exercise 2

elemResult.innerHTML += "<br>";

for (var i = 1; i <= 15; i++) {
    if (i % 2 == 0) {
        elemResult.innerHTML += 'Число ' + i + ' Четное;<br>';
    } else {
        elemResult.innerHTML += 'Число ' + i + ' Нечетное;<br>';
    }    
}

elemResult.innerHTML += "<br>";

var i = 1;
while (i <= 15) {
    if (i % 2 == 0) {
        elemResult.innerHTML += 'Число ' + i + ' Четное;<br>';
    } else {
        elemResult.innerHTML += 'Число ' + i + ' Нечетное;<br>';
    } 
    i++;
}

elemResult.innerHTML += "<br>";

var enumeration = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
for (var value of enumeration) {
    if (value & 1) {
        elemResult.innerHTML += 'Число ' + value + ' Четное;<br>';
    } else {
        elemResult.innerHTML += 'Число ' + value + ' Нечетное;<br>';
    } 
}

elemResult.innerHTML += "<br>";

// exercise 3

for (var i = 100; i >= 0; i-=10) {
    if (i == 30 || i == 70 || i == 90) {
        continue;
    }
    elemResult.innerHTML += 'Число: <b>' + i + '</b><br>';
}
  
