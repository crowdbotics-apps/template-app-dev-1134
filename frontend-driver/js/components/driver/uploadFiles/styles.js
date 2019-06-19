import commonColor from "../../../../native-base-theme/variables/commonColor";
import { Dimensions, Platform } from "react-native";
const { width, height } = Dimensions.get("window");
export default {
  iosHeader: {
    backgroundColor: "#fff"
  },
  aHeader: {
    backgroundColor: "#fff",
    borderColor: "#aaa",
    elevation: 3
  },
  iosHeaderTitle: {
    fontSize: 18,
    fontWeight: "500",
    color: commonColor.brandPrimary
  },
  aHeaderTitle: {
    fontSize: 18,
    fontWeight: "500",
    lineHeight: 26,
    marginTop: -5,
    color: commonColor.brandPrimary
  },
  modalContainer: {
    marginTop: height / 2,
    alignItems: "center",
    margin: 10,
    padding: 40,
    paddingBottom: 50,
    backgroundColor: "#fff",
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowColor: "#000",
    shadowOpacity: 0.5,
    borderRadius: 10,
    height: "auto",
    borderWidth: Platform.OS === "ios" ? null : 1,
    borderColor: Platform.OS === "ios" ? null : "#bbb"
  },
  cancelButton: {
    backgroundColor: "#2E6894",
    position: "absolute",
    alignSelf: "stretch",
    borderRadius: 0,
    marginTop: 15,
    left: 0,
    right: 0,
    bottom: 0,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
  },
  textUp: {
    color: "#666",
    padding: 5,
    paddingLeft: 10,
    fontSize: Platform.OS === "ios" ? 22 : 18,
    paddingBottom: 0
  },
  textMiddle: {
    padding: 10,
    paddingBottom: 0,
    fontSize: Platform.OS === "ios" ? 22 : 18,
    color: "#000",
    fontWeight: "400"
  },
  textBottom: {
    padding: 10,
    color: "#888",
    fontSize: Platform.OS === "ios" ? 22 : 18
  },
  cardDocument: {
    marginTop: 20,
    width: width - 100,
    alignSelf: "center",
    alignItems: "center",
    borderRadius: 6
  },
  thumbnail: {
    width: 150,
    height: 120,
    margin: 30,
    borderRadius: 10
  },
  tapButton: {
    marginTop: 15,
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
    borderBottomWidth: 0
  },
  tapText: {
    fontSize: Platform.OS === "ios" ? 22 : 18,
    fontWeight: "400",
    marginLeft: 10,
    color: "#3B75A2"
  },
  orText: {
    textAlign: "center",
    fontSize: 20,
    paddingBottom: 10,
    padding: 0,
    fontWeight: "400",
    color: "#3B75A2"
  }
};
