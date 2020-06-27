import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Auth } from 'aws-amplify';
import { View, StyleSheet, Image } from 'react-native';
import {
  Container,
  Content,
  Text,
  Button,
  Icon,
  H3,
  Card,
} from 'native-base';

const HomeContainer = props => {
  const {
    navigation,
    chainName,
  } = props;
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    (async () => {
      const info = await Auth.currentUserInfo();
      setUserDetails(info.attributes);
    })();
  }, []);

  return (
    <Container>
      <Content style={styles.content} contentContainerStyle={styles.contentContainerStyle}>
        {!userDetails
          ? (
            <Text>Loading...</Text>
          ) : (
            <View>
              <Card style={styles.card}>
                <Image
                  source={require('../../../assets/images/logo.png')}
                  style={styles.logo}
                />
                <H3 style={styles.welcome}>
                  {`Welcome, ${userDetails.name}!`}
                </H3>
                <Button
                  onPress={() => navigation.navigate('audit')}
                  style={styles.authBtn}
                  iconLeft
                >
                  <Icon name="ios-list" />
                  <Text>
                    Go to Auditing
                  </Text>
                </Button>
                <Text style={styles.centerText}>
                  Your Organization:
                </Text>
                <Text style={styles.centerText}>
                  {chainName}
                </Text>
              </Card>
            </View>
          )}
          <Button
            style={styles.logoutBtn}
            danger
            onPress={() => Auth.signOut()}
          >
            <Text>Log Out</Text>
          </Button>
      </Content>
    </Container>
  )
};

HomeContainer.propTypes = {
  navigation: PropTypes.object.isRequired,
  chainName: PropTypes.string,
};

const mapStateToProps = state => ({
  chainName: state.entities.chain.chain.name,
});

export default connect(mapStateToProps)(HomeContainer);

const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: '#fafafa',
    paddingTop: 75,
    paddingLeft: 20,
    paddingRight: 20,
  },
  contentContainerStyle: {
    alignItems: 'center',
    paddingBottom: 160,
  },
  card: {
    padding: 30,
  },
  logo: {
    alignSelf: 'center',
    width: 150,
    height: 75,
  },
  welcome: {
    textAlign: 'center',
    marginBottom: 20,
  },
  authBtn: {
    alignSelf: 'center',
    marginBottom: 20,
  },
  logoutBtn: {
    marginTop: 30,
  },
  centerText: {
    textAlign: 'center',
  },
});