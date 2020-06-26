import {
  TOGGLE_ITEM,
  ADD_PHOTO,
  ADD_VIDEO,
  UPDATE_COMMENT,
  SET_FETCHING_CHECKLISTS,
  ON_CHECKLISTS_RECEIVED,
  SET_CREATING_INSTANCE,
  ON_INSTANCE_CREATED,
  ON_PATCH_INSTANCE_ITEM,
} from './actions';

const initialState = {
  isFetchingChecklists: false,
  checklists: null,
  isCreatingInstance: false,
  currentInstance: null,
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
    case SET_FETCHING_CHECKLISTS:
      return {
        ...state,
        isFetchingChecklists: action.isFetching,
      };
    case ON_CHECKLISTS_RECEIVED:
      return {
        ...state,
        checklists: action.checklists,
      };
    case SET_CREATING_INSTANCE:
      return {
        ...state,
        isCreatingInstance: action.isCreating,
      };
    case ON_INSTANCE_CREATED:
      return {
        ...state,
        currentInstance: action.instance,
      };
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
    case ON_PATCH_INSTANCE_ITEM: {
      const { itemId, field, value } = action;
      const instanceItems = state.currentInstance?.instanceItems ?? [];
      const nextInstanceItems = [];
      instanceItems.forEach(item => {
        if (item.id === itemId) {
          nextInstanceItems.push({ ...item, [field]: value });
        } else {
          nextInstanceItems.push({ ...item });
        }
      });
      return {
        ...state,
        currentInstance: {
          ...state.currentInstance,
          instanceItems: nextInstanceItems,
        },
      };
    }
    default: return state;
  }
};

export default reducer;