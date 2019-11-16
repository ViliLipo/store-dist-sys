import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';

import {auth, user} from 'core/redux/reducers';

export default combineReducers({
    form: formReducer,
    auth,
    user,
});
