const FIELD_SIZE_X = 22;    //Размер поля по оси Х
const FIELD_SIZE_Y = 17;    //Размер поля по оси Y

let gameIsRunning = false;  //Игра на старте не запущена

let snake = []; //Сама змейка
let snakeSpeed = 500;   //Скорость движения змейки
let snakeDirection = "y+";  //Текущее направление змейки
let snakeTimer; //Таймер змейки

let foodTimer;  //Таймер еды
let foodCreationSpeed = 1000;   //Скорость появления еды
let numberOfFood = [3, 0];  //Количество еды. 0 элемент-макс количество, 1 элемент - количество на поле

// my global vars,
let barrierCreationSpeed = 5000
// по аналогии с numberOfFood[]
let numberOfBarriers = [20, 0];

let score = 0;  //Очки

/**
 * Инициализация игрового пространства
 */
function init() {
    prepareGameField();

    //Обработчики на кнопки Старт и Новая игра
    document.getElementById("snake_start").addEventListener("click", startGame);
    document.getElementById("snake_renew").addEventListener("click", renewGame);

    //Событие-прослушка клавиатуры
    addEventListener("keydown", changeSnakeDirection);

    // ex 1 my func
    scoreViewer();
}

/**
 * Функция подготовки игрового поля
 */
function prepareGameField() {
    let gameTable = document.createElement("table");
    gameTable.setAttribute("class", "game-table");

    //Цикл генерирующий ячейки игрового поля
    for (let y = 0; y < FIELD_SIZE_Y; y++) {
        let row = document.createElement("tr");
        row.setAttribute("class", "game-table-row row-" + y);

        for (let x = 0; x < FIELD_SIZE_X; x++) {
            let cell = document.createElement("td");
            cell.setAttribute("class", "game-table-cell cell-" + x + "-" + y);

            row.appendChild(cell);
        }

        gameTable.appendChild(row);
    }

    document.getElementById("snake_field").appendChild(gameTable);
}

/**
 * Генерация змейки 
 * Змейка будет состоять из двух элементов (два блока - голова и туловище)
 * Змейка по центру
 * Класс ячейки змейки - snake-unit
 */
function respawn() {
    let startCoordX = Math.floor(FIELD_SIZE_X / 2);
    let startCoordY = Math.floor(FIELD_SIZE_Y / 2);

    let snakeHead = document.getElementsByClassName("cell-" + startCoordX + "-" + startCoordY)[0];
    let prevSnakeHeadAttr = snakeHead.getAttribute("class");
    snakeHead.setAttribute("class", prevSnakeHeadAttr + " snake-unit");

    let snakeTail = document.getElementsByClassName("cell-" + startCoordX + "-" + (startCoordY - 1))[0];
    let prevSnakeTailAttr = snakeTail.getAttribute("class");
    snakeTail.setAttribute("class", prevSnakeTailAttr + " snake-unit");

    //Добавляем в массив ссылки на ячейки хвоста и головы
    snake.push(snakeTail);
    snake.push(snakeHead);

}

function moveSnake() {
    if (gameIsRunning == true) {
        //Соберем классы головы змейки
        let snakeHeadClasses = snake[snake.length - 1].getAttribute("class").split(" ");
        //console.log(snakeHeadClasses);
        //Сдвигаем голову на 1
        let newUnit;    //Переменная новой ячейки для головы
        let snakeCoords = snakeHeadClasses[1].split("-");
        //console.log(snakeCoords);
        let coordX = parseInt(snakeCoords[1]);
        let coordY = parseInt(snakeCoords[2]);

        if (snakeDirection == "y+") {
            if((coordY + 1) == FIELD_SIZE_Y) {
                // coordY -= coordY;
                newUnit = document.getElementsByClassName("cell-" + coordX + "-" + (coordY - coordY))[0];
            } else {
                newUnit = document.getElementsByClassName("cell-" + coordX + "-" + (coordY + 1))[0];
            }
        } else if (snakeDirection == "y-") {
            if((coordY - 1) < 0) {
                newUnit = document.getElementsByClassName("cell-" + coordX + "-" + (coordY = FIELD_SIZE_Y - 1))[0];
            } else {
                newUnit = document.getElementsByClassName("cell-" + coordX + "-" + (coordY - 1))[0];
            }
        } else if (snakeDirection == "x-") {
            newUnit = document.getElementsByClassName("cell-" + (coordX - 1) + "-" + coordY)[0];
        } else if (snakeDirection == "x+") {
            newUnit = document.getElementsByClassName("cell-" + (coordX + 1) + "-" + coordY)[0];
        }

        //проверяем, что newUnit - это не часть змейки
        //также проверяем, что змейка не дошла до границы
        // *** + проверяем не наткнулись ли мы на барьер
        // console.log("newUnit.className = " + newUnit.className);
        if (!isSnakeUnit(newUnit) && newUnit != undefined && !isBarrier(newUnit)) {
            //Добавляем новую часть змейки
            newUnit.setAttribute("class", newUnit.getAttribute("class") + " snake-unit");
            snake.push(newUnit);
            

            //если змейка не ела, подчищаем хвост
		    if(!haveFood(newUnit)){
                let removeSnake = snake.splice(0, 1)[0];    //Находим удаляемый элемент
                // console.log("let removeSnake = snake.splice(0, 1)[0] = " + removeSnake.className);
                let classes = removeSnake.getAttribute("class").split(" ");
                //удаление маркирующего класса snake-unit
                removeSnake.setAttribute("class", classes[0] + " " + classes[1]);
                // console.log("removeSnake.setAttribute(\"class\", classes[0] + \" \" + classes[1]); = " + removeSnake.className);
            } else {
                numberOfFood[1]--;
            }
        } else {
            finishTheGame();
        }
    }
}

/**
 * Проверяем элемент на принадлежность змейке
 * @param array unit 
 */
function isSnakeUnit(unit){
	let check = false;
	
	if(snake.includes(unit)){
		check = true;
	}
	
	return check;
}

// ======
function isBarrier(newUnit) {
    newUnitClasses = newUnit.className.split(" ");
    if(newUnitClasses.includes("barrier-unit")) {
        alert("Вы наткнулись на барьер!!!")
        return true;
    }
    // console.log("поле чисто")
    return false;
    
}

/**
 * Функция размещения еды на поле
 */
function createFood() {
    if (numberOfFood[1] < numberOfFood[0]) {
        let foodCreated = false;
        while (!foodCreated) {
            //Выбираем случайную клетку
            let foodX = Math.floor(Math.random() * (FIELD_SIZE_X));
            let foodY = Math.floor(Math.random() * (FIELD_SIZE_Y));

            let foodCell = document.getElementsByClassName("cell-" + foodX + "-" + foodY)[0];
            let foodCellClasses = foodCell.getAttribute("class").split(" ");

            //Если тут нет змейки, то размещаем еду
            if (!foodCellClasses.includes("snake-unit")) {
                //ставим в выбранную ячейку едук
                foodCell.setAttribute("class", foodCellClasses.join(" ") + " food-unit");
                foodCreated = true;
                numberOfFood[1]++;
            }
        }
    }            
}

// my func - создание препятствий
function createBarrier() {
    console.log("внутри function createBarrier()");
    // если макс кол-во барьеров не превышено
    if(numberOfBarriers[1] < numberOfBarriers[0]) {
        let barrierCreated = false;
        console.log("if(numberOfBarriers[1] < numberOfBarriers[1])");
        while(!barrierCreated) {
            console.log("if(numberOfBarriers[1] < numberOfBarriers[1])");
            // находим случайные координаты
            let barrierX = Math.floor(Math.random() * (FIELD_SIZE_X));
            let barrierY = Math.floor(Math.random() * (FIELD_SIZE_Y));
    
            // определяем клетку на поле для дальнейшей вставки в нее барьера
            let barrierCell = document.getElementsByClassName("cell-" + barrierX + "-" + barrierY)[0];
            let barrierCellClasses = barrierCell.getAttribute("class").split(" ");
            console.log("barrierCellClass[0] = " + barrierCellClasses[0]);
    
            //Если тут нет змейки, то размещаем барьер
            if(!barrierCellClasses.includes("snake-unit")) {
                //ставим в выбранную ячейку барьер
                barrierCell.setAttribute("class", barrierCellClasses.join(" ") + " barrier-unit");
                console.log("barrierCell.className = " + barrierCell.className);
                barrierCreated = true;
                numberOfBarriers[1]++;
            }
        }
    
    }
    

}

/**
 * Проверяем встречу с едой
 */
function haveFood(unit){
	let check = false;
	
	let unitClasses = unit.getAttribute("class").split(" ");
	
	//змейка нашла еду
	if(unitClasses.includes("food-unit")){
		check = true;

		unit.setAttribute("class", unitClasses[0] + " " + unitClasses[1] + " " + unitClasses[3]);
		
		//создаём новую еду
        createFood();
        
        // создаем новое припятствие
        createBarrier();
		
		//увеличиваем очки
        score++;
        console.log("кол-во очков = " + score);
	}
	
	return check;
}

function changeSnakeDirection(e) {
    //console.log(e.keyCode);
    switch(e.keyCode) {
        case 38:    //Если нажата клавиша вверх
            if (snakeDirection != "y+") {
                snakeDirection = "y-";
            }
            break;
        case 39:    //Если нажата клавиша вправо
            if (snakeDirection != "x-") {
                snakeDirection = "x+";
            }
            break;
        case 40:    //Если нажата клавиша вниз
            if (snakeDirection != "y-") {
                snakeDirection = "y+";
            }
            break;
        case 37:    //Если нажата клавиша влево
            if (snakeDirection != "x+") {
                snakeDirection = "x-";
            }
            break;
    }
}

/**
 * Старт игры
 */
function startGame() {
    gameIsRunning = true;
    respawn();

    snakeTimer = setInterval(moveSnake, snakeSpeed);
    foodTimer = setInterval(createFood, foodCreationSpeed);   
    barrierTimer = setInterval(createBarrier, barrierCreationSpeed)
    
    // scoreViewer();
}

// Вывод очков в реальном времени, очки = длине змейки
 function scoreViewer() {
    let scoreDisplay = document.createElement("div");
    scoreDisplay.className = "scoreDisplay";
    scoreDisplay.innerHTML = score;

    let body = document.querySelector("body");
    body.appendChild(scoreDisplay);

    function refreshScoreViewer() {
        scoreDisplay.innerHTML = score;
    }

    setInterval(refreshScoreViewer, snakeSpeed);

 }

/**
 * Перезагрузки игры
 * */
function renewGame() {
    location.reload();
}

/**
 * Информация об остановке игры
 */
function finishTheGame() {
    gameIsRunning = false;

    alert("Игра окончена!\nдлина вашей змейки равна " + score);
}

window.onload = init;