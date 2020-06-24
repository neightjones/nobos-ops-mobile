import React from 'react';
import { SignIn } from 'aws-amplify-react-native'
import { Text, TouchableOpacity } from 'react-native';
import { Container, Header, Content, Input, Item, Button } from 'native-base';

class CustomSignIn extends SignIn {
  showComponent(_) {
    return (
      <Container>
        <Content>
          <Text>
            My Sign in Screen
          </Text>
          <Item regular>
            <Input
              placeholder='Email'
              onChangeText={val => super.setState({ username: val })}
            />
          </Item>
          <Item regular>
            <Input
              placeholder='Password'
              onChangeText={val => super.setState({ password: val })}
              secureTextEntry
            />
          </Item>
          <Button
            onPress={() => super.signIn()}
          >
            <Text>Sign In</Text>
          </Button>
          <Text>
            {this.state.error}
          </Text>
          <TouchableOpacity onPress={() => super.changeState('forgotPassword')}>
            <Text>Forgot Password?</Text>
          </TouchableOpacity>
        </Content>
      </Container>
    );
  }
}

export default CustomSignIn;