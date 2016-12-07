const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')

// Keep a global reference of the window object,
// if you don't, the window will be automatically closed
// when the JavaScript object is garbage collected
let win

function createWindow () {
  // Create the browser window
  win = new BrowserWindow({ width: 800, height: 600 })

  // Load the index.html
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the devtools
  win.webContents.openDevTools()

  // This console goes to the terminal
  console.log("window created")

  // Emitted when the window is closed
  win.on('closed', () => {
    console.log("window closed")
    // Dereference the window object
    win = null
  })
}

// This method will be called when Electron has finished initialization
// and is ready to create browser windows.
app.on('ready', createWindow)
