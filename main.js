const {app, BrowserWindow, clipboard,globalShortcut} = require('electron')
const path = require('node:path')

const engKey = {
    a:"ש",
    b:"נ",
    c:"ב",
    d:"ג",
    e:"ק",
    f:"כ",
    g:"ע",
    h:"י",
    i:"ן",
    j:"ח",
    k:"ל",
    l:"ך",
    m:"צ",
    n:"מ",
    o:"ם",
    p:"פ",
    q:"/",
    r:"ר",
    s:"ד",
    t:"א",
    u:"ו",
    v:"ה",
    w:"'",
    x:"ס",
    y:"ט",
    z:"ז",
    ",":"ת",
    ".":"ץ",
    "/":".",
    " ":" ",
    "(":"(",
    ")":")"
}

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

    const ret = globalShortcut.register("CommandOrControl+;", () => {
        const text = clipboard.readText()
        let tempText
        for(let i = 0;i < text.length; i++){
            console.log(text[i])
            tempText += (engKey[text[i]])
        }
        console.log("Clipboard text:",text)

        const translatedText = (tempText?.split('d')[2])
        clipboard.writeText(translatedText)
      })

    app.on('browser-window-blur',() => {
        console.log("it works")
    })
    
})