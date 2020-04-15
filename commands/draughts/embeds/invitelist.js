class Invite{
    get inviter(){
        return this._inviter;
    }
    get invited(){
        return this._invited;
    }
    constructor(inviter, invited){
        this._invited = invited;
        this._inviter = inviter;
    }
}
const List = new Array();
module.exports= {
    add(inviter, invited) {
        let element = new Invite(inviter, invited);
        List.push(element);
        setTimeout(function () {
            if (List.includes(element))
                List.pop(element);
        }, 30000);
    },
    delete(user) {
        const result = List.find(element => element.invited === user);
        if (result != undefined) {
            List.pop(result);
            return result;
        }
        return null;
    }
}

