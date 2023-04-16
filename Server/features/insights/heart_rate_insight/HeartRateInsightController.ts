//import prisma
import { PrismaClient } from '@prisma/client'
import HeartRateInsight from './HeartRateInsight'
import db from '../../../config'
import * as getDataFromGoogleFit from '../../../Api/getDataFromGoogleFit';



class HeartRateInsightController {
    // --------------------------------Implementação para quando o banco de dados estiver pronto--------------------------------
    static async getInsight(desired_day : string, user_id : string, client_token: string, token_relogio : string) : Promise<HeartRateInsight> {
        //const heart_rate_data = await db.

        let token_acesso_relogio = "ya29.a0Ael9sCNOA2ukcv8hVyw122lld24Urv3ziKIKYlAe2Ca_9Ok21hkHvyq5er2WYt-IeyhIwqtD_5Oh0lL1oLBrJzboAH6bklR1eqLG-C3O5Nba80ekhJM8EsKl6wTZW4XLRYIsJlcO6q7SYaKKmYHvw0-s37hXaCgYKAUwSARISFQF4udJhlzxQrgdnS-MK07BsdwkGZQ0163";
        let data;

        return new Promise((resolve, reject) => {
            getDataFromGoogleFit.getDataFromGoogleFit(token_acesso_relogio, 1680318000000, 1681141293355, 86400000, 'raw:com.google.heart_rate.bpm:com.xiaomi.hm.health:GoogleFitSyncHelper - heartrate').then((returned_data) => {
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
