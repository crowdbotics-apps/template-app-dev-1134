import { AccessToken, LoginManager } from "react-native-fbsdk";

const getFbUrl = token =>
  `https://graph.facebook.com/me?access_token=${token}&fields=name,first_name,last_name,email`;

const loginWithFacebook = async () =>
  new Promise(async (resolve, reject) => {
    try {
      const result = await LoginManager.logInWithReadPermissions([
        "public_profile",
        "email"
      ]);
      if (result.isCancelled) {
        return reject({ token: null, type: "cancel" });
      }

      const data = await AccessToken.getCurrentAccessToken();
      if (data.accessToken) {
        // Fetching user-details
        return resolve({ token: data.accessToken.toString(), type: "success" });
      }

      return reject({ token: null, type: "error in fetching access token" });
    } catch (error) {
      return reject({ token: null, type: error });
    }
  });

export async function requestFbLogin(
  socailSignupSuccess,
  authData,
  checkUser,
  userLoginRequest
) {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await loginWithFacebook();
      const { token, type } = res;
      console.log(res,"response")
      const loginSuccessful =
        type && token && type !== "cancel" && token.length > 0;
      if (!loginSuccessful || type !== "success") {
        return resolve({ successFb: false });
      }
      const fbUrl = getFbUrl(token);
      const response = await fetch(fbUrl); // eslint-disable-line
      userLoginRequest();
      const user = await response.json();
      if (!user || !user.email) {
        return alert("Email not found");
      }
      const credentials = {
        email: user.email,
        password: user.id,
        request: "Register"
      };
      socailSignupSuccess(user);
      checkUser(credentials, user);
    } catch (e) {
      console.log(e, "error");
    }
  });
}
