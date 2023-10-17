let displayValue = '0';
let operator = '';
let firstOperand = null;

function updateDisplay() {
    const display = document.getElementById('display');
    display.textContent = displayValue;
}

function appendNumber(number) {
    if (displayValue === '0') {
        displayValue = number;
    } else {
        displayValue += number;
    }
    updateDisplay();
}

function appendDecimal() {
    if (!displayValue.includes('.')) {
        displayValue += '.';
        updateDisplay();
    }
}

function clearDisplay() {
    displayValue = '0';
    operator = '';
    firstOperand = null;
    updateDisplay();
}

function setOperator(op) {
    if (firstOperand === null) {
        firstOperand = parseFloat(displayValue);
    } else if (operator) {
        const result = calculate(firstOperand, parseFloat(displayValue), operator);
        displayValue = String(result);
        firstOperand = result;
    }
    operator = op;
    displayValue = '0';
    updateDisplay();
}

function calculate(firstOperand, secondOperand, op) {
    switch (op) {
        case '+':
            return firstOperand + secondOperand;
        case '-':
            return firstOperand - secondOperand;
        case '*':
            return firstOperand * secondOperand;
        case '/':
            return firstOperand / secondOperand;
        default:
            return secondOperand;
    }
}

function calculateResult() {
    if (operator && firstOperand !== null) {
        const result = calculate(firstOperand, parseFloat(displayValue), operator);
        displayValue = String(result);
        operator = '';
        firstOperand = null;
        updateDisplay();
    }
}

const numberButtons = document.querySelectorAll('.operator:not(.operator):not(=.operator)');
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        appendNumber(button.textContent);
    });
});

document.querySelector('.operator[.=]').addEventListener('click', appendDecimal);

document.querySelector('.operator[C]').addEventListener('click', clearDisplay);

const operatorButtons = document.querySelectorAll('.operator:not([.=]):not([C])');
operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        setOperator(button.textContent);
    });
});

document.querySelector('.operator[=]').addEventListener('click', calculateResult);
