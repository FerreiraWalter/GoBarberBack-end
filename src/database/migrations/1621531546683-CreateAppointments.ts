import {MigrationInterface, QueryRunner, Table} from "typeorm";

export default class CreateAppointments1621531546683 implements MigrationInterface {

    // O quer q a gnt quer q seja feito quando a Migrations for exercutada
    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
          new Table({
            name: "appointments",
            columns: [
              {
                name: 'id',
                type: 'varchar',
                isPrimary: true,
                generationStrategy: 'uuid',
                default: 'uuid_generate_v4()'
              },
              {
                name: 'provider',
                type: 'varchar',
              },
              {
                name: 'date',
                type: 'timestamp with time zone',
              },
              {
                name: 'created_at',
                type: 'timestamp',
                default: 'now()'
              },
              {
                name: 'updated_at',
                type: 'timestamp',
                default: 'now()'
              }
            ]
          })
      );
    }

    // Caso aconteca algum problema, desfazer erros
    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('appointments');
    }
}

/**
 * MIGRATIONS: Evita que os bancos de dados estejam em versões diferentes
 *
 * Linha do tempo:
 *
 * 1ª semana: Agendamentos
 * 2ª semana: Usuários
 * (NOVO DEV) 3ª semena: Edição Agendamentos
 * 4ª semena: Compras
 */
