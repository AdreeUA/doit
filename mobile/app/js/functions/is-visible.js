module.exports = function($elem) {

    var elem = $elem.get(0),
        coords = elem.getBoundingClientRect(),
        windowHeight = document.documentElement.clientHeight;

    // верхняя граница elem в пределах видимости ИЛИ нижняя граница видима
    var topVisible = coords.top > 0 && coords.top < windowHeight,
        bottomVisible = coords.bottom < windowHeight && coords.bottom > 0;

    return topVisible || bottomVisible;

};
