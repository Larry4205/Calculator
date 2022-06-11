const numButtons = document.querySelectorAll('.numbtn')
const zButton = document.querySelector('.zbtn');
const clrBtn = document.querySelector('.clr');
const display = document.querySelector('.nums');
const dcmBtn = document.querySelector('.dcm');
const plmBtn = document.querySelector('.plmbtn');
const eqBtn = document.querySelector('.eq');
const opButtons = document.querySelectorAll('.opbtn');


let currentOperater = undefined;
let lastEntry = undefined;

const maxLength = 6;

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
            return num1 / num2;
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
        if(displayValue === '0') {
            display.textContent = numEntered;
        } else if (display.textContent.length < maxLength){
            display.textContent += numEntered;
        }
    });
});

eqBtn.addEventListener('click', function(e){
    if(currentOperater === undefined) {
        return;
    }
    let operated = operate(lastEntry, parseFloat(display.textContent), currentOperater);
    display.textContent = operated.toString();
    currentOperater = undefined;
});

opButtons.forEach(function(opButton) {
    opButton.addEventListener('click', function(e) {
        lastEntry = parseFloat(display.textContent);
        currentOperater = opButton.id;
        console.log(currentOperater);
    });
});

zButton.addEventListener('click', function(e) {
    if(display.textContent.length < maxLength && display.textContent !== '0') {
        display.textContent += '0';
    }
});

clrBtn.addEventListener('click', function(e) {
    display.textContent = '0';
});

dcmBtn.addEventListener('click', function(e) {
    let numText = display.textContent;
    if(!numText.includes('.') && numText.length < maxLength -1) {
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

