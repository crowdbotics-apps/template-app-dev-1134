import commonColor from "../../../../native-base-theme/variables/commonColor";

const React = require("react-native");

const { Dimensions, Platform } = React;
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
export default {
  map: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    width: deviceWidth,
    height: deviceWidth,
    flex: 999999
  },
  mapBg: {
    height: null,
    width: null,
    top: 0,
    flex: 999,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0
  },
  pageTouch: {
    backgroundColor: "transparent",
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    height: deviceHeight,
    width: deviceWidth,
    flex: 999999
  },
  container: {
    flex: 1,
    position: "relative",
    backgroundColor: "#0C4169"
  },
  detailsContainer: {
    flex: 1,
    padding: 30,
    paddingTop: 50,
    alignItems: "center",
    position: "absolute",
    backgroundColor: "transparent",
    top: Platform.OS === "ios" ? deviceHeight - 330 : deviceHeight - 360, // android fine test for ios
    right: 0,
    left: 0
  },
  time: {
    color: "#fff",
    fontWeight: "500",
    fontSize: 20,
    textAlign: "center",
    padding: 10,
  },
  place: {
    color: "#fff",
    fontWeight: "300",
    fontSize: 16,
    textAlign: "center",
    padding: 10
  },
  rating: {
    color: "#ccc",
    fontWeight: "500",
    fontSize: 14,
    textAlign: "center",
    paddingVertical: 10
  },
  iosRateStar: {
    fontSize: 16,
    color: "#ccc",
    alignSelf: "center"
  },
  aRateStar: {
    fontSize: 16,
    color: "#ccc",
    alignSelf: "center"
  },
  iosHeader: {
    backgroundColor: commonColor.brandPrimary,
    borderBottomWidth: null
  },
  aHeader: {
    backgroundColor: commonColor.brandPrimary,
    borderColor: "#aaa",
    elevation: 3
  },
  iosHeaderTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center"
  },
  aHeaderTitle: {
    fontSize: 18,
    fontWeight: "bold",
    lineHeight: 26,
    marginTop: -5,
    textAlign: "center",
    color: "#fff"
  }
};
