import commonColor from "../../../../native-base-theme/variables/commonColor";
const React = require("react-native");

const {Dimensions} = React;

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

export default {
  iosLogoContainer: {
    top: deviceHeight / 4,
    alignItems: "center",
  },
  aLogoContainer: {
    top: deviceHeight / 4.5,
    alignItems: "center",
    height: deviceHeight / 1.5,
  },
  logoIcon: {
    color: "#eee",
    fontSize: 100,
  },
  logoText: {
    color: "#eee",
    fontWeight: "700",
    fontSize: 25,
    lineHeight: 30,
    marginTop: -10,
  },
  loginBtn: {
    height: 50,
    marginBottom: 15,
    paddingTop: 10,
    paddingBottom: 10,
    alignSelf: "center",
    width: deviceWidth - 100,
    borderColor: commonColor.brandPrimary,
    backgroundColor: "#5CA8D8",
  },
  registerBtn: {
    height: 50,
    alignSelf: "center",
    width: deviceWidth - 100,
    backgroundColor: "#3287BD",
  },
};
