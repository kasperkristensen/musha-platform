import { Migration } from '@mikro-orm/migrations';

export class Migration20201013130955 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "user" drop column "password";');
  }

}
