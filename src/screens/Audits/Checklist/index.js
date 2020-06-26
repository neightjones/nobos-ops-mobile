import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { Button, Text } from 'native-base';
import { patchChecklistInstanceItem } from 'entities/Checklist/actions';
import List from './List';

const AuditChecklistMain = props => {
  const { navigation, currentInstance } = props;

  // Should not have this case
  if (!currentInstance) {
    return (
      <View>
        <Text>
          Sorry, no active Audit!
        </Text>
        <Button
          onPress={() => navigation.navigate('home')}
        >
          <Text>Back Home</Text>
        </Button>
      </View>
    );
  }

  return (
    <List {...props} />
  );
};

AuditChecklistMain.propTypes = {
  currentInstance: PropTypes.object,
  patchChecklistInstanceItem: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  currentInstance: state.entities.checklists.currentInstance,
});

const mapDispatchToProps = dispatch => ({
  patchChecklistInstanceItem: (itemId, field, curr, next) => (
    dispatch(patchChecklistInstanceItem(itemId, field, curr, next))
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(AuditChecklistMain);