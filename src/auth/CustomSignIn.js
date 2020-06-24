import React from 'react';
import { SignIn } from 'aws-amplify-react-native'
import { StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import {
  Container,
  Content,
  Input,
  Item,
  Button,
  Text,
  H2,
} from 'native-base';

const width = Dimensions.get('window').width;

class CustomSignIn extends SignIn {
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
            Sign In
          </H2>
          <Item regular style={styles.inputItem}>
            <Input
              placeholder='Email'
              onChangeText={val => super.setState({ username: val })}
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
            style={styles.submitBtn}
            onPress={() => super.signIn()}
          >
            <Text>Sign In</Text>
          </Button>
          <Text style={styles.errorText}>
            {this.state.error}
          </Text>
          <TouchableOpacity onPress={() => super.changeState('forgotPassword')}>
            <Text style={styles.forgotPwdLink}>
              Forgot Password?
            </Text>
          </TouchableOpacity>
        </Content>
      </Container>
    );
  }
}

export default CustomSignIn;

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
  submitBtn: {
    marginTop: 10,
    marginBottom: 20,
  },
  forgotPwdLink: {
    color: 'blue',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});