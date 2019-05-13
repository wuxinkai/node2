function say(one,word) {
    console.log(this.name,one,word)
}
var obj = {name:'wuxinkai'};
var newSay=say.bind(obj,'hello'); //this指向obj
newSay('world');