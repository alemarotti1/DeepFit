class SleepInsightController {
    // --------------------------------Implementação para quando o banco de dados estiver pronto--------------------------------
    // static async getInsight(desired_day : string, user_id : string, client_token: string) : Promise<SleepInsight> {
    //     //declare the promise
    //     const promise = new Promise<SleepInsight>((resolve, reject) => {
    //         const connection = db.createConnection({
    //             host: 'localhost',
    //             user: 'root',
    //             password: 'root',
    //             database: 'DeepFit'
    //         });
    //         connection.connect(function(err:any) {
    //             if (err) throw err;
    //             console.log("Connected!");
    //         });
    //         //get the sleep data from the database
    //         connection.query("SELECT * FROM treinador T, aluno A, dado_sono D where T.usuario = ? AND A.token_acesso = ? AND D.Aluno_tokenAcesso = A.token_acesso AND D.data_coleta = ?", [client_token, user_id, desired_day], function (err:any, result:any) {
    //             if (err) reject(err);
    //             //return the insight
    //             const required_insight = new SleepInsight(desired_day, user_id, client_token, result[0].horas_sono);
    //             resolve(required_insight);
    //         });
    //     });
    //     return promise;

    // }

    // --------------------------------Implementação para quando o banco de dados não estiver pronto--------------------------------
    static async getInsight(desired_day : string, user_id : string, client_token: string) : Promise<SleepInsight> {
        //declare the promise
        const promise = new Promise<SleepInsight>((resolve, reject) => {
            //return the insight
            const required_insight = new SleepInsight(desired_day, user_id, client_token, 8);
            resolve(required_insight);
        });
        return promise;

    }
}