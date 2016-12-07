const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')

// Keep a global reference of the window object,
// if you don't, the window will be automatically closed
// when the JavaScript object is garbage collected
let win

function createWindow () {
  // Create the browser window
  win = new BrowserWindow({ width: 800, height: 600, show: false })

  // Load the index.html
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the devtools
  //win.webContents.openDevTools()

  // You will need to start electron with the --debug=portnumber flag
  // and use an external debugger
  // see: https://github.com/electron/electron/blob/master/docs/tutorial/debugging-main-process.md
  //debugger;

  // This console goes to the terminal
  console.log("window created")

  // Emitted when the window is closed
  win.on('closed', () => {
    console.log("window closed")
    // Dereference the window object
    win = null
  })

  win.once('ready-to-show', () => {
    win.show()
  })
}

// This method will be called when Electron has finished initialization
// and is ready to create browser windows.
app.on('ready', createWindow)
