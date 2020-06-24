import React from 'react';
import { ForgotPassword } from 'aws-amplify-react-native'
import {
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import {
  Container,
  Content,
  Input,
  Item,
  Button,
  Text,
  H2,
} from 'native-base';

const width = Dimensions.get('window').width

class CustomForgotPassword extends ForgotPassword {
  showComponent(_) {
    return (
      <Container>
        <Content
          style={styles.content}
          contentContainerStyle={styles.contentContainerStyle}
        >
          <Image
            source={require('../../assets/images/logo.png')}
            style={styles.logo}
          />
          <H2 style={styles.header}>
            Reset Password
          </H2>
          {this.state.delivery
            ? (
              <>
                <Item regular style={styles.inputItem}>
                  <Input
                    placeholder='Code'
                    onChangeText={val => super.setState({ code: val })}
                  />
                </Item>
                <Item regular style={styles.inputItem}>
                  <Input
                    placeholder='Password'
                    onChangeText={val => super.setState({ password: val })}
                    secureTextEntry
                  />
                </Item>
                <Button
                  style={styles.changeBtn}
                  onPress={() => super.submit()}
                >
                  <Text>Update Password</Text>
                </Button>
              </>
            ) : (
              <>
                <Item regular>
                  <Input
                    placeholder='Email'
                    onChangeText={val => super.setState({ username: val })}
                  />
                </Item>
                <Button
                  style={styles.sendCodeBtn}
                  onPress={() => super.send()}
                >
                  <Text>Email Reset Code</Text>
                </Button>
              </>
            )}
            <Text style={styles.errorText}>{this.state.error}</Text>
            <TouchableOpacity onPress={() => this.changeState('signIn')}>
              <Text style={styles.navLink}>Back to Sign In</Text>
            </TouchableOpacity>
        </Content>
      </Container>
    );
  }
}

export default CustomForgotPassword;

const styles = StyleSheet.create({
  content: {
    padding: 20,
    width: width - 40,
  },
  contentContainerStyle: {
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 75,
  },
  header: {
    color: '#676767',
    marginBottom: 20,
  },
  inputItem: {
    marginTop: 10,
    marginBottom: 10,
  },
  sendCodeBtn: {
    marginTop: 20,
    marginBottom: 20,
  },
  changeBtn: {
    marginTop: 20,
    marginBottom: 20,
  },
  navLink: {
    color: 'blue',
  },
  errorText: {
    marginTop: 20,
    marginBottom: 20,
    color: 'red',
  },
});