import React from 'react';
import PropTypes from 'prop-types';
import Info from 'components/Info';
import { View, StyleSheet } from 'react-native';
import { Button, Text, Icon } from 'native-base';

const CANCEL_STATUS = 'CANCELED';

const ExistingAudit = props => {
  const {
    navigation,
    currentInstance,
    patchChecklistInstance,
  } = props;
  const { id, status } = currentInstance;

  return (
    <View>
      <View style={styles.infoContainer}>
        <Info text={`Audit in progress: ${currentInstance.name}`} />
      </View>
      <Button
        onPress={() => navigation.navigate('checklist')}
        style={styles.btnStyle}
        iconRight
      >
        <Text>Go to Audit</Text>
        <Icon name="ios-arrow-round-forward" />
      </Button>
      <Button
        danger
        onPress={() => {
          patchChecklistInstance(id, 'status', status, CANCEL_STATUS);
        }}
        style={styles.btnStyle}
      >
        <Text>Cancel Audit</Text>
      </Button>
    </View>
  );
};

ExistingAudit.propTypes = {
  navigation: PropTypes.object.isRequired,
  currentInstance: PropTypes.object, // nullable
  patchChecklistInstance: PropTypes.func.isRequired,
};

export default ExistingAudit;

const styles = StyleSheet.create({
  infoContainer: {
    width: '80%',
    alignSelf: 'center',
    maxHeight: 75,
    marginTop: 20,
  },
  btnStyle: {
    alignSelf: 'center',
    marginTop: 20,
  },
});