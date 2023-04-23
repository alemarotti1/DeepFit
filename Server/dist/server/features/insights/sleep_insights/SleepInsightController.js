"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
//import prisma
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class SleepInsightController {
    // --------------------------------Implementação para quando o banco de dados estiver pronto--------------------------------
    static getInsight(desired_day, user_id, client_token) {
        return __awaiter(this, void 0, void 0, function* () {
            //connect to the database
            const connection = prisma.$connect();
            try {
                //get the sleep data from the database
                // SELECT * FROM treinador T, aluno A, dado_sono D where T.usuario = ? AND A.token_acesso = ? AND D.Aluno_tokenAcesso = A.token_acesso AND D.data_coleta = ?", [client_token, user_id, desired_day]
                const sleep_data = yield prisma.dado_sono.findFirstOrThrow({
                    where: {
                        AND: [
                            { token_acesso: user_id },
                            { data_coleta: desired_day },
                            {}
                        ]
                    }
                });
                //disconnect from the database
                yield prisma.$disconnect();
                //return the sleep data
                //const return_data = new SleepInsight(sleep_data.data_coleta,sleep_data.token_acesso, );
            }
            catch (e) {
                console.log(e);
                return null;
            }
            return null;
        });
    }
}
