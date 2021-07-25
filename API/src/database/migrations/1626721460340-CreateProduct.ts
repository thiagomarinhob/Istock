import {MigrationInterface, QueryRunner, Table} from "typeorm";

export default class CreateProducts1626721460340 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'products',
          columns: [
            {
              name: 'id',
              type: 'varchar',
              isPrimary: true,
              generationStrategy: 'uuid',
              default: 'uuid_generate_v4()',
            },
            {
              name: 'name',
              type: 'varchar',
            },
            {
              name: 'description',
              type: 'varchar',
              isNullable: true,
            },
            {
              name: 'price',
              type: 'float',
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
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('products');
    }

}
