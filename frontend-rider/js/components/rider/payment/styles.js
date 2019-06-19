import commonColor from "../../../../native-base-theme/variables/commonColor";

export default {
  paytmIcon: {
    width: 35,
    height: 13,
    padding: 5,
    paddingTop: 15,
  },
  iosHeader: {
    backgroundColor: "#fff",
  },
  aHeader: {
    backgroundColor: "#fff",
    borderColor: "#aaa",
    elevation: 3,
  },
  iosHeaderTitle: {
    fontSize: 18,
    fontWeight: "500",
    color: commonColor.brandPrimary,
  },
  aHeaderTitle: {
    fontSize: 18,
    fontWeight: "500",
    lineHeight: 26,
    marginTop: -5,
    color: commonColor.brandPrimary,
  },
  payModeType: {
    margin: 20,
    padding: 10,
    marginTop: 0,
    paddingLeft: 0,
    borderBottomColor: commonColor.brandPrimary,
    borderBottomWidth: 1,
  },
  payModeText: {
    color: commonColor.brandPrimary,
    fontSize: 14,
  },
  payMethod1: {
    flexDirection: "row",
    margin: 20,
    marginTop: 0,
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
  payMethod2: {
    flexDirection: "row",
    margin: 20,
    marginTop: -10,
  },
};
