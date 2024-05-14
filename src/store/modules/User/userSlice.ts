import {
	createAsyncThunk,
	createEntityAdapter,
	createSlice,
} from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { RootState } from '../..';
import { FilterUserDto, UserDto } from '../../types/User';
import serviceApi from '../../../configs/services/api';
import { showNotification } from '../Notification/notificationSlice';
import { ResponseUserDto } from '../../types/ResponseRequest';

export const listAllUsers = createAsyncThunk(
	'user/listAllUsers',
	async (filter: FilterUserDto, { dispatch }) => {
		try {
			const response = await serviceApi.get('/user', {
				params: {
					name: filter.name?.trim(),
					email: filter.email?.trim(),
					cpf: filter.cpf?.trim(),
					phone: filter.phone?.trim(),
				},
			});
			dispatch(
				showNotification({
					message: response.data.message,
					success: response.data.success,
				}),
			);
			return response.data;
		} catch (error) {
			if (error instanceof AxiosError) {
				const result: ResponseUserDto = {
					success: error.response?.data.success,
					message: error.response?.data.message,
				};
				dispatch(
					showNotification({
						message: error.response?.data.message,
						success: false,
					}),
				);
				return result;
			}
			return {
				success: false,
				message: 'Algo de errado não está certo. A requisição falhou.',
			};
		}
	},
);

const userAdapter = createEntityAdapter<UserDto>({
	selectId: (state) => state.id,
});

export const { selectAll: listUsers } = userAdapter.getSelectors(
	(global: RootState) => global.user,
);

const userSlice = createSlice({
	name: 'user',
	initialState: userAdapter.getInitialState({
		loading: false,
		message: '',
	}),
	reducers: {
		refresh(state) {
			return { ...state };
		},
	},

	extraReducers: (builder) => {
		builder.addCase(listAllUsers.pending, (state) => {
			state.loading = true;
			state.message = 'Carregando usuários.';
		});

		builder.addCase(listAllUsers.fulfilled, (state, action) => {
			const { message, data } = action.payload;

			state.loading = false;
			state.message = message;

			if (!data || data.length === 0) {
				state.message = 'Nada encontrado.';
				return;
			}

			userAdapter.setAll(state, data);
		});
	},
});

export default userSlice.reducer;
export const { refresh } = userSlice.actions;
