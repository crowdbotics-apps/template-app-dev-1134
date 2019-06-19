import sendSms from "../../services/smsApi";
export function endTripSubmit(data) {
	console.log("here at endtrip middleware");
	console.log("send sms here", sendSms(data.to, data.message));
}
