import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Platform, Modal } from "react-native";
import ImagePicker from "react-native-image-picker";
import {
  Container,
  Header,
  Content,
  Button,
  Icon,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Item,
  Title,
  Left,
  Right,
  Spinner,
  Body
} from "native-base";
import { Actions } from "react-native-router-flux";
import styles from "./styles";
import { updateUserProfilePicAsync } from "../../../actions/driver/settings";
import commonColor from "../../../../native-base-theme/variables/commonColor";

class uploadFiles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      image: null,
      doc: null
    };
  }
  _pickImage(userDetails) {
    var options = {
      title: "Upload Document",
      quality: 0.3,
      allowsEditing: true,
      aspect: [4, 3]
    };
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        console.log("No image selected");
      } else if (response.error) {
        console.log("Error in Image Picker");
      } else {
        this.setState({ image: response.uri });
        let source = { uri: response.uri };
        let userData = Object.assign(userDetails, {
          localUrl: source.uri
        });
        this.props.updateUserProfilePicAsync(userData, this.props.keys);
      }
    });
  }

  render() {
    return (
      <Container style={{ backgroundColor: "#fff" }}>
        <Header
          androidStatusBarColor={commonColor.statusBarLight}
          style={Platform.OS === "ios" ? styles.iosHeader : styles.aHeader}
        >
          {this.props.profileUpdating ? (
            <Left />
          ) : (
            <Left>
              <Button transparent onPress={() => Actions.pop()}>
                <Icon
                  name="md-arrow-back"
                  style={{ fontSize: 28, color: commonColor.brandPrimary }}
                />
              </Button>
            </Left>
          )}
          <Body>
            <Title
              style={
                Platform.OS === "ios"
                  ? styles.iosHeaderTitle
                  : styles.aHeaderTitle
              }
            >
              Upload
            </Title>
          </Body>
          <Right />
        </Header>
        <Content style={{ backgroundColor: "#f2f4f6" }}>
          <View style={{ padding: 5, marginTop: 20 }}>
            <Text style={styles.textUp}>Take a photo of your</Text>
            <Text style={styles.textMiddle}>{this.props.Filename}</Text>
            <Text style={styles.textBottom}>
              Please make sure we can easily read all the details.
            </Text>
            <Card style={styles.cardDocument}>
              {this.state.image ? (
                <Thumbnail
                  style={styles.thumbnail}
                  square
                  source={{ uri: this.state.image }}
                />
              ) : (
                <CardItem>
                  <Icon
                    name="md-images"
                    style={{
                      fontSize: Platform.OS === "ios" ? 200 : 170,
                      width: null,
                      color: "#C5D6E4"
                    }}
                  />
                </CardItem>
              )}
            </Card>
            {this.props.profileUpdating ? (
              <Item style={styles.tapButton}>
                <Text style={styles.tapText}>Uploading File</Text>
              </Item>
            ) : (
              <Item
                style={styles.tapButton}
                onPress={() => this._pickImage(this.props.userDetails)}
              >
                <Icon
                  name="ios-camera-outline"
                  style={{ fontSize: 30, width: null, color: "#3B75A2" }}
                />
                <Text style={styles.tapText}>TAP TO ADD</Text>
              </Item>
            )}
            {this.props.profileUpdating ? <Spinner /> : null}
          </View>
        </Content>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    userDetails: state.driver.user,
    profileUpdating: state.driver.user.profileUpdating
  };
}
function bindActions(dispatch) {
  return {
    updateUserProfilePicAsync: (document, type) =>
      dispatch(updateUserProfilePicAsync(document, type))
  };
}

export default connect(
  mapStateToProps,
  bindActions
)(uploadFiles);
