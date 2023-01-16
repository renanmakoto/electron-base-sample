const {app, BrowserWindow} = require('electron')

function createWindow() {
    const win = new BrowserWindow({
        width: 600,
        height: 600,
        backgroundColor: "#123",
    })
    win.loadURL('')
}

app.whenReady().then(() => {
    console.log("The App is ready")
    createWindow()
})

