import { apiUrl, getHeaders, fetchThrowable } from 'utils/fetch';

export const SUBMIT_CHECKLIST = 'SUBMIT_CHECKLIST';
export const ADD_PHOTO = 'ADD_PHOTO';
export const ADD_VIDEO = 'ADD_VIDEO';
export const SET_FETCHING_CHECKLISTS = 'SET_FETCHING_CHECKLISTS';
export const ON_CHECKLISTS_RECEIVED = 'ON_CHECKLISTS_RECEIVED';
export const SET_CREATING_INSTANCE = 'SET_CREATING_INSTANCE';
export const ON_INSTANCE_CREATED = 'ON_INSTANCE_CREATED';
export const ON_PATCH_INSTANCE_ITEM = 'ON_PATCH_INSTANCE_ITEM';

const doSubmitChecklist = () => ({
  type: SUBMIT_CHECKLIST,
  checklistId,
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

const setFetchingChecklists = isFetching => ({
  type: SET_FETCHING_CHECKLISTS,
  isFetching,
});

const onChecklistsReceived = checklists => ({
  type: ON_CHECKLISTS_RECEIVED,
  checklists,
});

export const fetchChecklists = () => async dispatch => {
  try {
    dispatch(setFetchingChecklists(true));
    const headers = await getHeaders();
    const res = await fetchThrowable(`${apiUrl}/api/v1/audits/checklists`, { headers });
    const json = await res.json();
    dispatch(onChecklistsReceived(json.checklists));
  } catch (e) {
    console.error(`Failed fetchChecklists: ${e}`);
  } finally {
    dispatch(setFetchingChecklists(false));
  }
};

const setCreatingInstance = isCreating => ({
  type: SET_CREATING_INSTANCE,
  isCreating,
});

const onInstanceCreated = instance => ({
  type: ON_INSTANCE_CREATED,
  instance,
});

export const createChecklistInstance = checklistId => async dispatch => {
  try {
    dispatch(setCreatingInstance(true));
    const headers = await getHeaders(true);
    // TODO - locationId
    const body = JSON.stringify({ checklistId, locationId: 1 });
    const options = { headers, method: 'post', body };
    const res = await fetchThrowable(`${apiUrl}/api/v1/audits/checklist-instances`, options);
    const json = await res.json();
    dispatch(onInstanceCreated(json.checklistInstance));
  } catch (e) {
    console.error(`Failed to createChecklistInstance: ${e}`);
  } finally {
    dispatch(setCreatingInstance(false));
  }
};

const doPatchInstanceItem = (itemId, field, value) => ({
  type: ON_PATCH_INSTANCE_ITEM,
  itemId,
  field,
  value,
});

export const patchChecklistInstanceItem = (itemId, field, curr, next) => async dispatch => {
  try {
    // immediately dispatch patch to store
    dispatch(doPatchInstanceItem(itemId, field, next));

    const headers = await getHeaders(true);
    const body = JSON.stringify({ [field]: next });
    const options = { headers, method: 'patch', body };
    await fetchThrowable(
      `${apiUrl}/api/v1/audits/checklist-instance-items/${itemId}`,
      options
    );
  } catch (e) {
    // revert value (assuming error here)
    dispatch(doPatchInstanceItem(itemId, field, curr));
  }
};