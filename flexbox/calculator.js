let runningTotal = 0;  // FInal answer
let buffer = "0"; //
let previousOperator = null;  //

const display = document.querySelector(".screen");

// To display the value of buttons clicked and solution to the operations performed
function rerender() {
    display.innerText = buffer;
}

function handleSymbol(value) {
    switch (value) {
        case "C":
            buffer = "0";
            runningTotal = 0;
            previousOperator = null;
            break;
        case "=": 
            if (previousOperator === null) {
                return;  // skip the function and get out
            }
            flushOperation(parsrInt(buffer));
            previousOperator = 0;
            buffer = "" + runningTotal; // string concatenation here to keep buffer as the type string and not change it to number
            runningTotal = 0;
            break;
        case "←": 
            if (buffer.length === 1) {
                buffer = "0";
            }else {
                buffer = buffer.substring(0, buffer.length - 1)
            }
            break;
        default:
            handleMath(value);
            break;
    }
}

function handleMath(value) {
    const intBuffer = parseInt(buffer);
    if (runningTotal === 0) {
        runningTotal = intBuffer;
    } else {flushOperation(intBuffer);

    }
}

function handleNumber(value) {
    if (buffer === "0") {
        buffer = value; 
    } else {
        buffer +=  value;
    }
}

// TO get the value of the button clicked
document.querySelector(".button-container").addEventListener("click", function(event) {
    buttonClick(event.target.innerText);
});

// check if the button clicked is a number or symbol
function buttonClick(value) {
    if (isNaN(parseInt(value))) {  // handleSymbol function is triggered if button clicked isNaN otherwise handleNumber function is triggered
        handleSymbol(value);
    } else { 
        handleNumber(value);
    }
    rerender();
}