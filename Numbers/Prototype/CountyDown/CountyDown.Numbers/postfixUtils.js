var postfixUtils = (function () {
    function postfixUtils() {
    }
    postfixUtils.prototype.getPrecedence = function (operator) {
        if (operator === "")
            return 4;
        if (operator === "/")
            return 3;
        if (operator === "*")
            return 2;
        return 1;
    };
    postfixUtils.prototype.convertPostFixToInfix = function (postfix) {
        var stack = [];
        while (postfix.length > 0) {
            var x = postfix.shift();
            var num = Number(x);
            if (isNaN(num)) {
                if (stack.length < 2) {
                    throw "invalid"; // how do exceptions work in JavaScript?
                }
                var op2 = stack.pop();
                var op1 = stack.pop();
                var expr = "";
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
                stack.push(new operation(expr, x));
            }
            else {
                stack.push(new operation(x, ""));
            }
        }
        return stack.pop().expression;
    };
    return postfixUtils;
})();
//# sourceMappingURL=postfixUtils.js.map