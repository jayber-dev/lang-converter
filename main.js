const { app, BrowserWindow, clipboard, globalShortcut } = require('electron')
const path = require('node:path')
const { engKeys } = require('./keys-layout/engKeys')
const { hebKeys } = require('./keys-layout/hebKeys')


const createWindow = () => {
  const win = new BrowserWindow({
    width: 600,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()

  const ret = globalShortcut.register('CommandOrControl+l', () => {
    const text = clipboard.readText()
    let tempText
    let langFlag = ""
    console.log("rawText: ",text);
    const splitText = text.split(" ")[0]
    for (let i = 0; i < splitText.length; i++) {
      try {

        if (engKeys?.[splitText?.[i]]) {
          langFlag = "eng"
        }
        if (hebKeys?.[splitText?.[i]] !== undefined) {
          langFlag = "heb"
        }
      } catch (error) {
        console.log(error);
      }
    }

    if (langFlag === "eng") {
      for (let i = 0; i < text.length; i++) {
        tempText += (engKeys[text[i]])
      }
    }

    if (langFlag === "heb") {
      console.log(tempText);
      console.log(hebKeys["."])
      for (let i = 0; i < text.length; i++) {

        console.log(hebKeys[`${text[i]}`]);
        tempText += (hebKeys[`${text[i]}`])

      }
    }

    // console.log(splitText);

    // console.log("Clipboard text:",text)

    const translatedText = (tempText?.split('d')[2])
    clipboard.writeText(translatedText)
  })

  app.on('browser-window-blur', () => {
    console.log("it works")
  })

})