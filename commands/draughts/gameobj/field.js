const Controller = require('./tablecontroller');
const Checker    = require('./checkers.js');
const { RichEmbed } = require('discord.js');

class Field{
    changePlayer(){
        if(this.currentPlayer === 'white')
            this.currentPlayer = 'black';
        else
            this.currentPlayer = 'white';
    }
    showTable(){
        return Controller.showField(this.draughts);
    }
    _eatDraught(coord, newcoord){
        let draught = this.draughts[coord[0]][coord[1]];
        if(!Checker.checkPlayerdraught(this.draughts, coord, this.currentPlayer)) return false;
        if(draught === null) return false;
        //cheking for the draught
        const moves = Checker.checkDraughcaneat(this.draughts, coord);
        if(moves === null) return false;
        const move = moves.find(item => item[0][0] === newcoord[0] && item[0][1] === newcoord[1]);
        if( move === undefined) return false;

        this.draughts[coord[0]][coord[1]] = null;
        this.draughts[move[1][0]][move[1][1]] = null;
        this.draughts[move[0][0]][move[0][1]] = draught;
        if(Checker.checkPlayerWin(this.draughts, draught._color)) 
            this.Endgame = true;
        return true;
    }
    checkPlayercaneat(){
        for(let j = 0; j < this.draughts.length;j++)
            for(let i = 0;i < this.draughts[j].length; i++){
                if(this.draughts[j][i] === null) continue;
                if(this.draughts[j][i]._color != this.currentPlayer) continue;
                const move = Checker.checkDraughcaneat(this.draughts, [j, i]);
                if(move.length > 0)
                    return true;
            }
        return false;
    }
    checkDraughtcaneat(coord){
       return Checker.checkDraughcaneat(this.draughts, coord);
    }
    _moveDraught(coord, newcoord){
        let draught = this.draughts[coord[0]][coord[1]];
        if(!Checker.checkPlayerdraught(this.draughts, coord, this.currentPlayer)) return false;
        if(draught === null) return false; 
        //check the move
        const moves = Checker.checkDraughtmovement(this.draughts, coord);
        if(moves === null) return false;

        if(moves.find(item => item[0] === newcoord[0] && item[1] === newcoord[1]) === undefined) return false;

        this.draughts[coord[0]][coord[1]] = null;
        if(Checker.checkBecomedam(this.draughts, newcoord))
            draught._isDam = true;
        this.draughts[newcoord[0]][newcoord[1]] = draught;

        return true;
    }
    constructor(player, client){
        //filling strings of white draughts
        const x = 8;
        const y = 8;
        //filling field array
        this.draughts = Controller.createfield(x, y);
        this.client = client;
        this.currentPlayer = player;
        this.Endgame = false;
    }
}
module.exports = Field;