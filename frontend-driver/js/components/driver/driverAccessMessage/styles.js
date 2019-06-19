import commonColor from "../../../../native-base-theme/variables/commonColor";
import { Dimensions } from "react-native";
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
  verifyText: {
    fontSize: 20,
    fontWeight: "500",
    color: commonColor.brandPrimary,
    marginTop: 30,
    marginHorizontal: 20
  },
  aHeaderTitle: {
    fontSize: 18,
    fontWeight: "500",
    lineHeight: 26,
    marginTop: -5,
    color: commonColor.brandPrimary
  },
  buttonContinue: {
    backgroundColor: "#2E6894",
    alignSelf: "stretch",
    borderRadius: 0
  }
};
