import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export default class CreateMovements1626985820042 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'movements',
          columns: [
            {
              name: 'id',
              type: 'varchar',
              isPrimary: true,
              generationStrategy: 'uuid',
              default: 'uuid_generate_v4()',
            },
            {
              name: 'product_id',
              type: 'varchar',
            },
            {
              name: 'type',
              type: 'varchar'
            },
            {
              name: 'amount',
              type: 'integer',
            },
            {
              name: 'created_at',
              type: 'timestamp',
            },
            {
              name: 'updated_at',
              type: 'timestamp',
            }
          ],
        })
      )

      await queryRunner.createForeignKey('movements', new TableForeignKey({
        name: 'ProductMovement',
        columnNames: ['product_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'products',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropForeignKey('movements', 'ProductMovement');

      await queryRunner.dropTable('movements');
    }

}
