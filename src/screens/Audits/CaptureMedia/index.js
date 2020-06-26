import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  createChecklistInstanceItemMedia,
  uploadMediaToS3,
} from 'entities/Checklist/actions';
import Camera from './Camera';

const CaptureMediaContainer = props => {
  return (
    <Camera {...props} />
  );
};

CaptureMediaContainer.propTypes = {
  createChecklistInstanceItemMedia: PropTypes.func.isRequired,
  uploadMediaToS3: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  createChecklistInstanceItemMedia: (itemId, clInstId, type, fileExt, mime, localUri) => (
    dispatch(createChecklistInstanceItemMedia(itemId, clInstId, type, fileExt, mime, localUri))
  ),
  uploadMediaToS3: (signedUrl, fileRef, mimeType) => (
    dispatch(uploadMediaToS3(signedUrl, fileRef, mimeType))
  ),
});

export default connect(null, mapDispatchToProps)(CaptureMediaContainer);