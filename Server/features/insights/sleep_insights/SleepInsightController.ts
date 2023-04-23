//import prisma
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

class SleepInsightController {
    // --------------------------------Implementação para quando o banco de dados estiver pronto--------------------------------
    static async getInsight(desired_day : string, user_id : string, client_token: string) : Promise<SleepInsight | null> {
        //connect to the database
        const connection = prisma.$connect();
        
        try{
            //get the sleep data from the database
            // SELECT * FROM treinador T, aluno A, dado_sono D where T.usuario = ? AND A.token_acesso = ? AND D.Aluno_tokenAcesso = A.token_acesso AND D.data_coleta = ?", [client_token, user_id, desired_day]
            const sleep_data = await prisma.dado_sono.findFirstOrThrow({
                where: {
                    AND: [
                        {token_acesso: user_id},
                        {data_coleta: desired_day},
                        {}
                    ]
                }
            });
            //disconnect from the database
            await prisma.$disconnect();
            //return the sleep data
            //const return_data = new SleepInsight(sleep_data.data_coleta,sleep_data.token_acesso, );
        }catch (e) {
            console.log(e);
            return null;
        }
        return null;
    }
}