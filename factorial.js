const { parentPort } = require('worker_threads');

/**
 * Calculate factorial of a given number
 * @param - number
 * @returns - factirial number
 */
const getFactorial = (number) => {
    if (number === 1) return 1
    return number * getFactorial(number - 1);
}

//Parent thread listener
parentPort.on('message', (number) => {
    if (number) {
        const answer = getFactorial(number);
        //Emitting Data to Parent thread
        parentPort.postMessage("The factoirial of " + number + " is " + answer);
    }
})
