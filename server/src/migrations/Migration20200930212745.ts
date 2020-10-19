import { Migration } from '@mikro-orm/migrations';

export class Migration20200930212745 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "user" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "username" varchar(255) not null, "password" varchar(255) not null);');
    this.addSql('alter table "user" add constraint "user_username_unique" unique ("username");');

    this.addSql('create table "party_host" ("party_id" int4 not null, "user_id" int4 not null);');
    this.addSql('alter table "party_host" add constraint "party_host_pkey" primary key ("party_id", "user_id");');

    this.addSql('alter table "party_host" add constraint "party_host_party_id_foreign" foreign key ("party_id") references "party" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "party_host" add constraint "party_host_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade on delete cascade;');
  }

}
