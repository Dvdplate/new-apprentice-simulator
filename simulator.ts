namespace kBit {

    interface SensorData {
        ultrasonicDistance:     number;
        leftIRObstacleSensor:   boolean;
        rightIRObstacleSensor:  boolean;
        leftIRLineSensor:       boolean;
        rightIRLineSensor:      boolean;
        photoresistorReading:   number;
    }

    export class ApprenticeRobotSimulatorClass {

        /* Default sensor values */
        sensorData: SensorData = {
            ultrasonicDistance: 52.34,
            leftIRObstacleSensor: false,
            rightIRObstacleSensor: false,
            leftIRLineSensor: true,
            rightIRLineSensor: true,
            photoresistorReading: 150
        }
        robotType: string = "virtualType"
        constructor() {
            kBit.utils.sendJSON({ "initialise": "true" })
            control.simmessages.onReceived(kBit.constants.CHANNEL_NAME, (buf)=>{
                this.handleRobotMessage(buf)
            })
        }

        handleRobotMessage(buf: Buffer) {
            let stringMsg = ""
            for (let i = 0; i < buf.length; i++) {
                stringMsg += String.fromCharCode(buf[i]);
            }
            let data = JSON.parse(stringMsg)

            if (data.sensorData) {
                if (data.sensorData.ultrasonicDistance != undefined) { this.sensorData.ultrasonicDistance = data.sensorData.ultrasonicDistance; }
                if (data.sensorData.leftIRObstacleSensor != undefined) { this.sensorData.leftIRObstacleSensor = data.sensorData.leftIRObstacleSensor; }
                if (data.sensorData.rightIRObstacleSensor != undefined) { this.sensorData.rightIRObstacleSensor = data.sensorData.rightIRObstacleSensor; }
                if (data.sensorData.leftIRLineSensor != undefined) { this.sensorData.leftIRLineSensor = data.sensorData.leftIRLineSensor }
                if (data.sensorData.rightIRLineSensor != undefined) { this.sensorData.rightIRLineSensor = data.sensorData.rightIRLineSensor }
                if (data.sensorData.photoresistorReading != undefined) { this.sensorData.photoresistorReading = data.sensorData.photoresistorReading }
            }
        }

        /*---------------------------------------------------
        Motor Methods
        ----------------------------------------------------*/
        carRun(direction: string, speed: number) {
            kBit.utils.sendJSON({
                "command": {
                    "type": "move",
                    "state": "true",
                    "left": {
                        "direction": direction,
                        "power": speed
                    },
                    "right": {
                        "direction": direction,
                        "power": speed
                    }
                }
            });
        }
        
        carMotorRun(motor: string, motorDirection: string, speed: number) {
            kBit.utils.sendJSON({
                "command": {
                    "type": "move",
                    "state": "true",
                    motor: {
                        "direction": motorDirection,
                        "power": speed
                    }
                }
            });
        }

        carMotorStop(motor: string) {
            kBit.utils.sendJSON({
                "command": {
                    "type": "move",
                    "state": "true",
                    motor: {
                        "direction": "forward",
                        "power": 0
                    }
                }
            });
        }

        carStop() {
            kBit.utils.sendJSON({
                "command": {
                    "type": "move",
                    "state": "false"
                }
            });
        }
        

        /*---------------------------------------------------
        LED Methods
        ----------------------------------------------------*/
        ledSetBrightness(brightness: number) {}
        ledSetColor(color: string) {}
        ledSetRGBColor(red:number, green:number, blue:number) {}
        ledTurnOff() {}
        

        /*---------------------------------------------------
        Sensor Methods
        ----------------------------------------------------*/
        readLineSensor(side: string): boolean {
            return side == "right" ? 
                this.sensorData.rightIRLineSensor : this.sensorData.leftIRLineSensor
        }

        readObstacleSensor(side: string): boolean {
            return side == "right" ?
                this.sensorData.rightIRObstacleSensor : this.sensorData.leftIRObstacleSensor
        }

        // TODO: TEST FUNCTION AGGRESSIVELY
        lineTracking(): number {
            const leftSensorValue = this.sensorData.leftIRLineSensor
            const rightSensorValue = this.sensorData.rightIRLineSensor
            
            if (!leftSensorValue) {
                return 1;
            } 
            else if (!rightSensorValue) {
                return 2;
            }
            else {
                return 3;
            }
        }

        readUltrasonicSensor(): number {
            return this.sensorData.ultrasonicDistance
        }
        
        readPhotoresistorSensor(): number {
            return this.sensorData.photoresistorReading
        }
    }
}