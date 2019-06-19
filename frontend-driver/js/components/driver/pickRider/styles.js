import { Platform } from 'react-native';
import commonColor from '../../../../native-base-theme/variables/commonColor';

const React = require('react-native');

const { Dimensions } = React;
const deviceWidth = Dimensions.get('window').width;
export default {
  searchBar: {
    flexDirection: 'row'
  },
  aSrcdes: {
    backgroundColor: '#fff'
  },
  iosSrcdes: {
    flex: 1,
    backgroundColor: '#fff'
  },
  slideSelector: {
    padding: 10,
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
  footerCard: {
    flexDirection: 'row',
    backgroundColor: '#eee'
  },
  profileIcon: {
    alignSelf: 'center',
    paddingRight: 10
  },
  pick: {
    color: 'green',
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 14
  },
  rider: {
    fontSize: 18,
    fontWeight: '500'
  },
  time: {
    textAlign: 'right'
  },
  iosTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#ddd'
  },
  aTitle: {
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 26,
    marginTop: -5,
    color: '#ddd'
  },
  iosHeaderText: {
    fontSize: 12,
    fontWeight: '600',
    color: commonColor.lightThemePlaceholder
  },
  aHeaderText: {
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 26,
    marginTop: -10,
    color: commonColor.lightThemePlaceholder
  },
  modalContainer: {
    backgroundColor: '#084069'
  },
  containHead: {
    color: '#fff',
    fontWeight: '600',
    paddingVertical: 10
  },
  modalHeader: {
    borderColor: '#aaa',
    elevation: 3
  },
  close: {
    color: '#ccc',
    fontSize: 40,
    lineHeight: 45,
    marginTop: Platform.OS === 'android' ? -7 : undefined
  },
  btnContain: {
    borderBottomWidth: 0,
    flexDirection: 'column',
    alignItems: 'center'
  },
  drop: {
    textAlign: 'right',
    fontSize: 12,
    color: '#EB6543',
    fontWeight: '600',
    lineHeight: 13,
    left: -6
  },
  headerContainer: {
    position: 'absolute',
    top: 0,
    flex: 1,
    width: deviceWidth + 5
  },
  iosHeader: {
    backgroundColor: commonColor.brandPrimary
  },
  aHeader: {
    backgroundColor: commonColor.brandPrimary,
    borderColor: '#aaa',
    elevation: 3
  },
  iosHeaderTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#fff',
    textAlign: 'center'
  },
  aHeaderTitle: {
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 26,
    marginTop: -5,
    color: '#fff',
    textAlign: 'center'
  },
  navigateBtn: {
    flexDirection: 'column',
    alignItems: 'center',
    width: deviceWidth / 4,
    padding: 10,
    borderRightWidth: 0.5,
    borderColor: '#aaa',
    paddingVertical: 20
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
  navigate: {
    fontSize: deviceWidth < 330 ? 12 : 13,
    fontWeight: '700',
    lineHeight: 14
  },
  modalTopContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  modalTextViewContainer: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10
  },
  modalText: {
    alignSelf: 'center'
  },
  circleBorder: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  },
  innerCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'white'
  },
  CardItem: {
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: 'space-between'
  },
  cardtext: {
    color: '#4F5354'
  },
  triangle: {
    position: 'absolute',
    left: 7.5,
    top: 30,
    width: 15,
    height: 15,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderTopWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 10,
    borderLeftWidth: 0,
    borderTopColor: 'transparent',
    borderRightColor: 'white',
    borderBottomColor: 'transparent',
    borderLeftColor: 'transparent'
  },
  card: {
    alignItems: 'center',
    flex: 2,
    height: 55,
    borderRadius: 0,
    paddingHorizontal: 8,
    justifyContent: 'center'
  },
  btnText: {
    fontSize: 16,
    fontWeight: '500'
  }
};
