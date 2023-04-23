/*
  Warnings:

  - The primary key for the `aluno` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `dados_corporais_aluno` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `rotina` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `dado_sono` DROP FOREIGN KEY `dado_sono_token_acesso_fkey`;

-- DropForeignKey
ALTER TABLE `dados_corporais_aluno` DROP FOREIGN KEY `dados_corporais_aluno_token_acesso_fkey`;

-- DropForeignKey
ALTER TABLE `rotina` DROP FOREIGN KEY `rotina_token_acesso_fkey`;

-- DropForeignKey
ALTER TABLE `treino` DROP FOREIGN KEY `treino_token_acesso_fkey`;

-- AlterTable
ALTER TABLE `aluno` DROP PRIMARY KEY,
    MODIFY `token_acesso` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`token_acesso`);

-- AlterTable
ALTER TABLE `dado_sono` MODIFY `token_acesso` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `dados_corporais_aluno` DROP PRIMARY KEY,
    MODIFY `token_acesso` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`data_medicao`, `token_acesso`);

-- AlterTable
ALTER TABLE `rotina` DROP PRIMARY KEY,
    MODIFY `token_acesso` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`nome_rotina`, `token_acesso`);

-- AlterTable
ALTER TABLE `treino` MODIFY `token_acesso` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `dado_sono` ADD CONSTRAINT `dado_sono_token_acesso_fkey` FOREIGN KEY (`token_acesso`) REFERENCES `aluno`(`token_acesso`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `dados_corporais_aluno` ADD CONSTRAINT `dados_corporais_aluno_token_acesso_fkey` FOREIGN KEY (`token_acesso`) REFERENCES `aluno`(`token_acesso`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rotina` ADD CONSTRAINT `rotina_token_acesso_fkey` FOREIGN KEY (`token_acesso`) REFERENCES `aluno`(`token_acesso`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `treino` ADD CONSTRAINT `treino_token_acesso_fkey` FOREIGN KEY (`token_acesso`) REFERENCES `aluno`(`token_acesso`) ON DELETE RESTRICT ON UPDATE CASCADE;
