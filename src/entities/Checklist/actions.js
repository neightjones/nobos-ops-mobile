export const SUBMIT_CHECKLIST = 'SUBMIT_CHECKLIST';
export const TOGGLE_ITEM = 'TOGGLE_ITEM';
export const SET_PHOTO = 'SET_PHOTO';
export const SET_VIDEO = 'SET_VIDEO';
export const SET_COMMENT = 'SET_COMMENT';

const doSubmitChecklist = () => ({
  type: SUBMIT_CHECKLIST,
  checklistId,
});

export const doToggleItem = itemId => ({
  type: TOGGLE_ITEM,
  itemId,
});

export const setItemPhoto = (itemId, uri) => ({
  SET_PHOTO,
  itemId,
  uri,
});

export const setItemVideo = (itemId, uri) => ({
  SET_VIDEO,
  itemId,
  uri,
});

export const setItemComment = (itemId, text) => ({
  SET_COMMENT,
  itemId,
  text,
});

// export const deleteItem = (checklistId, itemId) => async dispatch => {
//   // Successful network call
//   dispatch(doDeleteItem(checklistId, itemId));
// };