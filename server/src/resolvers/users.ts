import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import { MyContext } from "../types";
import { User } from "../entities/User";

@InputType()
class UserInformation {
  @Field()
  displayName: string;
  @Field()
  email: string;
  @Field()
  spotifyId: string;
}

@ObjectType()
class FieldError {
  @Field()
  field: string;

  @Field()
  message: string;
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

@Resolver()
export class UserResolver {
  @Query(() => User, { nullable: true })
  async me(@Ctx() { req, em }: MyContext) {
    //you are logged out
    if (!req.session.userId) {
      return null;
    }

    const user = await em.findOne(User, { id: req.session.userId });
    return user;
  }

  @Query(() => [User])
  users(@Ctx() { em }: MyContext): Promise<User[]> {
    return em.find(User, {});
  }

  @Query(() => User, { nullable: true })
  user(
    @Arg("email") email: string,
    @Ctx() { em }: MyContext
  ): Promise<User | null> {
    return em.findOne(User, { email });
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg("options") options: UserInformation,
    @Ctx() { em, req }: MyContext
  ): Promise<UserResponse> {
    const user = em.create(User, {
      displayName: options.displayName,
      email: options.email,
      spotifyId: options.spotifyId,
    });
    try {
      await em.persistAndFlush(user);
    } catch (err) {
      console.log("Error: ", err);
    }
    req.session.userId = user.id;

    return { user };
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg("email") email: string,
    @Ctx() { em, req }: MyContext
  ): Promise<UserResponse> {
    const user = await em.findOne(User, { email: email });
    if (!user) {
      return {
        errors: [
          {
            field: "usernameOrEmail",
            message: "Could not find a user with that email",
          },
        ],
      };
    }

    req.session.userId = user.id;

    return {
      user: user,
    };
  }

  // @Mutation(() => User, { nullable: true })
  // async updateUser(
  //   @Arg("id", () => Int) id: number,
  //   @Arg("username", () => String, { nullable: true }) username: string,
  //   @Arg("oldPassword", () => String, { nullable: true }) oldPassword: string,
  //   @Arg("newPassword", () => String, { nullable: true }) newPassword: string,
  //   @Ctx() { em }: MyContext
  // ): Promise<User | null> {
  //   if (!username && !oldPassword && !newPassword) return null;

  //   const user = await em.findOne(User, { id });
  //   if (!user) {
  //     return null;
  //   }
  //   if (username) {
  //     user.username = username;
  //   }
  //   if (newPassword) {
  //     try {
  //       if (await argon2.verify(user.password, oldPassword)) {
  //         const hash = await argon2.hash(newPassword);
  //         user.password = hash;
  //       }
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   }
  //   await em.persistAndFlush(user);
  //   return user;
  // }

  //Only for development
  @Mutation(() => Boolean)
  async deleteAllUsers(
    //@Arg("id", () => Int) id: number,
    @Ctx() { em }: MyContext
  ) {
    await em.nativeDelete(User, {});
    return true;
  }
}
