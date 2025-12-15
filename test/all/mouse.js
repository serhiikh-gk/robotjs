var robot = require('../..')
var lastKnownPos, currentPos

//Increase delay to help it reliability.
robot.setMouseDelay(100)

describe('Mouse', () => {
  it('Get the initial mouse position.', function()
  {
    let result = lastKnownPos = robot.getMousePos()

    expect(result).toBeTruthy()

    result = lastKnownPos.x !== undefined
    
    expect(result).toBeTruthy()

    result = lastKnownPos.y !== undefined
    
    expect(result).toBeTruthy()
  })

  it('Move the mouse.', function()
  {
    lastKnownPos = robot.moveMouse(0, 0)
    
    let result = robot.moveMouse(100, 100) === 1

    expect(result).toBeTruthy()
    
    currentPos = robot.getMousePos()
    
    result = currentPos.x === 100

    expect(result).toBeTruthy()

    result = currentPos.y === 100

    expect(result).toBeTruthy()

    expect(function()
    {
      robot.moveMouse(0, 1, 2, 3)
    }).toThrowError(/Invalid number/)

    expect(function()
    {
      robot.moveMouse(0)
    }).toThrowError(/Invalid number/)

    result = robot.moveMouse('0', '0') === 1

    expect(result).toBeTruthy()

  })

  it('Move the mouse smoothly.', function()
  {
    lastKnownPos = robot.moveMouseSmooth(0, 0)
    
    let result = robot.moveMouseSmooth(100, 100) === 1

    expect(result).toBeTruthy()
    
    currentPos = robot.getMousePos()

    expect(currentPos.x).toEqual(100)
    expect(currentPos.y).toEqual(100)

    expect(function()
    {
      robot.moveMouseSmooth(0, 1, 2, 3)
    }).toThrowError(/Invalid number/)

    expect(function()
    {
      robot.moveMouseSmooth(0)
    }).toThrowError(/Invalid number/)

    result = robot.moveMouseSmooth('0', '0') === 1

    expect(result).toBeTruthy()

  })

  it('Click the mouse.', function()
  {
    let result = robot.mouseClick()
    
    expect(result).toBeTruthy()

    result = robot.mouseClick('left') === 1

    expect(result).toBeTruthy()

    result = robot.mouseClick('middle') === 1

    expect(result).toBeTruthy()

    result = robot.mouseClick('right') === 1

    expect(result).toBeTruthy()

    expect(robot.mouseClick('left', 1)).toBeTruthy()

    expect(function()
    {
      robot.mouseClick('party')
    }).toThrowError(/Invalid mouse/)

    expect(function()
    {
      robot.mouseClick('0')
    }).toThrowError(/Invalid mouse/)

    expect(function()
    {
      robot.mouseClick('left', 0, 'it')
    }).toThrowError(/Invalid number/)

  })

  it('Drag the mouse.', function()
  {

    let result = robot.dragMouse(5, 5) === 1

    expect(result).toBeTruthy()

    expect(function()
    {
      robot.dragMouse(0)
    }).toThrowError(/Invalid number/)

    expect(function()
    {
      robot.dragMouse(1, 1, 'left', 5)
    }).toThrowError(/Invalid number/)

    expect(function()
    {
      robot.dragMouse(2, 2, 'party')
    }).toThrowError(/Invalid mouse/)

  })

  it('Mouse scroll.', function()
  {
    lastKnownPos = robot.getMousePos()

    expect(lastKnownPos).toBeTruthy()

    let result = robot.mouseClick() === 1

    expect(result).toBeTruthy()

    result = robot.scrollMouse(0, 1 * 120) === 1

    expect(result).toBeTruthy()

    result = robot.scrollMouse(0, 20 * 120) === 1

    expect(result).toBeTruthy()

    result = robot.scrollMouse(0, -5 * 120) === 1

    expect(result).toBeTruthy()

    result = robot.scrollMouse(1 * 120, 0) === 1

    expect(result).toBeTruthy()

    result = robot.scrollMouse(20 * 120, 0) === 1

    expect(result).toBeTruthy()

    result = robot.scrollMouse(-5 * 120, 0) === 1
    
    expect(result).toBeTruthy()

    result = robot.scrollMouse(-5 * 120, -5 * 120) === 1

    expect(result).toBeTruthy()
  })

  it('Mouse Toggle', function()
  {
    expect(lastKnownPos = robot.getMousePos()).toBeTruthy()

    let result = robot.mouseToggle('up', 'right') === 1

    expect(result).toBeTruthy()
  })
})
