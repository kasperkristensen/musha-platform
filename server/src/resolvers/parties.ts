import { Party } from "../entities/Party";
import { Arg, Ctx, Int, Mutation, Query, Resolver } from "type-graphql";
import { MyContext } from "../types";
import { User } from "../entities/User";

@Resolver()
export class PartyResolver {
  @Query(() => [Party])
  parties(@Ctx() { em }: MyContext): Promise<Party[]> {
    return em.find(Party, {});
  }

  @Query(() => [Party])
  partiesByUserId(
    @Arg("userId", () => Int) id: number,
    @Ctx() { em }: MyContext
  ): Promise<Party[]> {
    return em.find(Party, { userId: id });
  }

  @Query(() => Party, { nullable: true })
  party(
    @Arg("id", () => Int) id: number,
    @Ctx() { em }: MyContext
  ): Promise<Party | null> {
    return em.findOne(Party, { id });
  }

  @Mutation(() => Party)
  async createParty(
    @Arg("title", () => String) title: string,
    @Arg("id", () => Int) id: number,
    @Ctx() { em }: MyContext
  ): Promise<Party | null> {
    const user = await em.findOne(User, { id });
    if (!user) {
      return null;
    }
    const party = em.create(Party, {
      title: title,
      host: user,
      userId: user.id,
    });
    await em.persistAndFlush(party);
    return party;
  }

  @Mutation(() => Party, { nullable: true })
  async updateParty(
    @Arg("id", () => Int) id: number,
    @Arg("title", () => String, { nullable: true }) title: string,
    @Ctx() { em }: MyContext
  ): Promise<Party | null> {
    const party = await em.findOne(Party, { id });
    if (!party) {
      return null;
    }
    if (title) {
      party.title = title;
      await em.persistAndFlush(party);
    }
    return party;
  }

  // Should be changed to deactivate, as we want to keep the data from parties
  @Mutation(() => Boolean)
  async deleteParty(
    @Arg("id", () => Int) id: number,
    @Ctx() { em }: MyContext
  ): Promise<boolean> {
    const party = await em.findOne(Party, { id });
    if (!party) {
      console.log("could not find id");
      return false;
    }
    await em.nativeDelete(Party, { id });
    return true;
  }

  // Only for development
  @Mutation(() => Boolean)
  async deleteAllParties(
    //@Arg("id", () => Int) id: number,
    @Ctx() { em }: MyContext
  ) {
    await em.nativeDelete(Party, {});
    return true;
  }
}
