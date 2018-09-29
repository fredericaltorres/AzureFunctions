import { combineReducers } from "redux";

// import counterReducer from "entities/counter/counterReducer";
// import { prefix as counterPrefix } from "entities/counter/counterConstants";
// import userReducer from "entities/user/userReducer";
// import { prefix as userPrefix } from "entities/user/userConstants";

import  todoReducer  from './todo/todoReducer'

export default combineReducers({
	// [counterPrefix]: counterReducer,
	// [userPrefix]: userReducer,
	"todo": todoReducer,
});
