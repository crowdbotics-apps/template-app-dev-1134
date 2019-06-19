import commonColor from '../../../../native-base-theme/variables/commonColor';

const React = require('react-native');

const { Dimensions } = React;
const deviceWidth = Dimensions.get('window').width;
export default {
  slideSelector: {
    padding: 10,
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    width: deviceWidth + 5,
  },
  iosHeader: {
    position: 'absolute',
    top: 0,
    width: deviceWidth + 5,
    backgroundColor: commonColor.brandPrimary
  },
  aHeader: {
    position: 'absolute',
    top: 0,
    width: deviceWidth + 5,
    backgroundColor: commonColor.brandPrimary,
    borderColor: commonColor.brandPrimary,
    elevation: 3
  },
  iosHeaderTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center'
  },
  aHeaderTitle: {
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 26,
    marginTop: -5,
    color: '#fff',
    textAlign: 'center'
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  footerCard: {
    flexDirection: 'row',
    backgroundColor: '#fff'
  },
  pay: {
    fontSize: 18,
    fontWeight: '500',
    color: 'green'
  },
  trip: {
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 14
  },
  helpBtn: {
    backgroundColor: 'none'
  },
  starIcon: {
    fontSize: 18,
    lineHeight: 20
  },
  modalView: {
    position: 'absolute',
    bottom: 0,
    width: deviceWidth
  },
  rateCard: {
    flexDirection: 'row',
    paddingRight: 0,
    paddingLeft: 8,
    backgroundColor: '#fff',
    borderRadius: 0,
    borderColor: '#fff'
  },
  profileIcon: {
    alignSelf: 'center',
    paddingRight: 0
  },
  ratings: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: 10
  },
  btnContainer: {
    borderBottomColor: '#eee',
    alignSelf: 'center'
  },
  btnText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '500',
    lineHeight: 25
  }
};
