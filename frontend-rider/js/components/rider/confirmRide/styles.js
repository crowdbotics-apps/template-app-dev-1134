import { Platform } from "react-native";

const React = require("react-native");

const { Dimensions } = React;

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;
export default {
  searchBar: {
    width: deviceWidth - 20,
    alignSelf: "center",
    backgroundColor: "#EEE",
    borderRadius: 10,
    marginLeft: 0,
    marginTop: 5,
    shadowColor: "#aaa",
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 3,
    shadowOpacity: 0.5
  },
  SearchPickText: {
    fontSize: 13,
    marginLeft: 5,
    color: "#B6D7EA"
  },
  iosSearchBar: {
    width: deviceWidth - 20,
    alignSelf: "center",
    marginTop: 10,
    borderRadius: 10,
    paddingLeft: 5,
    flex: 1,
    height: 50,
    paddingTop: 8
    // margin: 10
  },
  aSearchBar: {
    width: deviceWidth - 20,
    alignSelf: "center",
    marginTop: 10,
    borderRadius: 10,
    paddingLeft: 5,
    flex: 1,
    height: 60,
    paddingTop: 5
    // margin: 10
  },
  locateIcon: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    marginRight: 5,
    marginTop: Platform.OS === "ios" ? deviceHeight - 180 : deviceHeight - 200,
    marginBottom: 135,
    marginLeft: deviceWidth - 40
  },
  aSrcdes: {
    // paddingVertical: 7
  },
  iosSrcdes: {
    // paddingVertical: 7
  },

  slideSelector: {
    position: "absolute",
    bottom: 0,
    width: deviceWidth + 5
  },

  map: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },

  iosIcon: {
    fontSize: 24,
    width: 35,
    height: 25,
    marginHorizontal: 10,
    alignItems: "center",
    top: 5,
    color: "#7FBFE2"
  },
  aPaytmIcon: {
    width: 35,
    height: 13,
    marginTop: Platform.OS === "android" ? 2 : -3,
    paddingVertical: 8,
    marginHorizontal: 10,
    justifyContent: "center"
  },
  carIcon: {
    color: "#222",
    fontSize: 24
  },
  selectCardContainer: {
    alignItems: "center",
    padding: null,
    borderLeftWidth: 1,
    flex: 2,
    alignSelf: "center",
    justifyContent: "center",
    borderColor: "#ddd",
    paddingTop: 10,
    paddingBottom: 10
  },
  setPickupLocation: {
    position: "absolute",
    bottom: deviceHeight / 2.1,
    left: 0,
    right: 0
  },
  selectCard: {
    alignItems: "center",
    paddingVertical: null,
    bottom: 4
  },
  footerText: {
    textAlign: "center",
    fontSize: 10,
    lineHeight: 15,
    marginBottom: -7
  },
  iosHeader: {
    backgroundColor: "#fff"
  },
  aHeader: {
    backgroundColor: "#fff",
    borderColor: "#aaa",
    elevation: 3
  },
  searchIcon: {
    top: 2,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignSelf: "center",
    flex: 0
  },
  triangle: {
    position: "absolute",
    bottom: -15,
    left: 110,
    width: 10,
    height: 15,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderTopWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 0,
    borderLeftWidth: 10,
    borderTopColor: "white",
    borderRightColor: "transparent",
    borderBottomColor: "transparent",
    borderLeftColor: "transparent"
  }
};
