const Draught = require('./draught.js');

module.exports = {
    showField(field){
        let table = '   ';
        for(var i = 0; i < field[0].length;i++)
            table += String.fromCharCode(Number(65 + i)) + '   ';
        table += '\n';
        (field).forEach(function(element, index){
            table += index + ' | ';
            for(var i = 0; i < element.length; i++){
                let item = element[i];
                if(item != null && item != undefined){
                    if(item._color === 'white') table += `${item._isDam ? 'W' : 'w'} | `;
                    else table += `${item._isDam ? 'B' : ' b '} | `;
                }
                else table += ' -  | ';
            }
            table += '\n';
        });
        return table;
    },
    createfield(lenght, width){
        //filling field array
        let field = new Array(width);
        for(var i = 0; i < field.length;i++)
            field[i] = new Array(lenght)
        const border = (width - 2) / 2 * lenght;

        //placing draughts on the table
        for(var j = 0; j < width; j++){
            for(var i = 0; i < lenght; i++){
                if(j % 2 === 0){
                    if(i % 2 === 0)
                        field[j][i] = null;
                    else{
                            if(j * lenght + i < border) field[j][i] = new Draught('white');
                            else if(j * lenght + i > border + lenght * 2) field[j][i] = new Draught('black');
                            else field[j][i] = null;
                    }
                }
                else{
                    if(i % 2 != 0)
                        field[j][i] = null;
                    else{
                        if(j * lenght + i < border) field[j][i] = new Draught('white');
                        else if(j * lenght + i >= border + lenght * 2) field[j][i] = new Draught('black');
                        else field[j][i] = null;
                    }
                }
            }
        }
        return field;
    }
}