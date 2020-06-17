import {
  TOGGLE_ITEM, SET_PHOTO, SET_VIDEO, SET_COMMENT,
} from './actions';
import createDefaultList from './utils';

const initialState = {
  checklist: createDefaultList(),
};

// = new list
const updateListItem = (prevList, itemId, property, value) => {
  const nextList = [];
  prevList.forEach(i => {
    if (i.id === itemId) nextList.push({
      ...i,
      [property]: value,
    });
    else nextList.push({ ...i });
  });
  return nextList;
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
    case SET_PHOTO: {
      const { itemId, uri } = action;
      const nextList = updateListItem(state.checklist, itemId, 'imageUri', uri);
      return {
        ...state,
        checklist: nextList,
      };
    }
    case SET_VIDEO: {
      const { itemId, uri } = action;
      const nextList = updateListItem(state.checklist, itemId, 'videoUri', uri);
      return {
        ...state,
        checklist: nextList,
      };
    }
    case SET_COMMENT: {
      const { itemId, text } = action;
      const nextList = updateListItem(state.checklist, itemId, 'comment', text);
      return {
        ...state,
        checklist: nextList,
      };
    }
    default: return state;
  }
};

export default reducer;