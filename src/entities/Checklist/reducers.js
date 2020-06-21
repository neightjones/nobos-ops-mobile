import {
  TOGGLE_ITEM, ADD_PHOTO, ADD_VIDEO, UPDATE_COMMENT,
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

const pushOntoItemList = (prevList, itemId, listProp, value) => {
  const nextList = [];
  prevList.forEach(i => {
    if (i.id === itemId) nextList.push({
      ...i,
      [listProp]: [...i[listProp], value],
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
    case ADD_PHOTO: {
      const { itemId, uri } = action;
      const nextList = pushOntoItemList(state.checklist, itemId, 'images', uri);
      return {
        ...state,
        checklist: nextList,
      };
    }
    case ADD_VIDEO: {
      const { itemId, uri } = action;
      const nextList = pushOntoItemList(state.checklist, itemId, 'videos', uri);
      return {
        ...state,
        checklist: nextList,
      };
    }
    case UPDATE_COMMENT: {
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