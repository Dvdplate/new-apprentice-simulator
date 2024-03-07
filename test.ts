// tests go here; this will not be compiled when this package is used as an extension.

for (let i = 0; i < 10; i++) {
    basic.pause(100)
    apprenticeBot.ledSetColor(kBit.enums.colorSelection.Red)
    basic.pause(100)
    apprenticeBot.ledSetColor(kBit.enums.colorSelection.Blue)
    basic.pause(100)
    apprenticeBot.ledSetColor(kBit.enums.colorSelection.Green)
    basic.pause(100)
    apprenticeBot.ledSetColor(kBit.enums.colorSelection.White)
}