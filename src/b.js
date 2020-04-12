import Animal from "./Animal";

export default class Cat extends Animal{
    constructor(name) {
        super();
        this.name = name;
    }
   
    brake() {
        console.log(this.name + 'miao miao miao');
    }

};
