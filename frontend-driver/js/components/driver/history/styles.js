import commonColor from '../../../../native-base-theme/variables/commonColor';

const React = require('react-native');

const { Dimensions } = React;

const deviceHeight = Dimensions.get('window').height;

export default {
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  iosHeader: {
    backgroundColor: '#fff'
  },
  aHeader: {
    backgroundColor: '#fff',
    borderColor: '#aaa',
    elevation: 3
  },
  iosHeaderTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: commonColor.brandPrimary
  },
  aHeaderTitle: {
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 26,
    marginTop: -5,
    color: commonColor.brandPrimary
  },
  cashText: {
    alignSelf: 'flex-end',
    marginTop: -40
  },
  IconCardItem: {
    height: null,
    backgroundColor: '#4882AF',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'column',
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 15,
    paddingRight: 15,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4
  },
  addressCardItem: {
    flex: 3,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4
  },
  pinIcons: {
    color: '#00BFD8',
    width: null
  },
  address: {
    paddingLeft: 5,
    color: '#4D82AC',
    fontWeight: '200',
    fontSize: 12
  },
  tripAmt: {
    color: '#4D82AC',
    fontSize: 15,
    fontWeight: 'bold',
    paddingRight: 5
  },
  devider: {
    borderLeftWidth: 1,
    borderLeftColor: '#4D82AC',
    height: 12,
    width: 1
  },
  tripDate: {
    color: '#4D82AC',
    fontWeight: '600',
    fontSize: 12,
    paddingLeft: 2
  }
};
