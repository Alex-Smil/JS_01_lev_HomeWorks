
function init() {
    // *** извлекаем картиники из галлерии в массив
    let galleryImages = document.getElementsByClassName("b-gallery__image"); 

    // *** вешаем на каждую картинку addEventListener();
    for(let i = 0 ; i < galleryImages.length; i++) {
        galleryImages[i].addEventListener("click", changeBigPicture);
    }
} 

function changeBigPicture(eventObj) {
    // *** извлекаем bigImage для дальнейшей подмены её src
    let bigImage = document.querySelector(".b-gallery__bigImage");

    // *** воспользуемся фитчей js, при наступлении события в changeBigPicture по умолчанию
    // передается неявный аргумент eventObj (назвать можно как угодно) в котором хранится ссылка на объект вызвавший это событие
    // извлекаем сам объект вызвавший событие через св-во target объекта eventObj
    let smallImage = eventObj.target;
    // console.log("eventObj.target" + eventObj.target);

    // *** извлекаем нужные данные из него, нам нужен src
    let src = smallImage.src;

    // **********  ex 1 tester ***********
    // ;-) blue fatalitist
    // src = undefined;
    // ***********************************

    if(isExistImage(src)) {
        // *** подставляем полученный src в значение аттрибута src="" из bigImage
        // изменения незамедлительно отобразаться в DOM на страничке
        bigImage.src = src;
    } else {
        // если картинки нет выводим предупреждение
        // шутками-шутками, а модальное окно или вставку спец Img в этом случае доделать.
        blueFatality();
    }
}

// **********  ex 1 tester ***********
// вспомогательная func определяет существует ли картинка по указанному src
function isExistImage(src) {
    if(src == undefined || src == null) {
        return false;
    }
    console.log("Все ок");
    console.log("smallImage.src = " + src);
    return true;
}
// ***********************************


// ;-) blue fatalitist
function blueFatality() {
    let body = document.querySelector("body");
    let firstBlock = document.querySelector(".b-header");
    let image = document.createElement("img");
    image.className = "blueFatalityImg";
    image.src = "images/blueFatality.png";
    body.insertBefore(image, firstBlock);
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
