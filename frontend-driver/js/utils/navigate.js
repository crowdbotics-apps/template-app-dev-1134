import { Linking, ActionSheetIOS, Alert, Platform } from "react-native";

const isValidLatLong = (num, range) =>
  typeof num === "number" && num <= range && num >= -1 * range;

const isValidCoordinates = coords =>
  isValidLatLong(coords.latitude, 90) && isValidLatLong(coords.longitude, 180);

const getParameterString = (params = []) => {
  return params
    .map(({ key, value }) => {
      const encodedKey = encodeURIComponent(key);
      const encodedValue = encodeURIComponent(value);

      return `${encodedKey}=${encodedValue}`;
    })
    .join("&");
};

function openDialog(urls) {
  if (Platform.OS === "ios") {
    urls = urls.ios;
    return Promise.all(urls.map(element => Linking.canOpenURL(element[1])))
      .then(results => {
        return urls.filter((element, index) => results[index]);
      })
      .then(choices => {
        // There is no map in the system, it is recommended to download one
        if (choices.length < 1) {
          return ActionSheetIOS.showActionSheetWithOptions(
            {
              options: ["Download Google map", "cancel"],
              cancelButtonIndex: 1,
              title: "Select the map"
            },
            buttonIndex => {
              if (buttonIndex === 0) {
                Linking.openURL(
                  `https://itunes.apple.com/in/app/google-maps-navigation-transport/id585027354?mt=8`
                );
              }
            }
          );
        }

        return ActionSheetIOS.showActionSheetWithOptions(
          {
            options: [...choices.map(element => element[0]), "Cancel"],
            cancelButtonIndex: choices.length,
            title: "Select the map"
          },
          buttonIndex => {
            if (buttonIndex < choices.length) {
              Linking.openURL(choices[buttonIndex][1]);
            }
          }
        );
      });
  } else if (Platform.OS === "android") {
    urls = urls.android;
    return Promise.all(urls.map(element => Linking.canOpenURL(element[1])))
      .then(results => {
        return urls.filter((element, index) => results[index]).map(url => ({
          text: url[0],
          onPress: () => {
            Linking.openURL(url[1]);
          }
        }));
      })
      .then(choices => {
        // There is no map in the system, it is recommended to download one
        if (choices.length < 1) {
          return Alert.alert(
            "Select the map",
            "You have not installed the map software yet.",
            [
              {
                text: "Download Google Map",
                onPress: () =>
                  Linking.openURL(
                    `https://play.google.com/store/apps/details?id=com.google.android.apps.maps&hl=en`
                  )
              },
              { text: "Cancel" }
            ]
          );
        }
        return Alert.alert("Select the map", "Please select a map to open", [
          ...choices,
          { text: "Cancel" }
        ]);
      });
  }
}

function navigate({ destination, source, params = [] } = {}) {
  if (destination && isValidCoordinates(destination)) {
    params.push({
      key: "daddr",
      value: `${destination.latitude},${destination.longitude}`
    });
  }
  if (source && isValidCoordinates(source)) {
    params.push({
      key: "saddr",
      value: `${source.latitude},${source.longitude}`
    });
  }
  const url = `http://maps.google.com/maps?${getParameterString(params)}`;

  return openDialog({
    android: [["Use Google Maps", url]],
    ios: [
      ["Use Google Maps", url],
      ["Show in WebView", url],
      [
        "Use system Map",
        `http://maps.apple.com/?sddr=${source.latitude +
          "," +
          source.longitude}&daddr=${destination.latitude +
          "," +
          destination.longitude}`
      ]
    ]
  });
}

export default navigate;
