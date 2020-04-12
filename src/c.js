import Dog from "./a";

export default class PoodleDog extends Dog{
    constructor(name) {
         super();
        this.name = name;
    }
    brake() {
        console.log(this.name + '喔喔喔');
    }

};
