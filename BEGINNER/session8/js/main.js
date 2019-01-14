var total = 0, first, second;
let elemResult = "";

for (var i = 1; i <= 15; i++) {
    first = Math.floor((Math.random() * 6) + 1); 
    second = Math.floor((Math.random() * 6) + 1); 

    if (i == 8 || i == 13) {
        continue;
    }

    elemResult += "Первая кость: " + first + " - Вторая кость: " + second + "<br>";

    if (first === second) {
        elemResult += "Выпал дубль. Число <" + first + "> <br>";
    }
    
    if ((first < 3 && second > 4) || (first > 4 && second < 3)) {
        
        elemResult += "Большой разброс между костями. Разница составляет " + Math.abs(second - first) + "<br>";
    }

    total += first + second;
}

elemResult += (total > 100) 
        ? "<b>Победа, вы набрали " + total + " очков</b>" 
        : "<u>Вы проиграли, у вас " + total + " очков</u>";
        
document.getElementById('result').innerHTML = elemResult;