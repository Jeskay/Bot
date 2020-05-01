const Field = require('./field.js');
module.exports = {
    matches: new Array(),
    add(client, firstPlayer, Whiteplayer, Blackplayer){
        if(this.matches.find(element => element.Blackplayer === Whiteplayer || element.Whiteplayer === Whiteplayer))
            return "You can play only one game at the same time.";
        if(this.matches.find(element => element.Blackplayer === Blackplayer || element.Whiteplayer === Blackplayer))
            return "This user is playing another game right now.";
        const match = new Match(client, firstPlayer, Whiteplayer, Blackplayer);
        this.matches.push(match);
        return match.showMatch();
    },
    delete(user){
        this.matches.pop(element => (element.Whiteplayer == user || element.Blackplayer == user));
    },
    turn(coord, newcoord, user){
        const result = this.matches.findIndex(element => (element.Whiteplayer == user || element.Blackplayer == user));
        if(result === -1)
            return "you are not participate in game.";
        const callback = this.matches[result].makeTurn(coord, newcoord, this.matches[result].Blackplayer === user ? 'black' : 'white');
        if(callback === "Success")
            return this.matches[result].showMatch();
            if(this.matches[result].Endgame)
                this.delete(user);
        return callback;
    }
}
class Match{
    showMatch(){
        return this.Field.showTable();
    }
    makeTurn(coord, newcoord, player){
        if(this.Field.currentPlayer != player)
            return 'Not Your turn.';
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
    }
    constructor(client, firstPlayer, Whiteplayer, Blackplayer){
        this.Field = new Field(firstPlayer, client);
        this.GameStatus = 'In process';
        this.Whiteplayer = Whiteplayer;
        this.Blackplayer = Blackplayer;
        return this.Field.showTable(); 
    }
}