import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  fetchChecklists,
  createChecklistInstance,
  patchChecklistInstance,
} from 'entities/Checklist/actions';
import Existing from './Existing';
import Create from './Create';

const CreateAuditContainer = props => {
  const {
    navigation,
    currentInstance,
    fetchChecklists,
    isCreatingInstance,
    isFetchingChecklists,
    createChecklistInstance,
    checklists,
    patchChecklistInstance,
  } = props;

  if (currentInstance !== null) {
    return (
      <Existing
        navigation={navigation}
        currentInstance={currentInstance}
        patchChecklistInstance={patchChecklistInstance}
      />
    );
  }

  return (
    <Create
      navigation={navigation}
      isFetchingChecklists={isFetchingChecklists}
      fetchChecklists={fetchChecklists}
      createChecklistInstance={createChecklistInstance}
      isCreatingInstance={isCreatingInstance}
      checklists={checklists}
    />
  );
};

CreateAuditContainer.propTypes = {
  navigation: PropTypes.object.isRequired,
  currentInstance: PropTypes.object, // nullable
  fetchChecklists: PropTypes.func.isRequired,
  isCreatingInstance: PropTypes.bool.isRequired,
  isFetchingChecklists: PropTypes.bool.isRequired,
  createChecklistInstance: PropTypes.func.isRequired,
  checklists: PropTypes.arrayOf(PropTypes.object),
  patchChecklistInstance: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  currentInstance: state.entities.checklists.currentInstance,
  isCreatingInstance: state.entities.checklists.isCreatingInstance,
  isFetchingChecklists: state.entities.checklists.isFetchingChecklists,
  checklists: state.entities.checklists.checklists,
});

const mapDispatchToProps = dispatch => ({
  fetchChecklists: () => dispatch(fetchChecklists()),
  createChecklistInstance: checklistId => (
    dispatch(createChecklistInstance(checklistId))
  ),
  patchChecklistInstance: (instId, field, curr, next) => (
    dispatch(patchChecklistInstance(instId, field, curr, next))
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateAuditContainer);