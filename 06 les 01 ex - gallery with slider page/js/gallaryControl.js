
// ******** Глобальные переменные **********
let globIndexImg = 1;
let delay = 2000;
let loopInterval;







function init() {
    // *** извлекаем картиники из галлерии в массив
    let galleryImages = document.getElementsByClassName("b-gallery__image"); 

    // *** вешаем на каждую картинку addEventListener();
    for(let index = 0 ; index < galleryImages.length; index++) {
        galleryImages[index].addEventListener("click", function() {
            changeBigPicture(galleryImages[index], index);
        });
    }

    setInterval(avtoChangeBigPicture, delay, galleryImages);

    // инициализация обработчика кнопок changeBigPictureByButton(evevntObj)
    let prevButton = document.querySelector(".prevButton");
    let nextButton = document.querySelector(".nextButton");
    prevButton.addEventListener("click", changeBigPictureByButton);
    nextButton.addEventListener("click", changeBigPictureByButton);

} 

// change image in loop
// создает псевдо объект для avtoChangeBigPicture и вызывает её
function avtoChangeBigPicture(galleryImages) {
    // псевдообъект для 
    // задаем литералом
    // let psevdoImg = galleryImages[globIndexImg];
    changeBigPicture(galleryImages[globIndexImg], globIndexImg);
    globIndexImg++;
    if(globIndexImg >= galleryImages.length) {
        globIndexImg = 0;
    }
}

function changeBigPicture(eventObj, index) {

    // *** извлекаем bigImage для дальнейшей подмены её src
    let bigImage = document.querySelector(".b-gallery__bigImage");

    // *** воспользуемся фитчей js, при наступлении события в changeBigPicture по умолчанию
    // передается неявный аргумент eventObj (назвать можно как угодно) в котором хранится ссылка на объект вызвавший это событие
    // извлекаем сам объект вызвавший событие через св-во target объекта eventObj
    // let smallImage = eventObj.target;
    // console.log("eventObj.target" + eventObj.target);

    // *** извлекаем нужные данные из него, нам нужен src
    // let src = smallImage.src;
    let src = eventObj.src;

    // **********  ex 1 tester ***********
    // ;-) blue fatalitist
    // src = undefined; 
    // ***********************************
    if(!isExistImage(src)) {
        // если картинки нет выводим предупреждение
        // шутками-шутками, а модальное окно или вставку спец Img в этом случае доделать.
        blueFatality();
    }
    
    // *** подставляем полученный src в значение аттрибута src="" из bigImage
    // изменения незамедлительно отобразаться в DOM на страничке
    bigImage.src = src;
    // indexImg = // узнат под каким индексом эта картинка в galleryImages !!!!
    globIndexImg = index;
}

// ex 1 tester
// вспомогательная func определяет существует ли картинка по указанному src
function isExistImage(src) {
    if(src == undefined || src == null) {
        return false;
    }
    console.log("Все ок");
    console.log("smallImage.src = " + src);
    return true;
}


// ;-) blue fatalitist
function blueFatality() {
    let body = document.querySelector("body");
    let firstBlock = document.querySelector(".b-header");
    let image = document.createElement("img");
    image.className = "blueFatalityImg";
    image.src = "images/blueFatality.png";
    body.insertBefore(image, firstBlock);
}



// обработчик кнопок prevSlide и nextSlide
function changeBigPictureByButton(evevntObj) {
    let prevButton, nextButton;
    tmpButton = evevntObj.target;
    if(tmpButton.className == "prevButton") {
        prevButton = tmpButton;
    } else {
        nextButton = tmpButton;
    }
}







window.onload = init;




// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// кун-фу прием от Михаила les 06
// вызов функции из анонимной функции
// for (let i = 0; i < images.length; i++) {
//     images[i].addEventListener("click", function() {
//         changeBigPicture(i, images[i].src);
//     });
// }
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
