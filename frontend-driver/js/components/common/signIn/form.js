import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Text, Dimensions } from 'react-native';
import { Item, Input, Button, View, Icon, Spinner } from 'native-base';
import PropTypes from 'prop-types';
import { signinAsync, forgotMail } from '../../../actions/common/signin';

import styles from './styles';
import commonColor from '../../../../native-base-theme/variables/commonColor';

const deviceWidth = Dimensions.get('window').width;
const validate = values => {
	const errors = {};
	if (!values.email) {
		errors.email = 'Email is Required';
	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
		errors.email = 'Invalid email';
	} else if (isNaN(Number(values.phoneNo))) {
		errors.phoneNo = 'Must be a number';
	} else if (!values.password) {
		errors.password = 'Password is Required';
	} else if (!values.phoneNo) {
		errors.phoneNo = 'Mobile Number is Required';
	} else if (!values.fname) {
		errors.fname = 'First name is Required';
	} else if (!values.lname) {
		errors.lname = 'Last name is Required';
	}
	if (!values.password) {
		errors.password = 'Password is Required';
	}
	return errors;
};

export const input = props => {
	const { meta, input } = props;
	return (
		<View>
			<Item>
				{props.type === 'email' ? (
					<Icon name="ios-mail" style={{ color: commonColor.lightThemePlaceholder }} />
				) : (
					<Icon name="ios-lock" style={{ color: commonColor.lightThemePlaceholder }} />
				)}
				<Input {...input} {...props} />
			</Item>

			{meta.touched && meta.error && <Text style={{ color: 'red' }}>{meta.error}</Text>}
		</View>
	);
};
input.propTypes = {
	input: PropTypes.object,
	meta: PropTypes.object,
};

class LoginForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			checked: false,
		};
	}
	static propTypes = {
		dispatch: PropTypes.func,
		handleSubmit: PropTypes.func,
		forgotMail: PropTypes.func,
		isFetching: PropTypes.bool,
	};
	submit(values) {
		this.props.dispatch(signinAsync(values));
	}
	forgotPassword(values) {
		this.props.dispatch(forgotMail());
	}
	render() {
		return (
			<View>
				<View style={{ padding: 10 }}>
					<Field
						component={input}
						type="email"
						name="email"
						placeholder="Email"
						placeholderTextColor={commonColor.lightThemePlaceholder}
						keyboardType="email-address"
						autoCapitalize="none"
					/>
				</View>
				<View style={{ padding: 10 }}>
					<Field
						component={input}
						placeholder="Password"
						secureTextEntry
						placeholderTextColor={commonColor.lightThemePlaceholder}
						name="password"
						autoCapitalize="none"
					/>
				</View>
				<View style={styles.regBtnContain}>
					<Button onPress={this.props.handleSubmit(this.submit.bind(this))} block style={styles.regBtn}>
						{this.props.isFetching ? (
							<Spinner />
						) : (
							<Text style={{ color: '#fff', fontWeight: 'bold' }}>Sign In</Text>
						)}
					</Button>
				</View>
				<Button
					transparent
					style={{ left: deviceWidth - 200 }}
					// onPress={this.props.handleSubmit(this.forgotPassword.bind(this))}
					onPress={this.forgotPassword.bind(this)}
				>
					<Text style={{ color: 'red' }}>Forgot Password ?</Text>
				</Button>
			</View>
		);
	}
}
export default reduxForm({
	form: 'login', // a unique name for this form
	validate,
})(LoginForm);
