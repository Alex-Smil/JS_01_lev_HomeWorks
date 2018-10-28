
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
    // console.log("src: " + src);

    // *** подставляем полученный src в значение аттрибута src="" из bigImage
    // изменения незамедлительно отобразаться в DOM на страничке
    bigImage.src = src;
}


window.onload = init;

// кун-фу прием от Михаила les 06
// вызов функции из анонимной функции
// for (let i = 0; i < images.length; i++) {
//     images[i].addEventListener("click", function() {
//         changeBigPicture(i, images[i].src);
//     });
// }