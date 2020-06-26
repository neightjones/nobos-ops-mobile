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

export const addPhoto = (itemId, localUri, remoteMediaId) => ({
  type: ADD_PHOTO,
  itemId,
  localUri,
  remoteMediaId,
});

export const addVideo = (itemId, localUri, remoteMediaId) => ({
  type: ADD_VIDEO,
  itemId,
  localUri,
  remoteMediaId,
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

export const uploadMediaToS3 = async (signedUrl, fileRef, mimeType) => {
  console.log('upload to s3...');
  console.log('signedUrl: ' + signedUrl);
  console.log('fileRef: ' + fileRef);
  console.log('mimeType: ' + mimeType);
  await fetch(signedUrl, {
    method: 'PUT',
    body: fileRef,
    headers: {
      'Content-Type': mimeType,
    },
  });
  console.log('Successful PUT to s3');
};

export const createChecklistInstanceItemMedia = (
  itemId,
  checklistInstanceId,
  type,
  fileExtension,
  mimeType,
  localUri
) => async dispatch => {
  try {
    // dispatch(setCreatingInstance(true));
    const headers = await getHeaders(true);
    const body = JSON.stringify({ checklistInstanceId, fileExtension, mimeType });
    const options = { headers, method: 'post', body };
    const url = `${apiUrl}/api/v1/audits/checklist-instance-items/${itemId}/media`;
    const res = await fetchThrowable(url, options);
    const json = await res.json();
    const { media, signedUrl } = json;
    if (type === 'PICTURE') {
      dispatch(addPhoto(itemId, localUri, media.id));
    } else {
      dispatch(addVideo(itemId, localUri, media.id));
    }
    return {
      remoteMediaId: media.id,
      key: media.mediaKeyOriginal,
      signedUrl,
    };
  } catch (e) {
    console.error(`Failed to createChecklistInstance: ${e}`);
  } finally {
    // dispatch(setCreatingInstance(false));
  }
};