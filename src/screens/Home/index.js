import React from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';

const HomeContainer = props => {
  return (
    <View>
      <Text>
        Home Page
      </Text>
    </View>
  );
};

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);