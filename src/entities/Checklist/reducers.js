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

/**
 * photo / video cache... quick way to display media
 * in app by keeping the references to photos / videos that
 * were taken. Do for now since media saved on server won't
 * have the local references that make for easy display:
 * maintains { localUri, remoteMediaId } in order to delete remotely as well
 */
const initialState = {
  isFetchingChecklists: false,
  checklists: null,
  isCreatingInstance: false,
  currentInstance: null,
  photoCache: {},
  videoCache: {},
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
      const { itemId, localUri, remoteMediaId } = action;
      const currForItem = state.photoCache[itemId] || [];
      const nextForItem = [...currForItem, { localUri, remoteMediaId }];

      return {
        ...state,
        photoCache: {
          ...state.photoCache,
          [itemId]: nextForItem,
        },
      };
    }
    case ADD_VIDEO: {
      const { itemId, localUri, remoteMediaId } = action;
      const currForItem = state.videoCache[itemId] || [];
      const nextForItem = [...currForItem, { localUri, remoteMediaId }];

      return {
        ...state,
        videoCache: {
          ...state.videoCache,
          [itemId]: nextForItem,
        },
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