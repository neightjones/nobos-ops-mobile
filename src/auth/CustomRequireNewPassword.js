import React from 'react';
import { RequireNewPassword } from 'aws-amplify-react-native'
import { StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import {
  Text,
  Container,
  Content,
  Input,
  Item,
  H2,
  Button,
} from 'native-base';

const width = Dimensions.get('window').width;

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
        <Content
          style={styles.content}
          contentContainerStyle={styles.contentContainerStyle}
        >
          <Image
            source={require('../../assets/images/logo.png')}
            style={styles.logo}
          />
          <H2 style={styles.header}>
            Complete Information
          </H2>
          <Item regular style={styles.inputItem2}>
            <Input
              placeholder='New Password'
              onChangeText={val => super.setState({ password: val })}
              secureTextEntry
            />
          </Item>
          <Text style={styles.infoText}>
            At least 8 characters: upper, lower, number
          </Text>
          <Item regular style={styles.inputItem}>
            <Input
              placeholder='First Name'
              onChangeText={val => this.onAttributeChange('name', val)}
            />
          </Item>
          <Item regular style={styles.inputItem}>
            <Input
              placeholder='Last Name'
              onChangeText={val => this.onAttributeChange('family_name', val)}
            />
          </Item>
          <Item regular style={styles.inputItem2}>
            <Input
              placeholder='Phone Number'
              onChangeText={val => this.onAttributeChange('phone_number', val)}
            />
          </Item>
          <Text style={styles.infoText}>
            Format: +12223334444
          </Text>
          <Text style={styles.errorText}>
            {this.state.error}
          </Text>
          <Button
            style={styles.submitBtn}
            onPress={() => super.change()}
          >
            <Text>Update Info</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

export default CustomRequireNewPassword;

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
  inputItem2: {
    marginTop: 10,
    marginBottom: 3,
  },
  submitBtn: {
    marginTop: 10,
    marginBottom: 20,
  },
  infoText: {
    color: '#676767',
    marginBottom: 10,
    fontSize: 14,
  },
  errorText: {
    color: 'red',
  },
});