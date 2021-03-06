const {FindCells, FindDraught} = require('./finders.js');
const checkDraught = function(array, x, y, draught){
    if(x < 0 || y < 0) return false;
    if(x >= array.length || y >= array[x].length) return false;
    let cell = array[x][y];
    if(cell === null || cell === undefined) return false;
    if(cell._color === draught._color) return false;
    return true;
};
const checkCell = function(array, x, y){
    if(x < 0 || y < 0) 
        return false;
    if(x >= array.length || y >= array[x].length) 
        return false;
    if(array[x][y] === null)
        return true
    else
        return false;
};
module.exports.DraughtMovement = function(field, coord){ 
        const x = coord[0];
        const y = coord[1];
        const draught = field[x][y];
        const checkcoord = function(x, y, maxX, maxY){
            if(x < 0 || x >= maxX)
                return false;
            if(y < 0 || y >= maxY)
                return false;
            return true;
        };
        if(draught === null) return null;
        if(x >= field[0].length - 1) return null;
        if(y >= field.length - 1) return null;
        let arr = new Array();
        if(draught._isDam){
            
            for(let i = 1; field[x + i][y + i] === null && checkcoord(x + i, y + i, field.length, field[0].length); i++)
                arr.push([x + i, y + i]);
            for(let i = 1; field[x + i][y - i] === null && checkcoord(x + i, y - i, field.length, field[0].length); i++)
                arr.push([x + i, y - i]);
            for(let i = 1; field[x - i][y - i] === null && checkcoord(x - i, y - i, field.length, field[0].length); i++)
                arr.push([x - i, y - i]);
            for(let i = 1; field[x - i][y + i] === null && checkcoord(x - i, y + i, field.length, field[0].length); i++)
                arr.push([x - i, y + i]);
        }
        else{
            if(draught._color === 'white'){
                if(field[x + 1][y + 1] === null && checkcoord(x + 1, y + 1, field.length, field[0].length))
                     arr.push([x + 1,y + 1]);
                if(field[x + 1][y - 1] === null && checkcoord(x + 1, y - 1, field.length, field[0].length))
                     arr.push([x + 1,y - 1]);
            }
            else{
                if(field[x - 1][y - 1] === null && checkcoord(x - 1, y - 1, field.length, field[0].length))
                     arr.push([x - 1,y - 1]);
                if(field[x - 1][y + 1] === null && checkcoord(x - 1, y + 1, field.length, field[0].length))
                     arr.push([x - 1,y + 1]);
            }
        }
        return arr;
    };
    module.exports.DraughtCanEat = function(field, coord){
        const xcoord = coord[0];//must return coordinates of the draught which must be eaten
        const ycoord = coord[1];
        const currentdraught = field[xcoord][ycoord];
        let arr = new Array();
        
        if(currentdraught._isDam){
            let endraught = FindDraught(field, xcoord, ycoord, Number(+1), Number(+1));
            if(endraught != null){
                var cells = FindCells(field, endraught[0], endraught[1], Number(+1), Number(+1));
                if(cells.length != 0) (cells).forEach((element) => {
                    arr.push([element, endraught]);
                });
            }
            endraught = FindDraught(field, xcoord, ycoord, Number(+1), Number(-1));
            if(endraught != null){
                var cells = FindCells(field, endraught[0], endraught[1], Number(+1), Number(-1));
                if(cells.length != 0) (cells).forEach((element) => {
                    arr.push([element, endraught]);
                });
            }
            endraught = FindDraught(field, xcoord, ycoord, Number(-1), Number(-1));
            if(endraught != null){
                var cells = FindCells(field, endraught[0], endraught[1], Number(-1), Number(-1));
                if(cells.length != 0) (cells).forEach((element) => {
                    arr.push([element, endraught]);
                });
            }
            endraught = FindDraught(field, xcoord, ycoord, Number(-1), Number(+1));
            if(endraught != null){
                var cells = FindCells(field, endraught[0], endraught[1], Number(-1), Number(+1));
                if(cells.length != 0) (cells).forEach((element) => {
                    arr.push([element, endraught]);
                });
            }
            }
        else{

            if(checkDraught(field, xcoord + 1, ycoord + 1, currentdraught) && checkCell(field, xcoord + 2, ycoord + 2)){
                 arr.push([[xcoord + 2,Number(ycoord + 2)], [xcoord + 1, ycoord + 1]]);
            }
            if(checkDraught(field, xcoord - 1, ycoord + 1, currentdraught) && checkCell(field, xcoord - 2, ycoord + 2)){
                 arr.push([[xcoord - 2,Number(ycoord + 2)], [xcoord - 1, ycoord + 1]]);
            }
            if(checkDraught(field, xcoord + 1, ycoord - 1, currentdraught) && checkCell(field, xcoord + 2, ycoord - 2)){ 
                arr.push([[xcoord + 2,Number(ycoord - 2)], [xcoord + 1, ycoord - 1]]);
            }
            if(checkDraught(field, xcoord - 1, ycoord - 1, currentdraught) && checkCell(field, xcoord - 2, ycoord - 2)){ 
                arr.push([[xcoord - 2,Number(ycoord - 2)], [xcoord - 1, ycoord - 1]]);
            }
        }
        return arr;
    };
    module.exports.PlayerWin = function(field, color){
        for(let j = 0; j < field.length;j++){
            for(let i = 0; i < field[j].length; i++){
                let draught = field[j][i];
                if( draught === null)
                    continue;
                else if(draught._color != color) 
                    return false;
            }
        }
        return true;
    };
    module.exports.Becomedam = function(field, coord){
        const x = coord[0];
        const y = coord[1];
        const draught = field[x][y];
        if(draught === null) return false;
        if(draught._color === 'white' && y === 0) return true;
        if(draught._color === 'black' && y === field.length - 1) return true;
        return false;
    };
    module.exports.PlayerDraught = function(field, coord, color){
        const x = coord[0];
        const y = coord[1];
        if(field[x][y] === null) 
            return false
        if(field[x][y]._color != color) 
            return false;
        return true;
    };