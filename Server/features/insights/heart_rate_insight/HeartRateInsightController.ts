//import prisma
import { PrismaClient } from '@prisma/client'
import HeartRateInsight from './HeartRateInsight'
import db from '../../../config'
import * as getDataFromGoogleFit from '../../../Api/getDataFromGoogleFit';



class HeartRateInsightController {
    // --------------------------------Implementação para quando o banco de dados estiver pronto--------------------------------
    static async getInsight(desired_day : string, user_id : string, client_token: string, token_relogio : string) : Promise<HeartRateInsight> {
        //const heart_rate_data = await db.

        let token_acesso_relogio = "ya29.a0Ael9sCPGjOE4GU8Ii6w7v30R7MNSdfdXKqp1Rk4S1P2YWo9eMc-qFHGkMKMy8HLRXnUzw0bJK3j2OHJ2HQ-wTO1abBbKuUp_ypos5GiQ2P1TD77l1dyJ3UuwRLJd7hE6JDcKcoSG94fp-q1JEdKM8dgOFHKDaCgYKAdoSARISFQF4udJhEzZkFGhugR67Da8LDtS7UQ0163";
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
