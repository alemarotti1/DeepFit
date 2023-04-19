//import prisma
import { PrismaClient } from '@prisma/client'
import HeartRateInsight from './HeartRateInsight'
import db from '../../../config'
import * as getDataFromGoogleFit from '../../../Api/getDataFromGoogleFit';



class HeartRateInsightController {
    // --------------------------------Implementação para quando o banco de dados estiver pronto--------------------------------
    static async getInsight(desired_day : string, user_id : string, client_token: string, token_relogio : string) : Promise<HeartRateInsight> {
        //const heart_rate_data = await db.

        let token_acesso_relogio = "ya29.a0Ael9sCP8aHOtjj1IpS8uG0ShdY65ecoErrjbKdeFcxM4JJ7_1EuQiyhnDMvN1U81ZhyNdb8IAintf-SzlgxJylltJGZchrwZttsDSTn0VkXybhwx6B28e11R2T2usjOd5-nb0BGlsjcAnBiF6fKrFfWn0cpGaCgYKAXsSARMSFQF4udJhd08hJI7Hqr3LJRfrhOTWDA0163";
        let data;

        return new Promise((resolve, reject) => {
            const start_time = new Date(desired_day).getTime();
            const end_time = new Date(desired_day).getTime() + 86400000;
            getDataFromGoogleFit.getDataFromGoogleFit(token_acesso_relogio, start_time, end_time, 60000, 'derived:com.google.heart_rate.bpm:com.google.android.gms:merge_heart_rate_bpm').then((returned_data) => {
                data = returned_data;
                resolve(new HeartRateInsight(desired_day, user_id, client_token, data));
            }).catch((err) => {
                data = err;
                reject(new HeartRateInsight(desired_day, user_id, client_token, data));
            });
        });
        
        
    }
}

export default HeartRateInsightController;
