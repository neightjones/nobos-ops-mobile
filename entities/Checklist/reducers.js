import {
  TOGGLE_ITEM,
} from './actions';
import createDefaultList from './utils';

const initialState = {
  checklist: createDefaultList(),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_ITEM: {
      const { itemId } = action;
      const nextList = [];
      state.checklist.forEach(i => {
        if (i.id === itemId) nextList.push({
          ...i,
          checked: !i.checked,
        });
        else nextList.push({ ...i });
      });
      return {
        ...state,
        checklist: nextList,
      };
    }
    default: return state;
  }
};

export default reducer;