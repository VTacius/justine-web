(function (window, document) {
var menu = document.getElementById('menu');
var WINDOW_CHANGE_EVENT = ('onorientationchange' in window) ? 'orientationchange':'resize';

function toggleHorizontal() {
    [].forEach.call(
        document.getElementById('menu').querySelectorAll('.custom-can-transform'),
        function(el){
            el.classList.toggle('pure-menu-horizontal');
        }
    );
};

function toggleMenu() {
    // set timeout so that the panel has a chance to roll up
    // before the menu switches states
    if (menu.classList.contains('open')) {
        setTimeout(toggleHorizontal, 500);
    }
    else {
        toggleHorizontal();
    }
    menu.classList.toggle('open');
    document.getElementById('toggle').classList.toggle('x');
};

function closeMenu() {
    if (menu.classList.contains('open')) {
        toggleMenu();
    }
}

/* El menú cambia con el click  El menú cambia con el click aa*/
document.getElementById('toggle').addEventListener('click', toggleMenu);

/* Cierra todo si cuando estaba redimensionado abrimos el menú*/
window.addEventListener(WINDOW_CHANGE_EVENT, closeMenu);

})(this, this.document);

