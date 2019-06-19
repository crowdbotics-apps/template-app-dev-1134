import GoogleSignIn from "react-native-google-sign-in";
import config from "../../../../config";
export async function registerWithGoogleAsync(
  socailSignupSuccess,
  authData,
  checkUser,
  userLoginRequest
) {
  await GoogleSignIn.configure({
    clientID: config.clientID,
    scopes: ["openid", "email", "profile"],
    shouldFetchBasicProfile: true
  });
  userLoginRequest();
  const user = await GoogleSignIn.signInPromise();
  const credentials = {
    email: user.email,
    request: "Register"
  };
  checkUser(credentials, user);
  console.log(user, "Google register heree user");
}

export async function signInWithGoogleAsync(
  socailSignupSuccess,
  authData,
  checkUser,
  userLoginRequest
) {
  console.log("signInWithGoogleAsync")
  await GoogleSignIn.configure({
    clientID: config.clientID,
    scopes: ["openid", "email", "profile"],
    shouldFetchBasicProfile: true
  });
  console.log("after signWithGoogleAsync")
  userLoginRequest();
  const user = await GoogleSignIn.signInPromise();
  console.log(user,"User")
  const credentials = {
    email: user.email,
    request: "Login",
    password: user.userID
  };
  checkUser(credentials, user);
  console.log(user, "Google login heree user");
}
