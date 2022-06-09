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