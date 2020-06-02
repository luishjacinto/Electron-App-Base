const $ = require('jQuery');
const {remote} = require('electron');
var win = remote.getCurrentWindow();


$('#menu-btn-minimize').on('click', () => {
    win.minimize();
});


$('#menu-btn-maximize').on('click', () => {
    if (!win.isMaximized()) {
        win.maximize();          
    } else {
        win.unmaximize();
    }
});

$('#menu-btn-close').on('click', () => {
    win.close();
});