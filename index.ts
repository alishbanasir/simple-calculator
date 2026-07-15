#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";

// 2 سیکنڈ کا انتظار کرنے کے لیے ایک ہیلپر فنکشن
const sleep = () => new Promise((res) => setTimeout(res, 2000));

// ویلکم اینیمیشن
async function welcome() {
    let rainbowTitle = chalkAnimation.rainbow("=== Simple Calculator CLI ===");
    await sleep();
    rainbowTitle.stop();
    console.log(chalk.yellow(`
 _____________________
|  _________________  |
| | JO           0. | |
| |_________________| |
|  ___ ___ ___   ___  |
| | 7 | 8 | 9 | | + | |
| |___|___|___| |___| |
| | 4 | 5 | 6 | | - | |
| |___|___|___| |___| |
| | 1 | 2 | 3 | | x | |
| |___|___|___| |___| |
| | . | 0 | = | | / | |
| |___|___|___| |___| |
|_____________________|
    `));
}

// مین کیلکولیٹر فنکشن
async function askQuestions() {
    const answer = await inquirer.prompt([
        { 
            message: chalk.cyan("Enter your firstNumber:"), 
            type: "number", 
            name: "firstNumber" 
        },
        { 
            message: chalk.cyan("Enter your secondNumber:"), 
            type: "number", 
            name: "secondNumber" 
        },
        {
            message: chalk.magenta("Select one of the operators to perform operation:"),
            type: "list",
            name: "operator",
            choices: ["Addition", "Subtraction", "Multiplication", "Division"],
        },
    ]);

    // کیلکولیشن اور کلر فل آؤٹ پٹ
    if (answer.operator === "Addition") {
        console.log(chalk.bold.greenBright(`\nResult: ${answer.firstNumber} + ${answer.secondNumber} = ${answer.firstNumber + answer.secondNumber}`));
    } else if (answer.operator === "Subtraction") {
        console.log(chalk.bold.greenBright(`\nResult: ${answer.firstNumber} - ${answer.secondNumber} = ${answer.firstNumber - answer.secondNumber}`));
    } else if (answer.operator === "Multiplication") {
        console.log(chalk.bold.greenBright(`\nResult: ${answer.firstNumber} * ${answer.secondNumber} = ${answer.firstNumber * answer.secondNumber}`));
    } else if (answer.operator === "Division") {
        if (answer.secondNumber === 0) {
            console.log(chalk.bold.red("\nError: Division by zero is not allowed!"));
        } else {
            console.log(chalk.bold.greenBright(`\nResult: ${answer.firstNumber} / ${answer.secondNumber} = ${answer.firstNumber / answer.secondNumber}`));
        }
    } else {
        console.log(chalk.red("Please select a valid operator"));
    }

    console.log(chalk.yellow("\nTHE END\n"));
}

// پروگرام چلانے کے لیے ترتیب
await welcome();
await askQuestions();