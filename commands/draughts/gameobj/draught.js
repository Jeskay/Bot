class Draught{

    becomeDam(){
        this.IsDam = true;
    }
    get _isDam(){
        return this.IsDam;
    }
    get _color(){
        return this.color;
    }
    constructor(color){
        this.color = color;
        this.IsDam = false;
    }
}
module.exports = Draught;