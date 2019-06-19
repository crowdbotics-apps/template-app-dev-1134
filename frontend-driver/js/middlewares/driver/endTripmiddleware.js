import sendSms from "../../services/smsApi";
export function endTripSubmit() {
  console.log("here at endtrip middleware");
  console.log(sendSms());
}
