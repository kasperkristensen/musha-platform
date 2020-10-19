import { Migration } from "@mikro-orm/migrations";

export class Migration20201012122031 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'alter table "user" rename column "username" to "display_name";'
    );

    this.addSql(
      'alter table "user" add column "spotify_id" varchar(255) not null;'
    );

    this.addSql('alter table "user" drop constraint "user_username_unique";');

    this.addSql('alter table "user" drop constraint "user_email_unique";');
  }
}
