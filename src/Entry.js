import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Auth } from 'aws-amplify';
import { connect } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { Button, Text } from 'native-base';
import { fetchChain } from 'entities/Chain/actions';
import useCachedResources from '../hooks/useCachedResources';
import Navigator from './navigation';

const Entry = props => {
  const { chain, isFetchingChain, fetchChain } = props;
  const isLoadingComplete = useCachedResources();

  useEffect(() => {
    (async () => {
      fetchChain();
    })();
  }, []);

  if (!isLoadingComplete || isFetchingChain) {
    return null;
  }

  if (chain === null) {
    return (
      <View style={styles.noChain}>
        <Text>
          Looks like you haven't been added
        </Text>
        <Text>
          to an organization, yet.
        </Text>
        <Text>
          Please email contact@nobos.co for help.
        </Text>
        <Button
          danger
          onPress={() => Auth.signOut()}
          style={{ marginTop: 20 }}
        >
          <Text>Log Out</Text>
        </Button>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {Platform.OS === 'ios' && <StatusBar barStyle="dark-content" />}
      <NavigationContainer>
        <Navigator />
      </NavigationContainer>
    </View>
  );
};

Entry.propTypes = {
  chain: PropTypes.object,
  isFetchingChain: PropTypes.bool.isRequired,
  fetchChain: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  chain: state.entities.chain.chain,
  isFetchingChain: state.entities.chain.isFetching,
});

const mapDispatchToProps = dispatch => ({
  fetchChain: () => dispatch(fetchChain()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Entry);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  noChain: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
