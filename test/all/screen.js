var robot = require('../..')
var pixelColor, screenSize

describe('Screen', () => {
  it('Get pixel color.', function()
  {
    var result = pixelColor = robot.getPixelColor(5, 5)

    expect(result).toBeTruthy()
    result = pixelColor !== undefined

    expect(result).toBeTruthy()
    result = pixelColor.length === 6

    expect(result).toBeTruthy()
    result = /^[0-9A-F]{6}$/i.test(pixelColor)
    
    expect(result).toBeTruthy()

    expect(function()
    {
      robot.getPixelColor(9999999999999, 9999999999999)
    }).toThrowError(/outside the main screen/)

    expect(function()
    {
      robot.getPixelColor(-1, -1)
    }).toThrowError(/outside the main screen/)

    expect(function()
    {
      robot.getPixelColor(0)
    }).toThrowError(/Invalid number/)

    expect(function()
    {
      robot.getPixelColor(1, 2, 3)
    }).toThrowError(/Invalid number/)
  })

  it('Get screen size.', function()
  {
    var result = screenSize = robot.getScreenSize()
    
    expect(result).toBeTruthy()
    result = screenSize.width !== undefined
    
    expect(result).toBeTruthy()
    result = screenSize.height !== undefined
    
    expect(result).toBeTruthy()
  })
})
