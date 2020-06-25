import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  fetchChecklists,
  createChecklistInstance,
} from 'entities/Checklist/actions';
import { View, Text } from 'react-native';
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
  } = props;



  if (currentInstance !== null) {
    return (
      <View>
        <Text>Already have one</Text>
      </View>
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
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateAuditContainer);