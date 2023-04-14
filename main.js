const { app, BrowserWindow } = require('electron')

function createWindow() {
    const win = new BrowserWindow({
        width: 600,
        height: 600,
    })
    
    // win.loadURL('https://google.com')
    //A webpage to be loaded

    // win.loadFile("./src/index.html")
    //An HTML file to be loaded
}

app.whenReady().then(()=> {
    createWindow()
})