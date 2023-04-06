//import prisma
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

class SleepInsightController {
    // --------------------------------Implementação para quando o banco de dados estiver pronto--------------------------------
    static async getInsight(desired_day : string, user_id : string, client_token: string) : Promise<SleepInsight> {
        //declare the promise
        const promise = new Promise<SleepInsight>((resolve, reject) => {
            //connect to the database
            const connection = prisma.$connect();

            //get the sleep data from the database
            // SELECT * FROM treinador T, aluno A, dado_sono D where T.usuario = ? AND A.token_acesso = ? AND D.Aluno_tokenAcesso = A.token_acesso AND D.data_coleta = ?", [client_token, user_id, desired_day]
            try{
                const sleep_data = await prisma.dado_sono.findFirstOrThrow({
                    where: {
                        AND: [
                            {token_acesso: parseInt(user_id)},
                            {data_coleta: desired_day},
                            {Treinador_usuario: client_token}
                        ]
            }
        });
        return promise;

    }
}