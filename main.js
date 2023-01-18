const { app, BrowserWindow, ipcMain, Menu, globalShortcut } = require('electron')
const os = require('os')
const path = require('path')
const isDev = (process.env.NODE_ENV !== undefined && process.env.NODE_ENV === "development") ? true : false
const isMac = process.platform === 'darwin' ? true : false

function createWindow() {
    const win = new BrowserWindow({
        width: 600,
        height: 600,
        backgroundColor: "#ffffff",
        show: false,
        icons: path.join(__dirname, "assets", "icons", "1.png"),
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
    })
    // win.loadFile('./src/index.html')
    // win.loadURL('https://youtube.com')
    if (isDev) {
        win.webContents.openDevTools()
    }
    win.once('ready-to-show', () => {
        win.show()
        setTimeout(() => {
            win.webContents.send('cpu_name', os.cpus()[0].model)
        }, 3000)
    })

    const menuTemplate = [
        { role: 'appMenu' },
        { role: 'fileMenu' },
        { 
          label: 'Window',
          submenu: [
            {
                label: 'New Window',
                click: () => { 
                    createWindow() 
                }
            },
            {
                type: 'separator'
            },
            {
                label: 'Close all windows',
                accelerator: 'CmdOrCtrl+a',
                click: () => {
                    console.log("Menu shortcut pressed")
                    BrowserWindow.getAllWindows().forEach(window => { window.close() })
                }
            },
            {
                label: 'Reload',
                accelerator: 'CmdOrCtrl+r',
                click: () => {
                    console.log("Reload pressed")
                    win.reload()
               }
           }
          ]
        }
    ]
    const menu = Menu.buildFromTemplate(menuTemplate)
    Menu.setApplicationMenu(menu)
}

app.whenReady().then(() => {
    console.log("The App is ready")
    createWindow()
    globalShortcut.register('CmdOrCtrl+d', () => {
        console.log("Global shortcut pressed")
        BrowserWindow.getAllWindows()[0].setAlwaysOnTop(true)
        BrowserWindow.getAllWindows()[0].setAlwaysOnTop(false)
    })
})

app.on('will-quit', () => {
    globalShortcut.unregisterAll()
})

app.on('window-all-closed', () => {
    console.log("All windows are closed")
    if (!isMac) {
        app.quit()
    }
}) 

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})

ipcMain.on('open_new_window', () => {
    createWindow()
})