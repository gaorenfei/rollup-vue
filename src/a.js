import Animal from "./Animal";

export default class Dog extends Animal{
    constructor(name) {
        super();
        this.name = name;
    }
   
    brake() {
        console.log(this.name + '汪汪汪');
    }

};