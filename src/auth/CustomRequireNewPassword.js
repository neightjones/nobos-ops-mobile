import React from 'react';
import { RequireNewPassword } from 'aws-amplify-react-native'
import { Text, TouchableOpacity } from 'react-native';
import { Container, Header, Content, Input, Item, Button } from 'native-base';

// Implemented per https://github.com/aws-amplify/amplify-js/blob/master/packages/aws-amplify-react-native/src/Auth/RequireNewPassword.tsx
class CustomRequireNewPassword extends RequireNewPassword {
  onAttributeChange(attribute, value) {
    const attributes = this.state.requiredAttributes;
    if (value === '') {
      delete attributes[attribute];
    } else {
      attributes[attribute]= value;
    }
    super.setState({ requiredAttributes: attributes });
  }

  showComponent(_) {
    return (
      <Container>
        <Content>
          <Text>
            My Require New Pwd Screen
          </Text>
          <Item regular>
            <Input
              placeholder='New Password'
              onChangeText={val => super.setState({ password: val })}
              secureTextEntry
            />
          </Item>
          <Item regular>
            <Input
              placeholder='First Name'
              onChangeText={val => this.onAttributeChange('name', val)}
            />
          </Item>
          <Item regular>
            <Input
              placeholder='Last Name'
              onChangeText={val => this.onAttributeChange('family_name', val)}
            />
          </Item>
          <Item regular>
            <Input
              placeholder='Phone Number'
              onChangeText={val => this.onAttributeChange('phone_number', val)}
            />
          </Item>
          <Button
            onPress={() => super.change()}
          >
            <Text>Update Info</Text>
          </Button>
          <Text>
            {this.state.error}
          </Text>
        </Content>
      </Container>
    );
  }
}

export default CustomRequireNewPassword;