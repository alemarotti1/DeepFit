
class Treinador {
    username: string;
    cpf: string;
    email : string;
    nome : string;
    cref : string;

    constructor(username: string, cpf: string, email : string, nome : string, cref : string) {
        this.username = username;
        this.cpf = cpf;
        this.email = email;
        this.nome = nome;
        this.cref = cref;
    }

}

export default Treinador;