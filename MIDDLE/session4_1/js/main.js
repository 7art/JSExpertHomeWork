(function run() {
    'use strict';
    let total = 0,
        first,
        second,
        resultStr = '';

    for (var i = 0; i <= 15; i++) {
        if (i === 8 || i === 13) continue;

        first = getRndNumber();
        second = getRndNumber();

        isTotal(first, second);

        setResult(
            '<br> Первая кость: ' + first + ' - Вторая кость: ' + second + ' '
        );

        isNumbersEqual(first, second);

        isBigDifference(first, second);
    }

    total > 100
        ? setResult('<br><b>Победа, вы набрали ' + total + ' очков</b>')
        : setResult('<br><b>Вы проиграли, у вас ' + total + ' очков</b>');

    printResult(resultStr);

    //генерация случайных чисел
    function getRndNumber() {
        return Math.floor(Math.random() * 6 + 1);
    }

    //склеивание строк
    function setResult(str) {
        resultStr += str;
        // return resultStr;
    }

    // проверка дублей
    function isNumbersEqual(first, second) {
        if (first === second) {
            setResult(' => [ Выпал дубль. Число <' + first + '> ]');
        }
    }

    // определение разницы
    function isBigDifference(first, second) {
        if ((first < 3 && second > 4) || (first > 4 && second < 3)) {
            setResult(
                ' => [ Большой разброс между костями. Разница составляет <' +
                    Math.abs(second - first) +
                    '> ]'
            );
        }
    }

    // определение результата total
    function isTotal(first, second) {
        total += first + second;
    }

    // печатаем результат
    function printResult(result) {
        return (document.getElementById('result').innerHTML = result);
    }
})();
