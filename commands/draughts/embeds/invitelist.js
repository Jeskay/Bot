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
class InviteList {
    add(inviter, invited) {
        let element = new Invite(inviter, invited);
        this.List.push(element);
        setTimeout(function () {
            if (this.List.includes(element))
                this.List.pop(element);
        }, 10000);
    }
    delete(user) {
        const result = this.List.find(element => element.invited === user);
        if (result != undefined) {
            this.List.pop(result);
            return result;
        }
        return null;
    }
    constructor() {
        this.List = new Array();
    }
}
module.exports = InviteList;

