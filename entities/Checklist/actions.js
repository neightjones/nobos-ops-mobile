export const SUBMIT_CHECKLIST = 'SUBMIT_CHECKLIST';
export const TOGGLE_ITEM = 'TOGGLE_ITEM';

const doSubmitChecklist = () => ({
  type: SUBMIT_CHECKLIST,
  checklistId,
});

export const doToggleItem = itemId => ({
  type: TOGGLE_ITEM,
  itemId,
});

// export const deleteItem = (checklistId, itemId) => async dispatch => {
//   // Successful network call
//   dispatch(doDeleteItem(checklistId, itemId));
// };