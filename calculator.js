
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
    firstNum = +firstNum;
    secondNum = +secondNum;
    var result;
    switch(operator){
        case '+':
            result = add(firstNum, secondNum);
            break;
        case '-':
            result = subtract(firstNum, secondNum);
            break;
        case '*':
            result = multiply(firstNum, secondNum);
            break;
        case '/':
            result = divide(firstNum, secondNum);
            break;
    }
    return result;
}

function updateDisplayNumber(value){
    const displayBoard = document.querySelector('.display');
    if(displayBoard.textContent.length > 9){
        displayBoard.style.fontSize = '40px';
        displayBoard.textContent = 'MAX NUMBER LENGTH EXCEEDED';
        return;
    }
    displayBoard.textContent = displayBoard.textContent + value;
}

function updateDisplay(value){
    const displayBoard = document.querySelector('.display');
    displayBoard.textContent = value.toString();
}


function handleNumberButtons(){
    const numbersNodeList = document.querySelectorAll('.num');
    numbersNodeList.forEach((button)=>{
        button.addEventListener('click', ()=>{
            updateDisplayNumber(button.textContent);
        })
    })
}

function emptyDisplay(){
    const displayBoard = document.querySelector('.display');
    return displayBoard.textContent === '';
}

function getDisplayNumber(){
    const displayBoard = document.querySelector('.display');
    return displayBoard.textContent;
}

function clearDisplay(){
    const displayBoard = document.querySelector('.display');
    displayBoard.textContent = '';
}

let memory = {
    firstNum: '',
    secondNum: '',
    operation: '',
    gotOp: false
};



function resetMemory(){
    memory.firstNum = '';
    memory.secondNum = '';
    operation = '';
}
function handleOperationButtons(){
    const operationsNodeList = document.querySelectorAll('.op');
    operationsNodeList.forEach((button)=>{
        button.addEventListener('click', ()=>{
            
            
        })
    })
}



handleNumberButtons();
handleOperationButtons();