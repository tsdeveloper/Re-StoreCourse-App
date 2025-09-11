import * as yup from 'yup';

export const checkoutSchema = [
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
		card: yup
			.object({
				complete: yup.boolean().nullable(),
				error: yup.object().nullable(),
				brand: yup.string().nullable(),
			})
			.test('card-complete', 'Dados do cartão incompletos', function (value) {
				if (!value || !value.complete) {
					return this.createError({
						message: 'Por favor, complete os dados do cartão',
					});
				}
				if (
					value.error &&
					typeof value.error === 'object' &&
					'message' in value.error
				) {
					return this.createError({
						message: (value.error as any).message || 'Erro no cartão',
					});
				}
				return true;
			}),
	}),
	yup.object(),
];
