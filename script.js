document.addEventListener('DOMContentLoaded', () => {
    const display = document.querySelector('.display');
    const buttons = document.querySelectorAll('input[type="button"]');
    
    let currentInput = '';
    let previousInput = '';
    let operator = null;

    // Function to update the display
    const updateDisplay = () => {
        display.value = currentInput || '0';
    };

    // Function to handle button clicks
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.value;

            // Clear the display
            if (value === 'AC') {
                currentInput = '';
                previousInput = '';
                operator = null;
                updateDisplay();
                return;
            }

            // Delete last character
            if (value === 'DE') {
                currentInput = currentInput.slice(0, -1);
                updateDisplay();
                return;
            }

            // Handle operators
            if (['+', '-', '*', '/'].includes(value)) {
                if (currentInput === '') return; // Don't allow empty input before an operator
                if (previousInput !== '') {
                    calculate();
                }
                operator = value;
                previousInput = currentInput;
                currentInput = '';
                return;
            }

            // Handle the equal button
            if (value === '=') {
                if (previousInput !== '' && currentInput !== '') {
                    calculate();
                    operator = null;
                    previousInput = '';
                }
                return;
            }

            // Handle decimal point
            if (value === '.') {
                if (!currentInput.includes('.')) {
                    currentInput += '.';
                }
                updateDisplay();
                return;
            }

            // Handle regular number input
            currentInput += value;
            updateDisplay();
        });
    });

    // Function to perform calculations
    const calculate = () => {
        if (previousInput === '' || currentInput === '') return;

        let result;
        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);

        switch (operator) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            case '/':
                if (current === 0) {
                    result = 'Error'; // Division by zero
                } else {
                    result = prev / current;
                }
                break;
            default:
                return;
        }

        currentInput = result.toString();
        operator = null;
        previousInput = '';
        updateDisplay();
    };

    updateDisplay(); // Initial call to set display to 0
});