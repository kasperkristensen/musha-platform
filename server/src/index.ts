require("dotenv").config();
import "reflect-metadata";
import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./config";
import mikroConfig from "./mikro-orm.config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { PartyResolver } from "./resolvers/parties";
import { UserResolver } from "./resolvers/users";
import redis from "redis";
import session from "express-session";
import connectRedis from "connect-redis";
import cors from "cors";
import querystring from "querystring";
import request from "request";
import { generateRandomString } from "./utils/utils";
import cookies from "cookie-parser";

const REDIRECT_URI = process.env.REDIRECT_URI;
const FRONTEND_URI = process.env.FRONTEND_URI;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const STATE_KEY = "spotify_auth_state";

const main = async () => {
  const orm = await MikroORM.init(mikroConfig);
  await orm.getMigrator().up();

  const app = express();

  const RedisStore = connectRedis(session);
  const redisClient = redis.createClient();
  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );

  app.use(
    session({
      name: "jid",
      store: new RedisStore({
        client: redisClient,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365,
        httpOnly: true,
        sameSite: "lax",
        secure: __prod__,
      },
      saveUninitialized: false,
      secret: "catkfakfkdkf",
      resave: false,
    })
  );

  app.use(cookies());

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [PartyResolver, UserResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({ em: orm.em, req, res }),
  });

  apolloServer.applyMiddleware({ app, cors: false });

  app.get("/login", function (_req, res) {
    const state = generateRandomString(16);
    res.cookie(STATE_KEY, state);

    const scope =
      "user-read-private user-read-email user-read-recently-played user-top-read user-follow-read user-follow-modify playlist-read-private playlist-read-collaborative playlist-modify-public playlist-modify-private user-modify-playback-state user-read-playback-state user-read-playback-position ugc-image-upload user-read-currently-playing user-library-modify";

    res.redirect(
      "https://accounts.spotify.com/authorize?" +
        querystring.stringify({
          response_type: "code",
          client_id: CLIENT_ID,
          scope: scope,
          redirect_uri: REDIRECT_URI,
          state: state,
        })
    );
  });

  app.get("/callback", function (req, res) {
    const code = req.query.code || null;
    const state = req.query.state || null;
    const storedState = req.cookies ? req.cookies[STATE_KEY] : null;
    if (state === null || state !== storedState) {
      res.redirect(`/#${querystring.stringify({ error: "state_mismatch" })}`);
    } else {
      res.clearCookie(STATE_KEY);
      const authOptions = {
        url: "https://accounts.spotify.com/api/token",
        form: {
          code: code,
          redirect_uri: REDIRECT_URI,
          grant_type: "authorization_code",
        },
        headers: {
          Authorization:
            "Basic " +
            Buffer.from(CLIENT_ID + ":" + CLIENT_SECRET).toString("base64"),
        },
        json: true,
      };

      request.post(authOptions, function (error, response, body) {
        if (!error && response.statusCode === 200) {
          const access_token = body.access_token;
          const refresh_token = body.refresh_token;

          res.redirect(
            `${FRONTEND_URI}/#${querystring.stringify({
              access_token,
              refresh_token,
            })}`
          );
        } else {
          res.redirect(
            `/#${querystring.stringify({ error: "invalid_token" })}`
          );
        }
      });
    }
  });

  app.get("/refresh_token", function (req, res) {
    const refresh_token = req.query.refresh_token;
    const authOptions = {
      url: "https://accounts.spotify.com/api/token",
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${CLIENT_ID}:${CLIENT_SECRET}`
        ).toString("base64")}`,
      },
      form: {
        grant_type: "refresh_token",
        refresh_token,
      },
      json: true,
    };

    request.post(authOptions, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        const access_token = body.access_token;
        res.send({ access_token });
      }
    });
  });

  app.get("*", function (_req, res) {
    res.redirect(FRONTEND_URI);
  });

  app.listen(4000, () => {
    console.log("server started on localhost:4000");
  });
};

main().catch((err) => {
  console.error(err);
});
