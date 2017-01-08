module.exports = {
    init: function() {
        window.viewportUnitsBuggyfill.init({
            hacks: window.viewportUnitsBuggyfillHacks
        });
        svg4everybody();
    }
};
