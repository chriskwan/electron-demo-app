const electron = require('electron')
// use remote so you can access built-in modules of the main process (e.g. app) in the renderer process
const app = electron.remote.app
const desktopCapturer = electron.desktopCapturer
const electronScreen = electron.screen
const shell = electron.shell

const fs = require('fs')
const os = require('os')
const path = require('path')

const screenshot = document.getElementById('screen-shot')
const screenshotMsg = document.getElementById('screenshot-path')

screenshot.addEventListener('click', event => {
  screenshotMsg.textContent = 'Gathering screens...'
  const thumbSize = determineScreenShotSize()
  let options = {
    types: ['screen'],
    thumbnailSize: thumbSize
  }

  desktopCapturer.getSources(options, (error, sources) => {
    if (error) {
      return console.log(error)
    }

    sources.forEach(source => {
      if (source.name === 'Entire screen' || source.name === 'Screen 1') {
        const desktopPath = app.getPath('desktop')
        //const screenshotPath = path.join(os.tmpdir(), 'screenshot.png')
        const screenshotPath = path.join(desktopPath, `Screenshot_From_Electron_${new Date()}.png`)

        fs.writeFile(screenshotPath, source.thumbnail.toPng(), error => {
          if (error) {
            return console.log(error)
          }

          shell.openExternal('file://' + screenshotPath)
          const message = `Saved screenshot to: ${screenshotPath}`
          screenshotMsg.textContent = message
        })
      }
    })
  })
});

function determineScreenShotSize() {
  const screenSize = electronScreen.getPrimaryDisplay().workAreaSize
  const maxDimension = Math.max(screenSize.width, screenSize.height)
  return {
    width: maxDimension * window.devicePixelRatio,
    height: maxDimension * window.devicePixelRatio
  }
}
