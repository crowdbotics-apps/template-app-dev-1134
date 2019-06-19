export const CHANGE_CONNECTION_STATUS = "CHANGE_CONNECTION_STATUS";

export const connectionState = ({ status }) => {
  return {
    type: "CHANGE_CONNECTION_STATUS",
    isConnected: status
  };
};
