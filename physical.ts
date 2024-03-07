namespace kBit {
    export class ApprenticeRobotClass {

        public robotType: string = "hardwareType"
        private lastUltrasonicTime = 0
        private ledBrightness = 4095;

        constructor() {
            kBit.utils.initPCA9685();
            this.ledSetBrightness(255)
        }

        
        /*      Motor Movement Methods      */
        carRun(carDirection: string, power: number) {
            let speed_value = Math.map(power, 0, 100, 0, 4095);
            switch (carDirection) {
                case "forward":
                    kBit.utils.setPwm(1, 0, speed_value);
                    kBit.utils.setPwm(0, 0, 0);
                    kBit.utils.setPwm(3, 0, speed_value);
                    kBit.utils.setPwm(2, 0, 0);
                    break
                case "backward":
                    kBit.utils.setPwm(1, 0, speed_value);
                    kBit.utils.setPwm(0, 0, 4095);
                    kBit.utils.setPwm(3, 0, speed_value);
                    kBit.utils.setPwm(2, 0, 4095);
                    break
                case "left":
                    kBit.utils.setPwm(1, 0, speed_value);
                    kBit.utils.setPwm(0, 0, 4095);
                    kBit.utils.setPwm(3, 0, speed_value);
                    kBit.utils.setPwm(2, 0, 0);
                    break
                case "right":
                    kBit.utils.setPwm(1, 0, speed_value);
                    kBit.utils.setPwm(0, 0, 0);
                    kBit.utils.setPwm(3, 0, speed_value);
                    kBit.utils.setPwm(2, 0, 4095);
                    break
            }
        }

        carMotorRun(motor: string, motorDirection: string, power: number) {
            const speed_value: number = Math.map(power, 0, 100, 0, 4095);
            const oppositeVal: number = (motorDirection == "forward") ? 0 : 4095;

            if (motor == "left") {
                kBit.utils.setPwm(1, 0, speed_value);
                kBit.utils.setPwm(0, 0, oppositeVal);
            }
            else if (motor == "right") {
                kBit.utils.setPwm(3, 0, speed_value);
                kBit.utils.setPwm(2, 0, oppositeVal);
            }
        }

        carStop() {
            kBit.utils.setPwm(3, 0, 0);
            kBit.utils.setPwm(1, 0, 0);
        }

        carStopMotor(motor: string, motorDirection: string, power: number) {
            if (motor == "left") {
                kBit.utils.setPwm(1, 0, 0);
                kBit.utils.setPwm(0, 0, 0);
            }
            if (motor == "right") {
                kBit.utils.setPwm(3, 0, 0);
                kBit.utils.setPwm(2, 0, 0);
            }
        }



        /* RGB LED Methods */
        ledSetBrightness(brightness: number) {
            this.ledBrightness = Math.map(brightness, 0, 255, 4095, 0);
        }

        ledSetColor(color: string) {
            switch(color) {
                case("Red"):
                    kBit.utils.setPwm(5, 0, 4095);
                    kBit.utils.setPwm(6, 0, this.ledBrightness);
                    kBit.utils.setPwm(4, 0, 4095);
                    break
                case ("Green"):
                    kBit.utils.setPwm(5, 0, this.ledBrightness);
                    kBit.utils.setPwm(6, 0, 4095);
                    kBit.utils.setPwm(4, 0, 4095);
                    break
                case ("Blue"):
                    kBit.utils.setPwm(5, 0, 4095);
                    kBit.utils.setPwm(6, 0, 4095);
                    kBit.utils.setPwm(4, 0, this.ledBrightness);
                    break
                case ("White"):
                    kBit.utils.setPwm(5, 0, this.ledBrightness);
                    kBit.utils.setPwm(6, 0, this.ledBrightness);
                    kBit.utils.setPwm(4, 0, this.ledBrightness);
                    break
                case ("Black"):
                    kBit.utils.setPwm(5, 0, 4095);
                    kBit.utils.setPwm(6, 0, 4095);
                    kBit.utils.setPwm(4, 0, 4095);
                    break
                default:
                    break
            }
        }

        ledSetRGBColor(red:number, green:number, blue:number) {
            let R = Math.map(red, 0, 255, 4095, this.ledBrightness);
            let G = Math.map(green, 0, 255, 4095, this.ledBrightness);
            let B = Math.map(blue, 0, 255, 4095, this.ledBrightness);

            kBit.utils.setPwm(6, 0, R);
            kBit.utils.setPwm(5, 0, G);
            kBit.utils.setPwm(4, 0, B);
        }

        ledTurnOff() {
            kBit.utils.setPwm(6, 0, 4095);
            kBit.utils.setPwm(5, 0, 4095);
            kBit.utils.setPwm(4, 0, 4095);
        }



        /* Sensor Methods */
        readLineSensor(sensorSide: string): number {
            if (sensorSide == "left") {         //left side
                pins.setPull(DigitalPin.P12, PinPullMode.PullNone);
                return pins.digitalReadPin(DigitalPin.P12);
            }
            else if (sensorSide == "right") {        //right side
                pins.setPull(DigitalPin.P13, PinPullMode.PullNone);
                return pins.digitalReadPin(DigitalPin.P13);
            }
            else {
                return 0
            }
        }

        readObstacleSensor(sensorSide: string): number {
            let val;
            if (sensorSide == "left") {         //left side
                pins.setPull(DigitalPin.P2, PinPullMode.PullNone);  //leftside
                return pins.digitalReadPin(DigitalPin.P2);
            }
            else if (sensorSide == "right") {   //right side
                pins.setPull(DigitalPin.P11, PinPullMode.PullNone); //rightside
                return pins.digitalReadPin(DigitalPin.P11);
            }
            else {
                return 0
            }
        }

        lineTracking(): number {
            pins.setPull(DigitalPin.P12, PinPullMode.PullNone);
            pins.setPull(DigitalPin.P13, PinPullMode.PullNone);
            return pins.digitalReadPin(DigitalPin.P12) << 0 | pins.digitalReadPin(DigitalPin.P13) << 1;
        }

        readUltrasonicSensor(): number {
            const TRIG_PIN = DigitalPin.P14;
            const ECHO_PIN = DigitalPin.P15;

            pins.setPull(TRIG_PIN, PinPullMode.PullNone);
            pins.digitalWritePin(TRIG_PIN, 0)
            control.waitMicros(2);
            pins.digitalWritePin(TRIG_PIN, 1)
            control.waitMicros(10);
            pins.digitalWritePin(TRIG_PIN, 0)

            // read echo pulse  max distance : 6m(35000us)
            //2020-7-6
            // pins.pulseIn():This function has a bug and returns data with large errors.
            let t = pins.pulseIn(ECHO_PIN, PulseValue.High, 35000);
            let ret = t;

            //Eliminate the occasional bad data
            if (ret == 0 && this.lastUltrasonicTime != 0) {
                ret = this.lastUltrasonicTime;
            }
            this.lastUltrasonicTime = t;
            //It would normally divide by 58, because the pins.pulseIn() function has an error, so it's divided by 58
            return Math.round(ret / 40);
        }

        readPhotoresistorSensor(): number {
            return pins.analogReadPin(AnalogPin.P1);
        }
    }
}


