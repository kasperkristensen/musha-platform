import { Migration } from '@mikro-orm/migrations';

export class Migration20201001063603 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "party" add column "user_id" int4 not null;');
  }

}
