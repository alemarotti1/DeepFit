//class that will be used to represent a sleep insight for a certain day
class HeartRateInsight {

    //instance variables
    public date : string;
    public user_id : string;
    public client_token : string;
    public data : string[];

    //constructor that recieves the date the user_id and the client_token
    constructor(date : string, user_id : string, client_token: string, data : any) {
        this.date = date;
        this.user_id = user_id;
        this.client_token = client_token;
        this.data = data;
    }

}

export default HeartRateInsight;
