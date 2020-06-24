import React from 'react';
import { ForgotPassword } from 'aws-amplify-react-native'
import { Text, View, TouchableOpacity } from 'react-native';
import { Container, Content, Input, Item, Button } from 'native-base';

class CustomForgotPassword extends ForgotPassword {
  showComponent(_) {
    return (
      <Container>
        <Content>
          {this.state.delivery
            ? (
              <View>
                <Item regular>
                  <Input
                    placeholder='Code'
                    onChangeText={val => super.setState({ code: val })}
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
                  onPress={() => super.submit()}
                >
                  <Text>Update Password</Text>
                </Button>
              </View>
            ) : (
              <View>
                <Text>email?</Text>
                <Item regular>
                  <Input
                    placeholder='Email'
                    onChangeText={val => super.setState({ username: val })}
                  />
                </Item>
                <Button
                  onPress={() => super.send()}
                >
                  <Text>Send Code</Text>
                </Button>
              </View>
            )}
            <Text>{this.state.error}</Text>
            <TouchableOpacity onPress={() => this.changeState('signIn')}>
              <Text>Back to Sign In</Text>
            </TouchableOpacity>
        </Content>
      </Container>
    );
  }
}

export default CustomForgotPassword;