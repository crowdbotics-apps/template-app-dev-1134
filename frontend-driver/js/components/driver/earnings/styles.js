import commonColor from '../../../../native-base-theme/variables/commonColor';
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
export default {
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
  textDay: {
    textAlign: 'center',
    fontWeight: 'bold'
  },
  textEarnings: {
    fontWeight: 'normal',
    fontSize: 20
  },
  Cardwrapper: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    alignSelf: 'center',
    marginTop: 10,
    flex: 1
  },
  cardEarnings: {
    height: null,
    width: width + 10,
    left: -5,
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 0
  },
  CardItemEarnings: {
    width: width / 4 - 5,
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20
  },
  historyCard: {
    width: null,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    borderRadius: 4,
    borderWidth: 0.3,
    borderColor: '#ccc'
  },
  historyCardItem: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingLeft: 5,
    paddingRight: 0,
    paddingTop: 20,
    // width: width / 4 - 5,
    paddingBottom: 20
  }
  // profileIcon: {
  //   alignSelf: 'center',
  //   padding: 10,
  //   fontSize: 50
  // },
  // inputContainer: {
  //   borderWidth: null,
  //   paddingBottom: 0,
  //   paddingTop: 0,
  //   margin: null
  // },
  // input: {
  //   paddingBottom: 0,
  //   flex: 2
  // },
  // blueBorder: {
  //   borderBottomWidth: 1,
  //   borderBottomColor: '#EEEFEF',
  //   paddingBottom: 0,
  //   backgroundColor: '#f8f8f8'
  // },
  // blueHeader: {
  //   color: commonColor.lightThemePlaceholder,
  //   padding: 5,
  //   fontWeight: 'bold'
  // }
};
