import { combineReducers } from '@reduxjs/toolkit';

import notificationSlice from './Notification/notificationSlice';
import userSlice from './User/userSlice';

const rootReducer = combineReducers({
	// a cada novo slice, adicionamos uma nova propriedade neste objeto
	// propriedade - nome na store
	// valor - reducer/manager deste estado global
	// modal: modalSlice,
	notification: notificationSlice,
	user: userSlice,

	// modal: modalTarefasSlice,
});

export default rootReducer;
