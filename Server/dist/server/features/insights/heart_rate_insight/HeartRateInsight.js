"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//class that will be used to represent a sleep insight for a certain day
class HeartRateInsight {
    //constructor that recieves the date the user_id and the client_token
    constructor(date, user_id, client_token, data) {
        this.date = date;
        this.user_id = user_id;
        this.client_token = client_token;
        this.data = data;
    }
}
exports.default = HeartRateInsight;
