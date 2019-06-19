import commonColor from "../../../../native-base-theme/variables/commonColor";
import { Platform } from "react-native";
const React = require("react-native");

const { Dimensions } = React;
const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

export default {
	searchBar: {
		width: deviceWidth,
		alignSelf: "center",
		height: 50,
		borderRadius: 0,
		alignItems: "center",
		justifyContent: "center"
	},
	srcdes: {
		flex: 1,
		top: -8,
		width: deviceWidth + 5
	},

	slideSelector: {
		position: "absolute",
		bottom: 0,
		width: deviceWidth + 5,
		paddingHorizontal: 0
	},

	map: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0
	},
	driverInfoContainer: {
		alignItems: "center",
		justifyContent: "center",
		alignSelf: "center"
	},
	driverInfo: {
		flexDirection: "row",
		alignSelf: "center",
		borderWidth: 1,
		flex: 1,
		padding: 3,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#eee",
		marginTop: -10,
		borderColor: commonColor.lightThemeColor
	},
	carInfo: {
		borderWidth: 1,
		padding: 3,
		backgroundColor: "#eee",
		marginTop: -10,
		borderColor: commonColor.lightThemeColor
	},
	card: {
		alignItems: "center",
		flex: 2,
		height: 55,
		borderRadius: 0,
		paddingHorizontal: 8,
		justifyContent: "center"
	},
	btnText: {
		fontSize: 16,
		lineHeight: 15,
		fontWeight: "bold"
	},
	waitTime: {
		textAlign: "center",
		fontSize: 10,
		lineHeight: 15,
		marginTop: 10
	},
	headerContainer: {
		position: "absolute",
		top: 0,
		width: deviceWidth + 5
	},
	iosHeader: {
		backgroundColor: "#fff"
	},
	aHeader: {
		backgroundColor: "#fff",
		borderColor: "#000",
		elevation: 3
	},
	confirmation: {
		textAlign: "center",
		marginTop: -3,
		fontSize: 14,
		fontWeight: "bold"
	},

	modalTopContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "row",
		backgroundColor: "rgba(0,0,0,0.5)"
	},
	modalTextViewContainer: {
		flex: 1,
		backgroundColor: "white",
		alignItems: "center",
		justifyContent: "center",
		padding: 10
	},
	modalText: {
		alignSelf: "center"
	},
	locateIcon: {
		flexDirection: "row",
		alignItems: "flex-end",
		justifyContent: "flex-end",
		alignSelf: "flex-end",
		marginRight: 5,
		marginTop: Platform.OS === "ios" ? deviceHeight - 200 : deviceHeight - 240
	}
};
