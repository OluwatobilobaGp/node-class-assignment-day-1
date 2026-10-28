import readline from 'readline/promises';
import { stdin as input, stdout as output } from 'node:process';

// Initialize readline interface
const rl = readline.createInterface({ input, output });

//calculator Operations 
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => {
    if (b === 0) throw new Error("Division by zero is not allowed.");
    return a / b;
};

async function promptNumber(message) {
    while (true) {
        const inputStr = await rl.question(message);
        const num = parseFloat(inputStr.trim());
        if (!isNaN(num)) {
            return num;
        }
        console.log("❌ Invalid number. Please enter a valid numeric value.");
    }


}

async function runCalculator() {
    console.log("==============================");
    console.log("   CLI CALCULATOR (Node.js)   ");
    console.log("==============================\n");

    let continueCalc = true;

    while (continueCalc) {
        console.log("Select an operation:");
        console.log("  1. Addition (+)");
        console.log("  2. Subtraction (-)");
        console.log("  3. Multiplication (*)");
        console.log("  4. Division (/)");
        console.log("  5. Exit");

        const choice = await rl.question("\nEnter your choice (1-5): ");

        if (choice.trim() === '5') {
            console.log("\nGoodbye!");
            break;
        }

        if (!['1', '2', '3', '4'].includes(choice.trim())) {
            console.log("\n❌ Invalid choice. Please choose between 1 and 5.\n");
            continue;
        }

        try {
            const num1 = await promptNumber("Enter first number: ");
            const num2 = await promptNumber("Enter second number: ");
            let result;

            switch (choice.trim()) {
                case '1':
                    result = add(num1, num2);
                    console.log(`\nResult: ${num1} + ${num2} = ${result}\n`);
                    break;
                case '2':
                    result = subtract(num1, num2);
                    console.log(`\nResult: ${num1} - ${num2} = ${result}\n`);
                    break;
                case '3':
                    result = multiply(num1, num2);
                    console.log(`\nResult: ${num1} * ${num2} = ${result}\n`);
                    break;
                case '4':
                    result = divide(num1, num2);
                    console.log(`\nResult: ${num1} / ${num2} = ${result}\n`);
                    break;
            }
        } catch (error) {
            console.log(`\n❌ Error: ${error.message}\n`);
        }

        const again = await rl.question("Do you want to perform another calculation? (y/n): ");
        if (again.trim().toLowerCase() !== 'y') {
            console.log("\nGoodbye!");
            continueCalc = false;
        } else {
            console.log("\n--------------------------------\n");
        }
    }

    rl.close();
}

// Run the application
runCalculator();