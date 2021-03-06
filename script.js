const numButtons = document.querySelectorAll('.numbtn')
const zButton = document.querySelector('.zbtn');
const clrBtn = document.querySelector('.clr');
const display = document.querySelector('.nums');
const dcmBtn = document.querySelector('.dcm');
const plmBtn = document.querySelector('.plmbtn');
const eqBtn = document.querySelector('.eq');
const opButtons = document.querySelectorAll('.opbtn');
const acButton = document.querySelector('.all-clear');


let currentOperater = undefined;
let lastEntry = undefined;
let overwrite = false;

const maxLength = 8;

function truncate(displayText) {
    let displayValue = parseFloat(displayText);
    let max = "";
    for(let i = 0; i < maxLength; i++) {
        max += "9";
    }
    let maxValue = parseFloat(max);
    if(displayValue > maxValue) {
        return maxValue.toString();
    } else if(displayValue < 0 - maxValue) {
        return (0 - maxValue).toString();
    }
    let dispTrunc = displayValue.toString().slice(0,maxLength);
    if(dispTrunc.charAt(dispTrunc.length -1) === '.') {
        dispTrunc = dispTrunc.slice(0, -1);
    }
    return dispTrunc;
}

acButton.addEventListener('click', function(e) {
    lastEntry = undefined;
    currentOperater = undefined;
    overwrite = false;
    display.textContent = '0';
});

function operate(num1, num2, optype) {
    switch(optype) {
        case 'add':
            return num1 + num2;
            break;
        case 'subtract':
            return num1 - num2;
            break;
        case 'multiply':
            return num1 * num2;
            break;
        case 'divide':
            if(num2 === 0) {
                return "LOL NOPE";
            } else { 
                return num1 / num2;
            }
            break;
        default:
            return undefined;
            break;
    }
}

numButtons.forEach(function(numButton){
    numButton.addEventListener('click', function(e) {
        let displayValue = display.textContent;
        let numEntered = numButton.id;
        if(displayValue === '0' || overwrite) {
            display.textContent = numEntered;
            overwrite = false;
        } else if (display.textContent.length < maxLength){
            display.textContent += numEntered;
        }
    });
});


opButtons.forEach(function(opButton) {
    opButton.addEventListener('click', function(e) {
        if(currentOperater === undefined) {
            lastEntry = parseFloat(display.textContent);
            currentOperater = opButton.id;
            overwrite = true;
        } else {
            //evaluate function
            let currentValue = parseFloat(display.textContent);
            let opresult = operate(lastEntry, currentValue, currentOperater);
            if(typeof opresult === 'string') {
                display.textContent = opresult;
            } else {
                display.textContent = truncate(opresult.toString());
                lastEntry = opresult;
                currentOperater = opButton.id;
                overwrite = true;
            }
        }
    });
});

zButton.addEventListener('click', function(e) {
    if(overwrite) {
        display.textContent = '0';
        overwrite = false;
    } else if(display.textContent.length < maxLength && display.textContent !== '0') {
        display.textContent += '0';
    }
});

eqBtn.addEventListener('click', function(e) {
    if(currentOperater === undefined) {
        return;
    }
    let currValue = parseFloat(display.textContent);
    let opresult = operate(lastEntry, currValue, currentOperater);
    if(typeof opresult === 'string') {
        display.textContent = opresult;
    } else {
        display.textContent = truncate(opresult.toString());
        lastEntry = opresult;
        currentOperater = undefined;
        overwrite = true;
    }
});

clrBtn.addEventListener('click', function(e) {
    display.textContent = '0';
});

dcmBtn.addEventListener('click', function(e) {
    let numText = display.textContent;
    if(overwrite) {
        display.textContent = '0.';
        overwrite = false;
    } else if(!numText.includes('.') && numText.length < maxLength -1) {
        display.textContent += '.';
    }
});

plmBtn.addEventListener('click', function(e) {
    let displayNum = parseFloat(display.textContent);
    let result = 0 - displayNum;
    if(result !== 0) {
        display.textContent = result.toString();
    }
});

