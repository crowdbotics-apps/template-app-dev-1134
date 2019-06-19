import commonColor from '../../../../native-base-theme/variables/commonColor';
const React = require('react-native');

const {Dimensions} = React;

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default {
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: deviceWidth,
    height: deviceWidth,
    flex: 999999,
  },
  mapBg: {
    height: null,
    width: null,
    top: 0,
    flex: 999,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  pageTouch: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    height: deviceHeight,
    width: deviceWidth,
    flex: 999999,
  },
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: commonColor.brandPrimary,
  },
  detailsContainer: {
    padding: 30,
    paddingTop: 40,
    alignItems: 'center',
    position: 'absolute',
    top: deviceHeight / 2,
    right: 0,
    left: 0,
  },
  time: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 20,
    textAlign: 'center',
    padding: 10,
  },
  place: {
    fontWeight: '500',
    fontSize: 16,
    textAlign: 'center',
    padding: 10,
    opacity: 0.8,
  },
  rating: {
    color: '#ccc',
    fontWeight: '500',
    fontSize: 14,
    textAlign: 'center',
    paddingVertical: 10,
  },
  iosRateStar: {
    marginTop: 5,
    fontSize: 16,
    color: '#ccc',
    alignSelf: 'center',
  },
  aRateStar: {
    marginTop: -23,
    fontSize: 16,
    color: '#ccc',
    alignSelf: 'center',
  },
  iosHeader: {
    backgroundColor: commonColor.brandPrimary,
  },
  aHeader: {
    backgroundColor: commonColor.brandPrimary,
  },
  iosHeaderTitle: {
    color: '#ddd',
  },
  aHeaderTitle: {
    color: '#ddd',
  },
  logoutLogo: {
    color: '#ddd',
  },
  locate:{
    // flexDirection: "row",
    // alignItems: "flex-end",
    backgroundColor: 'transparent',
    // justifyContent: "flex-end",
    position: 'absolute',
    // bottom: 30,
    top: deviceHeight - 120,
    right: 20
  }
};
