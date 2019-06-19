import commonColor from '../../../../native-base-theme/variables/commonColor';

const React = require('react-native');

const { Dimensions } = React;
const deviceWidth = Dimensions.get('window').width;

export default {
  aSrcdes: {
    // flex: 1,
    backgroundColor: '#fff'
  },
  iosSrcdes: {
    // flex: 1,
    backgroundColor: '#fff'
  },
  searchBar: {
    flexDirection: 'row'
  },
  slideSelector: {
    backgroundColor: '#eee',
    position: 'absolute',
    bottom: 0,
    width: deviceWidth + 5
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  tripBtn: {
    backgroundColor: '#4D80A7',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0
  },
  ratings: {
    flexDirection: 'row',
    paddingLeft: 5,
    paddingRight: 0
  },
  btnText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '500',
    lineHeight: 25
  },
  headerContainer: {
    position: 'absolute',
    top: 0,
    flex: 1,
    width: deviceWidth + 5
  },
  iosHeader: {
    backgroundColor: 'white'
  },
  aHeader: {
    backgroundColor: 'white',
    borderColor: '#aaa',
    elevation: 1
  },
  iosHeaderTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#367697',
    textAlign: 'center'
  },
  aHeaderTitle: {
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 26,
    marginTop: -5,
    color: '#367697',
    textAlign: 'center'
  },
  place: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    paddingVertical: 15,
    marginHorizontal: 10
  },
  placeText: {
    textAlign: 'center',
    marginTop: -3,
    fontSize: 14
  },
  navigateBtn: {
    flexDirection: 'column',
    alignItems: 'center',
    width: deviceWidth / 4,
    padding: 10,
    borderRightWidth: 0.5,
    borderColor: '#aaa',
    paddingVertical: 20
  }
};
