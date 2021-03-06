﻿class Greeter {
    element: HTMLElement;
    span: HTMLElement;
    timerToken: number;

    constructor(element: HTMLElement) {
        this.element = element;
        this.element.innerHTML += "The time is: ";
        this.span = document.createElement('span');
        this.element.appendChild(this.span);
        this.span.innerText = new Date().toUTCString();
    }

    start() {
        this.timerToken = setInterval(() => this.span.innerHTML = new Date().toUTCString(), 500);
    }

    stop() {
        clearTimeout(this.timerToken);
    }




}

window.onload = () => {
    var target = 100;
    var el = document.getElementById('content');
    var greeter = new Greeter(el);
    greeter.start();
    
    // THE BELOW PRODUCES ANSWERS THAT ARE 6 AWAY BOTH SIDES OF TARGET
    // var solution = new solutionTree([2, 3, 4, 5, 6, 1], 666);
    var solution = new solutionTree([2, 3, 4, 5, 6, 1], 666);
    var uniqueSolutions: string[] = [];

    var pf = new postfixUtils();
    
    if (solution.closest === 0) {
        for (var s = 0; s < solution.solutions.length; s++) {
            var infix = pf.convertPostFixToInfix(solution.solutions[s]);

            if (uniqueSolutions.indexOf(infix) === -1) {
                uniqueSolutions.push(infix);
                console.log(infix);
            }
        }
    } else {
        for (var s = 0; s < solution.closestSolutions.length; s++) {
            var infix = pf.convertPostFixToInfix(solution.closestSolutions[s]);

            if (uniqueSolutions.indexOf(infix) === -1) {
                uniqueSolutions.push(infix);
                console.log(infix);
            }
        }
    }
    if (solution.closest === 0)
        console.log(uniqueSolutions.length + " solutions found.");
    else {
        console.log("No solution found. The closest is " + solution.closestResults[0] +
            (solution.closestResults.length > 1 ? " and " + solution.closestResults[1] + " which are both " : " which is ") +
            solution.closest + " away.");
    }
};