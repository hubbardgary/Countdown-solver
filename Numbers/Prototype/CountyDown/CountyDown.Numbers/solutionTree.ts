class solutionTree {
    
    public root: treeNode;
    public target: number;
    public solutions: string[][] = [];
    public originalNumbers: number[] = [];
    public closestSolutions: string[][] = [];
    public closest: number;
    public closestResults: number[] = [];

    constructor(numbers: number[], target: number) {
        
        let ops: operand[] = [];
        
        for (let i: number = 0; i < numbers.length; i++) {
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

    public buildTree(tree: treeNode) {
        if (tree == null) {
            return;
        }
        
        let pairs: operand[][] = tree.getPairs();

        let node: treeNode = new treeNode();

        for (let i = 0; i < pairs.length; i++) {

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
    }

    //private addBranch(tree: treeNode, op1: operand, op2: operand, operator: string) {
    //    if (this.isValidCalculation(op1, op2, operator)) {
    //        let node: treeNode = new treeNode();
    //        node.initialiseNode(tree, op1, op2, operator);
    //        this.buildTree(node);
    //    }
    //}

    //private isValidCalculation(op1: operand, op2: operand, operator: string): boolean {
    //    if (operator === "-")
    //        if (op1.number - op2.number <= 0)
    //            return false;
    //    if (operator == "/")
    //        if (op1.number % op2.number !== 0)
    //            return false;
    //    return true;
    //}
}