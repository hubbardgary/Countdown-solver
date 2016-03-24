var solutionTree = (function () {
    function solutionTree(numbers, target) {
        this.solutions = [];
        this.originalNumbers = [];
        this.closestSolutions = [];
        this.closestResults = [];
        var ops = [];
        for (var i = 0; i < numbers.length; i++) {
            this.originalNumbers.push(numbers[i]);
            ops.push(new operand(numbers[i], []));
        }
        this.target = target;
        this.root = new treeNode();
        this.root.nums = ops;
        this.root.parent = null;
        this.root.operation = [];
        this.root.result = 0;
        this.root.tree = this;
        this.closest = 999999;
        this.buildTree(this.root);
    }
    solutionTree.prototype.buildTree = function (tree) {
        if (tree == null) {
            return;
        }
        var pairs = tree.getPairs();
        var node = new treeNode();
        for (var i = 0; i < pairs.length; i++) {
            // THIS IS CLEARLY MUCH NICER, BUT SEEMS TO CAUSE IT TO TAKE TWICE AS LONG
            //this.addBranch(tree, pairs[i][0], pairs[i][1], "+");
            //this.addBranch(tree, pairs[i][0], pairs[i][1], "*");
            //this.addBranch(tree, pairs[i][0], pairs[i][1], "-");
            //this.addBranch(tree, pairs[i][1], pairs[i][0], "-");
            //this.addBranch(tree, pairs[i][0], pairs[i][1], "/");
            //this.addBranch(tree, pairs[i][1], pairs[i][0], "/");
            node.initialiseNode(tree, pairs[i][0], pairs[i][1], "+");
            this.buildTree(node);
            node.initialiseNode(tree, pairs[i][0], pairs[i][1], "*");
            this.buildTree(node);
            if (pairs[i][0].number - pairs[i][1].number > 0) {
                node.initialiseNode(tree, pairs[i][0], pairs[i][1], "-");
                this.buildTree(node);
            }
            if (pairs[i][1].number - pairs[i][0].number > 0) {
                node.initialiseNode(tree, pairs[i][1], pairs[i][0], "-");
                this.buildTree(node);
            }
            if (pairs[i][1].number > 0 && pairs[i][0].number % pairs[i][1].number == 0) {
                node.initialiseNode(tree, pairs[i][0], pairs[i][1], "/");
                this.buildTree(node);
            }
            if (pairs[i][0].number > 0 && pairs[i][1].number % pairs[i][0].number == 0) {
                node.initialiseNode(tree, pairs[i][1], pairs[i][0], "/");
                this.buildTree(node);
            }
        }
    };
    return solutionTree;
})();
//# sourceMappingURL=solutionTree.js.map