import * as yup from 'yup';

export const checkoutValidation = [
	yup.object({
		fullName: yup.string().required('Full name is required'),
		address1: yup.string().required('Address line 1 is required'),
		address2: yup.string().required(),
		city: yup.string().required(),
		state: yup.string().required(),
		zip: yup.string().required(),
		country: yup.string().required(),
	}),
	yup.object({
		nameOnCard: yup.string().required('Name card is required'),
		cardExpiry: yup.object().required('Card expire is required'),
		cardCvv: yup.object().required('Card cvv is required'),
		cardNumber: yup.object().required('Card number is required'),
	}),
	yup.object(),
];
