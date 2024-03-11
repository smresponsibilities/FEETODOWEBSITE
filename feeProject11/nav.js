function test() {
    var tabsNewAnim = document.getElementById('mainContent');
    var selectorNewAnim = tabsNewAnim.querySelectorAll('li').length;
    var activeItemNewAnim = tabsNewAnim.querySelector('.active');
    var activeWidthNewAnimHeight = activeItemNewAnim.offsetHeight;
    var activeWidthNewAnimWidth = activeItemNewAnim.offsetWidth;
    var itemPosNewAnimTop = activeItemNewAnim.offsetTop;
    var itemPosNewAnimLeft = activeItemNewAnim.offsetLeft;
    var navlist = document.querySelector('.nav-list');

    navlist.style.top = itemPosNewAnimTop + "px";
    navlist.style.left = itemPosNewAnimLeft + "px";
    navlist.style.height = activeWidthNewAnimHeight + "px";
    navlist.style.width = activeWidthNewAnimWidth + "px";

    tabsNewAnim.addEventListener("click", function (e) {
        var target = e.target;
        if (target.tagName === 'A') {
            var activeItems = tabsNewAnim.querySelectorAll('.active');
            activeItems.forEach(function (item) {
                item.classList.remove("active");
            });
            target.parentElement.classList.add('active');

            var activeWidthNewAnimHeight = target.offsetHeight;
            var activeWidthNewAnimWidth = target.offsetWidth;
            var itemPosNewAnimTop = target.offsetTop;
            var itemPosNewAnimLeft = target.offsetLeft;

            navlist.style.top = itemPosNewAnimTop + "px";
            navlist.style.left = itemPosNewAnimLeft + "px";
            navlist.style.height = activeWidthNewAnimHeight + "px";
            navlist.style.width = activeWidthNewAnimWidth + "px";
        }
    });
}

document.addEventListener("DOMContentLoaded", function() {
    setTimeout(function() {
        test();
    });
});



