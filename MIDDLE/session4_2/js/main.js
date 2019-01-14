(() => {
    'use strict';
    var btn = document.getElementById('play');
    function runGame() {
        var player1 = document.getElementById('player1');
        var player2 = document.getElementById('player2');
        var printRes = document.getElementById('result');
        var first, second, result;

        first = getPlayerResult();
        second = getPlayerResult();

        player1.innerHTML = getNameById(first);
        player2.innerHTML = getNameById(second);

        printRes.innerHTML = printResult(determineWinner(first, second));

        //генерируем рандомно 1-3
        function getPlayerResult() {
            return Math.floor(Math.random() * 3 + 1);
        }

        //принимаем число - возвращаем слово
        function getNameById(num) {
            switch (num) {
                case 1:
                    return 'камень'; //1                   
                case 2:
                    return 'ножницы'; //2                    
                case 3:
                   return 'бумага'; //3                    
            }          
        }

        //определяем победителя
        function determineWinner(first, second) {
            let winner;
            if (first == second) {
                winner = 0;
            } else if (
                (first == 1 && second == 2) ||
                ((first == 2 && second == 3) || (first == 3 && second == 1))
            ) {
                winner = 1; // Победа первого;
            } else {
                winner = 2; // Победа второго;
            }
            //console.log(winner);
            return winner;
        }

        //выводим результат в div Id result
        function printResult(id) {
            switch (id) {
                case 1:
                    return 'выиграл первый игрок';
                case 2:
                    return 'выиграл второй игрок';
                case 0:
                    return 'ничя';
            }
        }
    }
    btn.addEventListener('click', runGame);
})();
