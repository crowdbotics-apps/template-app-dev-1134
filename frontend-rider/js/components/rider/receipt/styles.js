import { Platform, Dimensions } from "react-native";
import commonColor from "../../../../native-base-theme/variables/commonColor";

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
	dateContainer: {
		paddingVertical: Platform.OS === "android" ? 5 : 20,
		alignSelf: "center",
		flexDirection: "row"
	},
	sideLines: {
		borderBottomWidth: 1,
		width: 50,
		alignSelf: "center",
		borderBottomColor: "#797979"
	},
	summaryText: {
		textAlign: "center",
		padding: 5,
		paddingTop: 0
	},
	amount: {
		textAlign: "center",
		fontSize: 50,
		lineHeight: 50,
		padding: 20,
		paddingVertical: 0
	},
	taxiNoContainer: {
		borderWidth: 1,
		backgroundColor: commonColor.brandPrimary
	},
	taxiNo: {
		textAlign: "center",
		fontSize: 12,
		lineHeight: 13,
		color: "#fff",
		padding: 5,
		fontWeight: "700"
	},
	feedBackBtn: {
		flexDirection: "row",
		alignSelf: "center",
		paddingVertical: 10
	},
	btnText: {
		fontSize: 20,
		alignSelf: "center",
		fontWeight: "bold"
	},
	btnContainer: {
		borderBottomColor: "#eee",
		alignSelf: "center"
	},
	textArea: {
		height: 120,
		color: commonColor.brandPrimary,
		borderColor: "#ccc",
		borderWidth: 1,
		width: Dimensions.get("window").width - 30,
		backgroundColor: "#eee",
		padding: 10,
		alignSelf: "center",
		fontSize: 17,
		textAlignVertical: "top"
	}
};
