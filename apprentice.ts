//% color="#ff6800" icon="\uf1b9" weight=15
//% groups="['Motor', 'RGB-led', 'Neo-pixel', 'Sensor', 'Tone']"
namespace apprenticeBot {

    const carDirectionIndexes = [
        "forward",
        "backward",
        "left",
        "right"
    ]

    const motorChoiceIndexes = [
        "forward",
        "backward"
    ]

    const colorChoicesIndexes = [
        "Red",
        "Green",
        "Blue",
        "White",
        "Black"
    ]
    
    /////////////////////   MOTOR BLOCKS  /////////////////////

    /**
     * move the car left, right, forward or backwards
     * @param direction type of movement to make
     * @param speed how fast to make movement
     */
    //% block="car $carDirection speed: $speed \\%"
    //% speed.min=0 speed.max=100
    //% group="Motor" weight=99
    export function carRun(carDirection: kBit.enums.carDirection, speed: number) {
        const direction = carDirectionIndexes[carDirection]
        kBit.ApprenticeBotDriver.carRun(direction, speed)
    }

    /**
     * set speed of motors on the car
     * @param M which motor to use
     * @param MD direction to move motor
     * @param speed speed to move motor
     */
    //% block="$motor motor run $motorDirection speed: $speed \\%"
    //% speed.min=0 speed.max=100
    //% group="Motor" weight=97
    export function carMotorRun(motor: kBit.enums.motorChoice, direction: kBit.enums.motorDirection, speed: number) {
        const motorChoice:string  = motorChoiceIndexes[motor];
        const motorDirection:string = carDirectionIndexes[direction]
        kBit.ApprenticeBotDriver.carMotorRun(motorChoice, motorDirection, speed)
    }


    /**
     * stop individual motors
     * @param M which motor to stop
     */
    //% block="stop $motor motor"
    //% group="Motor" weight=96
    export function carMotorStop(motor: kBit.enums.motorChoice) {
        const motorChoice: string = motorChoiceIndexes[motor];
        kBit.ApprenticeBotDriver.carMotorStop(motorChoice)
    }


    /**
     * stop the car from moving
     */
    //% block="car stop"
    //% group="Motor" weight=98
    export function carStop() {
        kBit.ApprenticeBotDriver.carStop()
    }


    /////////////////////   LIGHT BLOCKS  //////////////////

    //% block="LED brightness $brightness"
    //% br.min=0 br.max=255
    //% group="RGB-led" weight=79
    export function ledSetBrightness(brightness: number) {
        kBit.ApprenticeBotDriver.ledSetBrightness(brightness)
    }

    /**
     * set the rgb-led color via the color card
     * @param col color to make LED lights
     */
    //% block="set RGBled $colorIndex"
    //% group="RGB-led" weight=78
    export function ledSetColor(colorIndex: kBit.enums.colorSelection) {
        const color = colorChoicesIndexes[colorIndex]
        kBit.ApprenticeBotDriver.ledSetColor(color)
    }

    /**
     * set the rgb-led color via data
     */
    //% block=" set RGBled R:$red G:$green B:$blue"
    //% red.min=0 red.max=255 green.min=0 green.max=255 blue.min=0 blue.max=255
    //% group="RGB-led" weight=77
    export function ledSetRGBColor(red: number, green: number, blue: number) {
        kBit.ApprenticeBotDriver.ledSetRGBColor(red, green, blue)
    }

    /**
     * turn off all rgb-led
     */
    //% block="turn off RGB-led"
    //% group="RGB-led" weight=76
    export function ledTurnOff() {
        kBit.ApprenticeBotDriver.ledTurnOff()
    }

    /////////////////////   SENSOR BLOCKS  /////////////////////

    /**
     * infrared obstacle sensor
     * @param LR which infared sensor to use
     */
    //% block="$sensor obstacle sensor "
    //% group="Sensor" weight=69
    export function lineSensorReading(sensor: kBit.enums.motorChoice): number {
        const sensorSide: string = motorChoiceIndexes[sensor];
        return kBit.ApprenticeBotDriver.lineSensorReading(sensorSide)
    }

    /**
     * individual infared line sensors
     * @param LR which infared sensor to use
     */
    //% block="$sensor line sensor "
    //% group="Sensor" weight=69
    export function obstacleSensorReading(sensor: kBit.enums.motorChoice): number {
        const sensorSide: string = motorChoiceIndexes[sensor];
        return kBit.ApprenticeBotDriver.obstacleSensorReading(sensorSide)
    }

    /**
     * Line following block, returns value needed of needed direction
     * 3: move forward
     * 2: turn left
     * 1: turn right
     */
    //% block="line tracking"
    //% group="Sensor" weight=68
    export function lineTracking(): number {
        return kBit.ApprenticeBotDriver.lineTrackingReading()
    }

    /**
     * Ultrasonic Sensor to measure distance
     */
    //% block="ultrasonic"
    //% group="Sensor" weight=67
    export function ultrasonicReading(): number {
        return kBit.ApprenticeBotDriver.ultrasonicReading()
    }

    /**
     * photoresistance sensor to measure ambient light
     */
    //% block="photoresistor "
    //% group="Sensor" weight=66
    export function photoresistorReading(): number {
        return kBit.ApprenticeBotDriver.photoresistorReading()
    }
}