import {
  Collection,
  Entity,
  OneToMany,
  PrimaryKey,
  Property,
} from "@mikro-orm/core";
import { Field, ObjectType } from "type-graphql";
import { Party } from "./Party";

@ObjectType()
@Entity()
export class User {
  @Field()
  @PrimaryKey()
  id!: number;

  @Field(() => String)
  @Property({ type: "date" })
  createdAt = new Date();

  @Field(() => String)
  @Property({ type: "date", onUpdate: () => new Date() })
  updatedAt = new Date();

  @Field(() => [Party])
  @OneToMany({ entity: () => Party, mappedBy: "host" })
  parties = new Collection<Party>(this);

  @Field()
  @Property()
  displayName!: string;

  @Field()
  @Property()
  email!: string;

  @Field()
  @Property()
  spotifyId!: string;
}
