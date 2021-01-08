class Stack{
    constructor(){
        this.data = [];
        this.top = 0;
    }

    push(session){
        this.data[this.top] = session;
        this.top = this.top + 1;
        console.log(session)
    }

    pop(){
        this.top = this.top-1;
        return this.data.pop();
    }

    isEmpty(){
        return this.top === 0;
    }
    
    peek() {
        return this.data[this.top-1];
     }
}

module.exports = Stack;

