import React, { useState, useEffect } from 'react';
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

export default HomeContainer;

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
  },
  logoutBtn: {
    marginTop: 30,
  },
});