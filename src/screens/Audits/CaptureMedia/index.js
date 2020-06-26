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
    <Camera {...props} uploadMediaToS3={uploadMediaToS3} />
  );
};

CaptureMediaContainer.propTypes = {
  createChecklistInstanceItemMedia: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
  createChecklistInstanceItemMedia: (itemId, clInstId, type, fileExt, mime, localUri) => (
    dispatch(createChecklistInstanceItemMedia(itemId, clInstId, type, fileExt, mime, localUri))
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(CaptureMediaContainer);