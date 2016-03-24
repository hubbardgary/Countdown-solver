class postfixUtils {

    public getPrecedence(operator: string): number {
        if (operator === "") return 4;
        if (operator === "/") return 3;
        if (operator === "*") return 2;
        return 1;
    }

    public convertPostFixToInfix(postfix: string[]): string {
        let stack: operation[] = [];
        while (postfix.length > 0) {
            let x: string = postfix.shift();
            let num: number = Number(x);
            if (isNaN(num)) {
                if (stack.length < 2) {
                    throw "invalid";    // how do exceptions work in JavaScript?
                }
                let op2 = stack.pop();
                let op1 = stack.pop();
                let expr: string = "";

                // LHS
                if (this.getPrecedence(op1.op) < this.getPrecedence(x))
                    expr += "(" + op1.expression + ")" + x;
                else
                    expr += op1.expression + x;

                // RHS
                if (this.getPrecedence(op2.op) <= this.getPrecedence(x))
                    expr += "(" + op2.expression + ")";
                else
                    expr += op2.expression;
                stack.push(new operation(expr, x);
            } else {
                stack.push(new operation(x, ""));
            }
        }
        return stack.pop().expression;
    }

}