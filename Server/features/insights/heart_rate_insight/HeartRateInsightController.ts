//import prisma
import { PrismaClient } from '@prisma/client'
import HeartRateInsight from './HeartRateInsight'
import db from '../../../config'


class HeartRateInsightController {
    // --------------------------------Implementação para quando o banco de dados estiver pronto--------------------------------
    static async getInsight(desired_day : string, user_id : string, client_token: string, token_relogio : string) : Promise<HeartRateInsight> {
        db.$connect();
        //const heart_rate_data = await db.

        return new HeartRateInsight(desired_day, user_id, client_token, []);
    }
}

export default HeartRateInsightController;
