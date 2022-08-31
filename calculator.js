
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
        case 'x':
            result = multiply(firstNum, secondNum);
            break;
        case '/':
            result = divide(firstNum, secondNum);
            break;
    }
    return result;
}

function displayLengthCheck(displayBoard){
    return displayBoard.textContent.length <= 9;       
}
function dotCheck(displayBoard, value){
    return value == '.' && displayBoard.textContent.includes('.');
}
function errorCheck(displayBoard){
    return displayBoard.textContent === 'ERROR';
}


function displayError(displayBoard){
    displayBoard.textContent = 'ERROR';
}

function handleError(displayBoard){
    if(errorCheck(displayBoard)){
        clearDisplay();
        resetMemory();
        return false; //can continue since we cleared the error.
    }
    if(!displayLengthCheck(displayBoard)){
        displayError(displayBoard);
        return true; //cant continue we cant display number after error
    }
}

function updateDisplayNumber(value){
    if(memory.gotOpNow == true){
        clearDisplay();
        memory.gotOpNow = false;
    }
    const displayBoard = document.querySelector('.display');
    if(handleError(displayBoard)){
        return;
    }
    if(dotCheck(displayBoard, value)){
        return;
    }
    displayBoard.textContent = displayBoard.textContent + value;
}

function updateDisplayOperation(value){
    const displayBoard = document.querySelector('.display');
    console.log(value.toString());
    displayBoard.textContent = value.toString();
    if('-Infinity'.includes(value.toString())){
        displayError(displayBoard);
    }
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
    gotOpNow: false
};



function resetMemory(){
    memory.firstNum = '';
    memory.secondNum = '';
    operation = '';
    gotOpNow = false;
}

function handleResult(){
    //display board should have the second number (or empty if nothing)
    const displayBoard = document.querySelector('.display');
    memory.secondNum = displayBoard.textContent;
    let result = operate(memory.operation, memory.firstNum, memory.secondNum);
    updateDisplayOperation(result);
    return result;
}   

function handleMemoryOperations(opButton){
    if(memory.gotOpNow == true){
        memory.operation = opButton.textContent;
        return;
    }
    if(memory.operation != ''){
        if(memory.firstNum != ''){
            let result = handleResult();
            memory.firstNum = result;
            memory.secondNum = '';
            //get the new operation after handling the last one.
            memory.operation = opButton.textContent;
        }
    }
    else{
        memory.firstNum = getDisplayNumber();
        memory.operation = opButton.textContent;
        memory.gotOpNow = true;
    }
}

function handleOperationButtons(){
    const operationsNodeList = document.querySelectorAll('.op');
    operationsNodeList.forEach((button)=>{
        button.addEventListener('click', ()=>{
            handleMemoryOperations(button);
            
        })
    })
}

function handleMemoryEquals(){
    if(memory.operation != ''){
        memory.secondNum = getDisplayNumber();
        let result = operate(memory.operation, memory.firstNum, memory.secondNum);
        updateDisplayOperation(result);
        memory.firstNum = result.toString();
        memory.operation = '';
        memory.gotOpNow = false;
    }
}

function handleEqualsButton(){
    const equalButton = document.querySelector('.equals');
    equalButton.addEventListener('click', ()=>{
        handleMemoryEquals();
    })
}

function handleClearButton(){
    const clearButton = document.querySelector('.clear');
    clearButton.addEventListener('click', () => {
        clearDisplay();
        resetMemory();
    })
}

function handleCalculator(){
    handleNumberButtons();
    handleOperationButtons();
    handleEqualsButton();
    handleClearButton();
}


handleCalculator();