const { app, Menu, BrowserWindow } = require('electron');


const template = [
    {
        label: 'Mode',
        submenu: [
            { label: 'Edit RoomDB', click() { createRoomWindow() } },
            { label: 'Edit ItemDB', click() { createItemWindow(); } }
        ]
    },

    {
        label: 'View',
        submenu: [
            { role: 'reload' },
            { role: 'forcereload' },
            { role: 'toggledevtools' },
            { type: 'separator' },
            { role: 'resetzoom' },
            { role: 'zoomin' },
            { role: 'zoomout' },
            { type: 'separator' },
            { role: 'togglefullscreen' }
        ]
    }];

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);

function createRoomWindow() {
    const win = new BrowserWindow({
        width: 1920,
        height: 1080,
        webPreferences: {
            nodeIntegration: true
        }
    })

    win.loadFile('index.html');
}

function createItemWindow() {
    const win = new BrowserWindow({
        width: 1920,
        height: 1080,
        webPreferences: {
            nodeIntegration: true
        }
    })

    win.loadFile('item.html');
}

app.whenReady().then(createRoomWindow);