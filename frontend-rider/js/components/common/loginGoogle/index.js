import GoogleSignIn from "react-native-google-sign-in";
import config from "../../../../config";
import {Platform} from "react-native";
export async function registerWithGoogleAsync(
  socailSignupSuccess,
  authData,
  checkUser,
  userLoginRequest
) {
  console.log("registerWithGoogleAsync called")
  await GoogleSignIn.configure({
    clientID: config.clientID,
    scopes: ["openid", "email", "profile"],
    shouldFetchBasicProfile: true
  });
  userLoginRequest();
  const user = await GoogleSignIn.signInPromise();
  console.log(user,"user")
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
  try{
  console.log("signinWithGoogleAsync called")
   await GoogleSignIn.configure({
    clientID: config.clientID,
    scopes: ["openid", "email", "profile"],
    shouldFetchBasicProfile: true
  });
  console.log("after googleSignIn Configure")
  userLoginRequest();
  const user = await GoogleSignIn.signInPromise();
  console.log(user,"after GoogleSignInPromise");
  const credentials = {
    email: user.email,
    request: "Login",
    password: user.userID
  };
   console.log(user, "Google login heree user");
  checkUser(credentials, user);
  console.log(user, "Google login heree user");
}
catch(err){
  console.log(err," error googleSignIn login")
}
}
