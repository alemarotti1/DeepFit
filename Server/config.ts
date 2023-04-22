import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();
const hashNumber = 7;
const secret_key = "a0Ael9sCP8aHOtjj1IpS8uG0ShdY65ecoErrjbKdeFcxM4JJ7_1EuQiyhnDMvN1U81ZhyNdb8IAintf";

export default db;
export { hashNumber, secret_key };