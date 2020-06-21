export const SUBMIT_CHECKLIST = 'SUBMIT_CHECKLIST';
export const TOGGLE_ITEM = 'TOGGLE_ITEM';
export const ADD_PHOTO = 'ADD_PHOTO';
export const ADD_VIDEO = 'ADD_VIDEO';
export const UPDATE_COMMENT = 'UPDATE_COMMENT';

const doSubmitChecklist = () => ({
  type: SUBMIT_CHECKLIST,
  checklistId,
});

export const doToggleItem = itemId => ({
  type: TOGGLE_ITEM,
  itemId,
});

export const addPhoto = (itemId, uri) => ({
  type: ADD_PHOTO,
  itemId,
  uri,
});

export const addVideo = (itemId, uri) => ({
  type: ADD_VIDEO,
  itemId,
  uri,
});

export const updateComment = (itemId, text) => ({
  type: UPDATE_COMMENT,
  itemId,
  text,
});