import Treinador from '../../../general_classes/Treinador';
import db from '../../config';
import * as bcrypt from 'bcrypt';



class TreinadorController {
    
    static async getTreinador(username: string, password: string) : Promise<boolean | Treinador> {
        await db.$connect();
        let senha = '';
        const treinador = await db.treinador.findUnique({
            where: {
                usuario: username
            }  
        });
        if (treinador?.senha) senha = treinador.senha;
        
        if (bcrypt.compareSync(password, senha)) {
            if (treinador?.email && treinador?.CPF && treinador?.nome && treinador?.CREF) {
                return new Treinador(username, treinador.CPF, treinador.email, treinador.nome, treinador.CREF);
            }
        }

        

        return false;
    }

    static async createTreinador(treinador : Treinador, password : string) : Promise<boolean> {

        await db.$connect();
        const treinadorExists = await db.treinador.findUnique({
            where: {
                usuario: treinador.username
            }  
        });
        if (treinadorExists) return false;

        let salt_rounds = 7;
        if (process.env.SALT_ROUNDS) salt_rounds = parseInt(process.env.SALT_ROUNDS);

        const hashedPassword = bcrypt.hashSync(password, salt_rounds);

        await db.treinador.create({
            data: {
                usuario: treinador.username,
                senha: hashedPassword,
                CPF: treinador.cpf,
                email: treinador.email,
                nome: treinador.nome,
                CREF: treinador.cref
            }
        });

        db.$disconnect();
        return true;
    }


    static async updateTreinador(treinador : Treinador) : Promise<boolean> {
        
        await db.$connect();
        const treinadorExists = await db.treinador.findUnique({
            where: {
                usuario: treinador.username
            }  
        });
        if (!treinadorExists) return false;

        await db.treinador.update({
            where: {
                usuario: treinador.username
            },
            data: {
                usuario: treinador.username,
                CPF: treinador.cpf,
                email: treinador.email,
                nome: treinador.nome,
                CREF: treinador.cref
            }
        });

        db.$disconnect();
        return true;
    }

    static async deleteTreinador(username : string, password : string) : Promise<boolean> {
        db.$connect();

        let pass = bcrypt.hashSync(password, process.env.SALT_ROUNDS ? parseInt(process.env.SALT_ROUNDS) : 7);

        let check = await db.treinador.findFirst({
            where: {
                usuario: username,
                senha: pass
            }
        });

        if (!check) return false;

        const treinador = await db.treinador.delete({
            where: {
                usuario: username,
            }
        });

        db.$disconnect();
        return true;

    }


    
}