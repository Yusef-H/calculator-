
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
    return +result.toFixed(2);
}

// Calculator memory.
let memory = {
    firstNum: '',
    secondNum: '',
    operation: '',
    gotOpNow: false
};



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
    //If there's an error on display.
    if(errorCheck(displayBoard)){
        clearDisplay();
        resetMemory();
        return false; //can continue since we cleared the error.
    }
    //check for max length error occurring.
    if(!displayLengthCheck(displayBoard)){
        displayError(displayBoard);
        return true; //cant continue we cant display number after error
    }
}

/**
 * This function updates the display for number buttons input.
 */
function updateDisplayNumber(value){
    // If there's an operation click before then we clear display
    // to enter second operand number.
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

/**
 * This function updates the display for operation buttons input.
 */
function updateDisplayOperation(op){
    const displayBoard = document.querySelector('.display');
    displayBoard.textContent = op.toString();
    handleError(displayBoard);
    if('-Infinity'.includes(op.toString())){
        displayError(displayBoard);
    }
}

// Empty display check
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


function resetMemory(){
    memory.firstNum = '';
    memory.secondNum = '';
    operation = '';
    gotOpNow = false;
}


function handleResultOperation(){
    //display board should have the second number (or empty if nothing)
    const displayBoard = document.querySelector('.display');
    memory.secondNum = displayBoard.textContent;
    let result = operate(memory.operation, memory.firstNum, memory.secondNum);
    updateDisplayOperation(result);
    return result;
}   

/**
 * This function handles the memory after we get an operation
 * button clicked.
 */
function handleMemoryOperations(opButton){
    if(memory.gotOpNow == true){
        memory.operation = opButton.textContent;
        return;
    }
    if(memory.operation != ''){
        if(memory.firstNum != ''){
            let result = handleResultOperation();
            memory.firstNum = result;
            memory.secondNum = '';
            //get the new operation after handling the last one.
            memory.operation = opButton.textContent;
            memory.gotOpNow = true;
        }
        else{
            //Just forget the operation since theres no first operand..
            memory.operation = '';
            memory.gotOpNow = false;
        }
    }
    else{
        if(getDisplayNumber() == ''){
            // do nothing since there's no operand.    
        }
        else{
            // save first operand.
            memory.firstNum = getDisplayNumber();
            memory.operation = opButton.textContent;
            memory.gotOpNow = true;
        }
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

function handleOperationButtons(){
    const operationsNodeList = document.querySelectorAll('.op');
    operationsNodeList.forEach((button)=>{
        button.addEventListener('click', ()=>{
            handleMemoryOperations(button); 
        })
    })
}

/**
 * This function handles the memory after clicking equals button.
 */
function handleMemoryEquals(){
    if(memory.operation != ''){
        memory.secondNum = getDisplayNumber();
        let result = operate(memory.operation, memory.firstNum, memory.secondNum);
        updateDisplayOperation(result);
        // Set the result as memory first number so we can continue later.
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