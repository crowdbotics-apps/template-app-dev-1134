import { Toast } from "native-base";
const initialState = {
  isConnected: false
};

const network = (state = initialState, action) => {
  switch (action.type) {
    case "CHANGE_CONNECTION_STATUS":
      if (!action.isConnected) {
        Toast.show({
          text: "Check Network Connection",
          position: "top",
          type: "danger",
          buttonText: "Dismiss",
          duration: 6000
        });
      }
      return { ...state, isConnected: action.isConnected };
    default:
      return state;
  }
};

export default network;
