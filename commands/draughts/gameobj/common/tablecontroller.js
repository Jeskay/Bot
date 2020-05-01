const Draught = require('../draught.js');
const {Emojis} = require('../emojis.js');
module.exports = {
    showField(field){
        let table = Emojis.bordercell;
        for(var i = 0; i < field[0].length;i++)
            table += `:regional_indicator_${String.fromCharCode(Number(97 + i))}:`;
        table += Emojis.bordercell + '\n';
        (field).forEach(function(element, index){
            table += Emojis.numbers[index];
            for(var i = 0; i < element.length; i++){
                let item = element[i];
                if(item != null && item != undefined){
                    if(item._color === 'white') 
                        table += item._isDam ? Emojis.whitedam : Emojis.whitedraught;
                    else
                        table += item._isDam ? Emojis.blackdam : Emojis.blackdraught;
                }
                else{
                    if(index % 2 == 0)
                        table += i % 2 === 0 ? Emojis.whitecell : Emojis.blackcell;
                    else
                        table += i % 2 != 0 ? Emojis.whitecell : Emojis.blackcell;
                }
            }
            table += Emojis.bordercell + '\n';
        });
        for(var i = 0; i < field[0].length + 2;i++)
            table += Emojis.bordercell;
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