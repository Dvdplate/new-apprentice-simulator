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

        public sensorData: SensorData;
        robotType: string = "virtualType"

        constructor() {
            this.sensorData = {
                ultrasonicDistance: 52.34,
                leftIRObstacleSensor: false,
                rightIRObstacleSensor: false,
                leftIRLineSensor: false,
                rightIRLineSensor: false,
                photoresistorReading: 0,
            };
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
                this.sensorData.ultrasonicDistance = data.sensorData.ultrasonicDistance;
                this.sensorData.leftIRObstacleSensor = data.sensorData.leftIRObstacleSensor;
                this.sensorData.rightIRObstacleSensor = data.sensorData.rightIRObstacleSensor;
                this.sensorData.leftIRLineSensor = data.sensorData.leftIRLineSensor
                this.sensorData.rightIRLineSensor = data.sensorData.rightIRLineSensor
                this.sensorData.photoresistorReading = data.sensorData.photoresistorReading
            }
        }

        /*---------------------------------------------------
        Motor Methods
        ----------------------------------------------------*/
        carRun(direction: string, speed: number) {
            const speed_value = Math.map(speed, 0, 100, 0, 4095);
            let leftMotorDirection;
            let rightMotorDirection;
            if (direction == "forward") {
                leftMotorDirection = "forward"
                rightMotorDirection = "forward"
            }
            else if (direction == "backward") {
                leftMotorDirection = "backward"
                rightMotorDirection = "backward"
            }
            else if (direction == "left") {
                leftMotorDirection = "backward"
                rightMotorDirection = "forward"
            }
            else if (direction == "right") {
                leftMotorDirection = "forward"
                rightMotorDirection = "backward"
            }
            kBit.utils.sendJSON({
                "command": {
                    "type": "move",
                    "state": "true",
                    "left": {
                        "direction": leftMotorDirection,
                        "power": speed_value
                    },
                    "right": {
                        "direction": rightMotorDirection,
                        "power": speed_value
                    }
                }
            });
        }
        
        carMotorRun(motor: string, motorDirection: string, speed: number) {
            const speed_value = Math.map(speed, 0, 100, 0, 4095);
            kBit.utils.sendJSON({
                "command": {
                    "type": "move",
                    "state": "true",
                    [motor]: {
                        "direction": motorDirection,
                        "power": speed_value
                    }
                }
            });
        }

        carMotorStop(motor: string) {
            kBit.utils.sendJSON({
                "command": {
                    "type": "move",
                    "state": "true",
                    [motor]: {
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
                    "state": "true",
                    "left": {
                        "direction": "",
                        "power": 0
                    },
                    "right": {
                        "direction": "",
                        "power": 0
                    }
                }
            });
        }
        

        /*---------------------------------------------------
        LED Methods
        ----------------------------------------------------*/
        ledSetBrightness(brightness: number) {

        }

        ledSetColor(color: string) {
            kBit.utils.sendJSON({
                "command": {
                    "type": "led",
                    "assignment": "color",
                    "value": color
                }
            });
        }

        ledSetRGBColor(red:number, green:number, blue:number) {
            kBit.utils.sendJSON({
                "command": {
                    "type": "led",
                    "assignment": "RGB",
                    "value": {
                        "R": red,
                        "G": green,
                        "B": blue,
                    }
                }
            });
        }

        ledTurnOff() {
            kBit.utils.sendJSON({
                "command": {
                    "type": "led",
                    "assignment": "color",
                    "value": "off"
                }
            });
        }
        

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