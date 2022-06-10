const numButtons = document.querySelectorAll('.numbtn')
const zButton = document.querySelector('.zbtn');
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
        let display = document.querySelector('.nums');
        let displayValue = display.textContent;
        let numEntered = numButton.id;
        if(displayValue === '0') {
            display.textContent = numEntered;
        } else if (display.textContent.length < maxLength){
            display.textContent += numEntered;
        }
    });
});

zButton.addEventListener('click', function(e) {
    let display = document.querySelector('.nums');
    if(display.textContent.length < maxLength && display.textContent !== '0') {
        display.textContent += '0';
    }
});