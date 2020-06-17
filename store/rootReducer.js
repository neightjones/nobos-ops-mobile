import {combineReducers} from 'redux';
import ChecklistReducer from '../entities/Checklist/reducers';

export default combineReducers({
  entities: combineReducers({
    checklists: ChecklistReducer,
  }),
});