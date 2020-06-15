import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Image} from 'react-native';
import {
  View,
  Header,
  Content,
  Card,
  CardItem,
  Text,
  Body,
  Left,
  Button,
  Right,
  Icon,
} from 'native-base';

const TrainingCard = ({complete, data}) => {
  const {successImageUrl, goBackImageUrl} = data;
  return (
    <Card>
      <CardItem>
        <Left>
          <Body>
            <Text>
              {complete ? 'Complete Training Story' : 'Please Review All Cards'}
            </Text>
            <Text note>
              {complete
                ? 'Complete training story below by clicking Submit.'
                : 'Please go back and acknowledge all steps before submitting'}
            </Text>
          </Body>
        </Left>
      </CardItem>
      <CardItem cardBody>
        <Image
          source={{
            uri: complete ? successImageUrl : goBackImageUrl,
          }}
          style={{height: 275, width: null, flex: 1}}
        />
      </CardItem>
      <CardItem>
        <View
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Button success disabled={!complete}>
            <Text>Submit Training</Text>
          </Button>
        </View>
      </CardItem>
    </Card>
  );
};

TrainingCard.propTypes = {
  data: PropTypes.object.isRequired,
  complete: PropTypes.bool.isRequired,
};

export default TrainingCard;
