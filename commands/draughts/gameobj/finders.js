module.exports = {
    checkcoord(x, y, maxX, maxY){
        if(x < 0 || x >= maxX)
                return false;
            if(y < 0 || y >= maxY)
                return false;
            return true;
    },
    findDraught(table, xcoord, ycoord, firstDirection, secondDirection){
        const color = table[xcoord][ycoord]._color;
        for(let i = 1; this.checkcoord(xcoord + i*firstDirection, ycoord + i*secondDirection, table.length, table[0].length); i++){
            let cell = table[xcoord + i*firstDirection][ycoord + i*secondDirection];
            if(cell != null){
                if(cell._color != color)
                    return [xcoord + i*firstDirection, ycoord + i*secondDirection];
                else
                    return null;
            }        
        }
        return null;
    },
    findCells(table, xcoord, ycoord, firstDirection, secondDirection){
        let arr = new Array();
        for(let i = 1; this.checkcoord(xcoord + i*firstDirection, ycoord + i*secondDirection, table.length, table[0].length); i++){
            if(table[xcoord + i*firstDirection][ycoord + i*secondDirection] != null) return arr;
            arr.push([xcoord + i*firstDirection, ycoord + i*secondDirection]);
        }
        return arr;
    }
}