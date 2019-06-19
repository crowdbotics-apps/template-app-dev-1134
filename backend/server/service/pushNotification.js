import fetch from 'node-fetch';
import UserSchema from '../models/user';

const url = `https://onesignal.com/api/v1/notifications`;



function sendNotification(userId, notification) {
	UserSchema.findOneAsync({ _id: userId }).then(userObj => {
		const App_id =
			userObj.userType === 'rider' ? 'rider-id' : 'driver-id';
		const Api_key =
			userObj.userType === 'rider'
				? 'rider-id'
				: 'driver-id';
		fetch(url, {
			method: 'POST',
			body: JSON.stringify({
				app_id: App_id,
				contents: { en: notification },
				include_player_ids: [userObj.deviceId], //userObj.deviceId
				data: { source: 'message' }
			}),
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Basic ' + Api_key
			}
		})
			.then(res => res.json())
			.then(data => {
				console.log('RESPONSE', data);
			})
			.catch(err => {
				console.log('ERROR', err);
			});
	});
}
export default sendNotification;
