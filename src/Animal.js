export default class Animal {
  constructor(name) {
    this.name = name;
  }
  run() {
    console.log("i am run");
  }
  brake() {
    console.log("i am brake");
  }
}

// function Animal(name){
//     this.name = name
// }

// Animal.prototype.run = function(){
//     console.log(`i am run`)
// }
// Animal.prototype.brake = function(){
//     console.log(`i am run`)
// }
