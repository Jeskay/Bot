const Field = require('./field.js');

module.exports = {
    Field: null,
    currentDraught: null,
    WhitePlayer: null,
    BlackPlayer: null,
    GameStatus: null,
    showMatch(){
        return this.Field.showTable();
    },
    makeTurn(coord, newcoord){
        if(this.Field === null)
            return 'No match.';
        if(this.currentDraught != null && this.currentDraught != coord)
            return 'Previous turn must be completed.';
        if(this.Field._eatDraught(coord, newcoord)){
            if(this.Field.Endgame)
                this.GameStatus = `${this.Field[this.currentDraught]._color} wins`;
            if(this.Field.checkDraughtcaneat(newcoord))
                this.currentDraught = newcoord; 
            else this.currentDraught = null;{
                this.Field.changePlayer();
                return "Success";
            }
        }
        if(!this.Field.checkPlayercaneat()){
            if(this.Field._moveDraught(coord, newcoord))
                this.Field.changePlayer();
            else
                return "Invalid turn.";
        }
        else 
            return "There is a draight which should be eaten.";
        return "Success";
    },
    start(client, firstPlayer){
        this.Field = new Field(firstPlayer, client);
        this.GameStatus = 'In process';
        return this.Field.showTable(); 
    }
}