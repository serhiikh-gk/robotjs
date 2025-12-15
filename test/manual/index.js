const sharp = require('sharp')
const path = require('path')
const kb = require('../..')

function sleep(ms){
  return new Promise(r=>setTimeout(r,ms))
}

console.log(process.argv)

// kb.setKeyboardDelay(10)

async function createImage (rimg) {
  const [left, top, width, height] = [0, 0, 100, 100]
  const channels = 3
  const {image, width: cWidth, height: cHeight, bytesPerPixel, byteWidth} = rimg
  const uint8array = new Uint8Array(cWidth*cHeight*channels)
  for(let h=0; h<cHeight; h+=1) {
    for(let w=0; w<cWidth; w+=1) {
      let offset = (h*cWidth + w)*channels
      let offset2 = byteWidth*h + w*bytesPerPixel
      uint8array[offset] = image.readUInt8(offset2 + 2)
      uint8array[offset + 1] = image.readUInt8(offset2 + 1)
      uint8array[offset + 2] = image.readUInt8(offset2 + 0)
    }
  }
  await sharp(Buffer.from(uint8array), {
    raw: {
      width: cWidth,
      height: cHeight,
      channels
    }
  }).toFile(path.join(process.cwd(), 'test', 'manual', `captur${top}x${left}-${width}x${height}.png`))
}

(async () => {
  if (!process.argv.includes('-captureScreendata') 
    && !process.argv.includes('-makeScreenshot')
    && !process.argv.find(a => a.startsWith('--typeUnicodeChar'))
    && !process.argv.find(a => a.startsWith('--typeUnicodeString'))) {
    
    console.log('#1 Switch to a text field. Typing in 3 seconds...')
    await sleep(1000); console.log('3'); await sleep(1000); console.log('2'); await sleep(1000); console.log('1')

    // kb.setKeyboardDelay(100)
    
    kb.keyTap('a')
    kb.keyTap('enter')

    kb.keyTap('a', ['shift'])
    kb.keyTap('enter')
    
    // kb.keyToggle('shift', 'down')
    // kb.keyTap('b')
    // kb.keyToggle('shift', 'up')
    // kb.keyTap('enter')

    // kb.typeString('abCd')
    // kb.keyTap('enter')

    // kb.typeStringDelayed('efGh', 1)
    // kb.keyTap('enter')

    // const str = '~!@#$%^&*_+{}|:">?'
    // kb.keyTap('enter')
    // kb.typeString(str)
  }

  const code = process.argv.find(a => a.startsWith('--typeUnicodeChar'))
  const uString = process.argv.find(a => a.startsWith('--typeUnicodeString'))

  if (code) {
    let s = code.split('=')[1]
    let uniCode = s.charCodeAt(0)
    console.log('#2 Switch to a text field. Typing in 3 seconds...', s, ' => ', uniCode)
    await sleep(1000); console.log('3'); await sleep(1000); console.log('2'); await sleep(1000); console.log('1')

    kb.unicodeTap(uniCode)

    // kb.keyTap(s)

    // kb.keyTap(s, ['shift'])

    // kb.typeString(s)
    // kb.typeString(uniCode)

    // kb.keyToggle('shift', 'down')
    // kb.keyTap(s)
    // kb.keyToggle('shift', 'up')
  }

  if (uString) {
    // ~!@#$%^&*()_+:"<>?
    // `1234567890-=[]\;',./
    // ~!@#$%^&*_+{}|:">?
    const str = '~!@#$%^&*()_+:"<>?' // uString
    console.log('#3 Switch to a text field. Typing in 3 seconds...', str)
    await sleep(1000); console.log('3'); await sleep(1000); console.log('2'); await sleep(1000); console.log('1')
    for (let i = 0; i < str.length; i++) {
      const s = str[i]
      let uniCode = s.charCodeAt(0)
      console.log(s, ' => ', uniCode)

      kb.unicodeTap(uniCode)

      // kb.keyTap(s)
      
      // kb.keyTap(s, ['shift'])
      
      // kb.typeString(s)
      // kb.typeString(uniCode)
      
      sleep(100)
    }
  }


  if (process.argv.includes('-captureScreendata')) {
    console.log('Capturing screen data...')
    console.log(kb.getMousePos())
    console.log(kb.getPixelColor(10, 10))
    console.log(kb.getScreenSize())
  }

  if (process.argv.includes('-makeScreenshot')) {
    console.log('Making screenshot...')
    const rimg = await kb.screen.capture(10, 10, 100, 100)
    console.log(rimg)

    createImage(rimg)
  }
})()
