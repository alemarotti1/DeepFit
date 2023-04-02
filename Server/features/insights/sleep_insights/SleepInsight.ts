//class that will be used to represent a sleep insight for a certain day
class SleepInsight {

    //instance variables
    public date : string;
    public user_id : string;
    public client_token : string;
    public title : string;
    public description : string;
    public grade : string;
    public sleep_hours : number;


    //constructor that recieves the date the user_id and the client_token
    constructor(date : string, user_id : string, client_token: string, sleep_hours : number) {
        this.date = date;
        this.user_id = user_id;
        this.client_token = client_token;
        this.sleep_hours = sleep_hours;
        this.title = "Insight do sono do dia " + date;
        this.description = "O sono na noite passada foi muito bom" + "você pode recomendar um exercício mais pesado hoje";
        this.grade = "Ótimo";
    }

}

module.exports = SleepInsight;
