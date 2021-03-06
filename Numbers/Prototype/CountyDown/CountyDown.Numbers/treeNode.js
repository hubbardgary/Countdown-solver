var treeNode = (function () {
    function treeNode() {
        this.children = [];
    }
    treeNode.prototype.initialiseNode = function (parent, op1, op2, action) {
        this.parent = parent;
        this.nums = parent.nums.slice();
        this.children = [];
        this.action = action;
        // Always try to link node back to tree source
        if (parent != null) {
            this.tree = parent.tree;
        }
        this.removeFromNums(op1);
        this.removeFromNums(op2);
        switch (action) {
            case "+":
                this.result = op1.number + op2.number;
                break;
            case "*":
                this.result = op1.number * op2.number;
                break;
            case "-":
                if (op1.number - op2.number < 0)
                    this.result = null;
                else
                    this.result = op1.number - op2.number;
                break;
            case "/":
                if (op1.number % op2.number != 0)
                    this.result = null;
                else
                    this.result = op1.number / op2.number;
                break;
        }
        var newOp = this.storeLatestResult(op1, op2);
        this.nums.push(newOp);
        this.parent.children.push(this);
        this.updateSolutions(newOp);
    };
    treeNode.prototype.removeFromNums = function (item) {
        for (var i = 0; i < this.nums.length; i++) {
            if (this.nums[i].number == item.number && this.nums[i].rpn == item.rpn) {
                this.nums.splice(i, 1);
                return;
            }
        }
    };
    treeNode.prototype.storeLatestResult = function (op1, op2) {
        var newOp = new operand(this.result, []);
        if (op1.rpn == null || op1.rpn.length === 0)
            newOp.rpn.push(op1.number.toString());
        else
            newOp.rpn.push.apply(newOp.rpn, op1.rpn);
        if (op2.rpn == null || op2.rpn.length === 0)
            newOp.rpn.push(op2.number.toString());
        else
            newOp.rpn.push.apply(newOp.rpn, op2.rpn);
        newOp.rpn.push(this.action);
        return newOp;
    };
    treeNode.prototype.updateSolutions = function (newOp) {
        if (this.result === this.tree.target) {
            this.tree.solutions.push(newOp.rpn);
            this.tree.closest = 0; // we've found the solution, so don't populate closestSolution any more
        }
        else if (this.tree.closest !== 0 && Math.abs(this.result - this.tree.target) <= this.tree.closest) {
            if (Math.abs(this.result - this.tree.target) < this.tree.closest) {
                this.tree.closestSolutions = [];
                this.tree.closestResults = [];
            }
            this.tree.closestSolutions.push(newOp.rpn);
            this.tree.closest = Math.abs(this.result - this.tree.target);
            if (this.tree.closestResults.indexOf(this.result) === -1)
                this.tree.closestResults.push(this.result);
        }
    };
    treeNode.prototype.getPairs = function () {
        var results;
        results = [];
        for (var i = 0; i < this.nums.length; i++) {
            for (var j = i + 1; j < this.nums.length; j++) {
                var ops = [];
                ops[0] = this.nums[i];
                ops[1] = this.nums[j];
                results[results.length] = ops;
            }
        }
        return results;
    };
    return treeNode;
})();
//# sourceMappingURL=treeNode.js.map