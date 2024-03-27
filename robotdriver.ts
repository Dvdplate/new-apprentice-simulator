namespace kBit {
    
    class apprenticeRobotDriver {
        private robot: any = null

        constructor() {
            this.robot = new kBit.ApprenticeRobotClass()
            kBit.utils.registerSimulator(this)
        }

        private getRobotInstance() {
            return this.robot
        }

        /*---------------------------------------------------
        Motor Methods
        ----------------------------------------------------*/
        carRun(direction: string, speed: number) {
            this.robot.carRun(direction, speed)
        }

        carMotorRun(motor: string, motorDirection: string, speed: number) {
            this.robot.carMotorRun(motor, motorDirection, speed)
        }

        carMotorStop(motor: string) {
            this.robot.carMotorStop(motor)
        }

        carStop() {
            this.robot.carStop()
        }
    

        /*---------------------------------------------------
        LED Methods 
        ----------------------------------------------------*/
        ledSetBrightness(brightness: number) {
            this.robot.ledSetBrightness(brightness)
        }

        ledSetColor(color: string) {
            this.robot.ledSetColor(color)
        }

        ledSetRGBColor(red:number, green:number, blue:number) {
            this.robot.ledSetRGBColor(red, green, blue)
        }

        ledTurnOff() {
            this.robot.ledTurnOff()
        }
        

        /*---------------------------------------------------
        Sensor Methods
        ----------------------------------------------------*/
        lineSensorReading(sensorSide: string): number { 
            return this.robot.readLineSensor(sensorSide) 
        }
        obstacleSensorReading(sensorSide: string): number { 
            return this.robot.readObstacleSensor(sensorSide) 
        }
        lineTrackingReading(): number { 
            return this.robot.lineTracking()
        }
        ultrasonicReading(): number { 
            return this.robot.readUltrasonicSensor() 
        }
        photoresistorReading(): number { 
            return this.robot.readPhotoresistorSensor() 
        }


        /*---------------------------------------------------
        IR Remote Methods
        ----------------------------------------------------*/
        //  TODO: implement IR Sensor stuff
    }

    export const ApprenticeBotDriver = new apprenticeRobotDriver()
}
