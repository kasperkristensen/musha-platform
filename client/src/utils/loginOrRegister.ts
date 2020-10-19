import {
  useLoginMutation,
  useRegisterMutation,
  useUserQuery,
} from "../generated/graphql";

export async function loginOrRegister(
  displayName: string,
  email: string,
  spotifyId: string
) {
  const [, login] = useLoginMutation();
  const [, register] = useRegisterMutation();
  const loginInfo = { email: email };
  const registerInfo = {
    displayName: displayName,
    email: email,
    spotifyId: spotifyId,
  };
  console.log("why do i not get herer!!!!!");
  const findUser = await login(loginInfo);

  if (findUser !== null) {
    await register(registerInfo);
  }
  console.log("Im here!! ", findUser);
}
