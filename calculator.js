
function add(a, b){
    return a + b;
};

function subtract(a, b){
    return a - b;
}

function multiply(a, b){
    return a * b;
}

function divide(a, b){
    return a / b;
}

function operate(operator, firstNum, secondNum){
    switch(operator){
        case '+':
            add(firstNum, secondNum);
            break;
        case '-':
            subtract(firstNum, secondNum);
            break;
        case '*':
            multiply(firstNum, secondNum);
            break;
        case '/':
            divide(firstNum, secondNum);
    }
}