namespace kBit.utils {

    const PCA9685_ADDRESS = kBit.constants.PCA9685_ADDRESS
    const LED0_ON_L = kBit.constants.LED0_ON_L
    const PRESCALE = kBit.constants.PRESCALE
    const MODE1 = kBit.constants.MODE1

    export function initPCA9685(): void {
        i2cWrite(PCA9685_ADDRESS, MODE1, 0x00);  //initialize the mode register 1
        setFreq(50);   //20ms
        for (let idx = 0; idx < 16; idx++) {
            setPwm(idx, 0, 0);
        }
    }

    function setFreq(freq: number): void {
        // Constrain the frequency
        let prescaleval = 25000000;
        prescaleval /= 4096;
        prescaleval /= freq;
        prescaleval -= 1;
        let prescale = prescaleval; //Math.Floor(prescaleval + 0.5);
        let oldmode = i2cRead(PCA9685_ADDRESS, MODE1);
        let newmode = (oldmode & 0x7F) | 0x10; // sleep
        i2cWrite(PCA9685_ADDRESS, MODE1, newmode); // go to sleep
        i2cWrite(PCA9685_ADDRESS, PRESCALE, prescale); // set the prescaler
        i2cWrite(PCA9685_ADDRESS, MODE1, oldmode);
        control.waitMicros(5000);
        i2cWrite(PCA9685_ADDRESS, MODE1, oldmode | 0xa1);
    }

    export function setPwm(channel: number, on: number, off: number): void {
        let buf = pins.createBuffer(5);
        buf[0] = LED0_ON_L + 4 * channel;
        buf[1] = on & 0xff;
        buf[2] = (on >> 8) & 0xff;
        buf[3] = off & 0xff;
        buf[4] = (off >> 8) & 0xff;
        pins.i2cWriteBuffer(PCA9685_ADDRESS, buf);
    }

    function i2cRead(addr: number, reg: number) {
        pins.i2cWriteNumber(addr, reg, NumberFormat.UInt8BE);
        let val = pins.i2cReadNumber(addr, NumberFormat.UInt8BE);
        return val;
    }

    function i2cWrite(addr: number, reg: number, value: number) {
        let buf = pins.createBuffer(2)
        buf[0] = reg
        buf[1] = value
        pins.i2cWriteBuffer(addr, buf)
    }

    //% shim=TD_NOOP
    export function registerSimulator(Driver: any) {
        Driver.robot = new kBit.ApprenticeRobotSimulatorClass()
    }

    //% shim=TD_NOOP
    export function sendJSON(json: any) {
        control.inBackground(function() {
            const msg = JSON.stringify(json)
            const buf = Buffer.fromUTF8(msg);
            control.simmessages.send(kBit.constants.CHANNEL_NAME, buf)
        })
    }

    //% shim=TD_NOOP
    export function sendDataUpdateRequest(robotSimulator: any) {
        robotSimulator.sensorData.ultrasonicDistance = null;
        robotSimulator.sensorData.leftIRObstacleSensor = null;
        robotSimulator.sensorData.rightIRObstacleSensor = null;
        robotSimulator.sensorData.leftIRLineSensor = null;
        robotSimulator.sensorData.rightIRLineSensor = null;
        robotSimulator.sensorData.photoresistorReading = null;
        const json = {
            "request": "sensorData"
        }
        control.inBackground(function () {
            const msg = JSON.stringify(json)
            const buf = Buffer.fromUTF8(msg);
            control.simmessages.send(kBit.constants.CHANNEL_NAME, buf)
        })
    }
}