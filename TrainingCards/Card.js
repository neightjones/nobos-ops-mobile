import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Image} from 'react-native';
import {
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

const TrainingCard = ({data, count, onAck}) => {
  const {step, title, description, imageUrl} = data;
  const [acked, setAcked] = useState(false);

  return (
    <Card>
      <CardItem>
        <Left>
          <Body>
            <Text>{title}</Text>
            <Text note>{`Step ${step}/${count}`}</Text>
          </Body>
        </Left>
      </CardItem>
      <CardItem cardBody>
        <Image
          source={{
            uri: imageUrl,
          }}
          style={{height: 275, width: null, flex: 1}}
        />
      </CardItem>
      <CardItem>
        <Text note>{description}</Text>
      </CardItem>
      <CardItem>
        <Left>
          <Button
            onPress={() => {
              if (!acked) {
                setAcked(true);
                onAck();
              }
            }}
            style={{borderRadius: 80}}
            light={acked === false}
            success={acked === true}
            bordered={acked === false}>
            <Icon ios="ios-checkmark-circle" android="md-checkmark-circle" />
          </Button>
          <Text>{acked ? 'Acknowledged!' : 'Press to Acknowledge'}</Text>
        </Left>
      </CardItem>
      {/*
      <CardItem>
        <Left>
          <Button transparent>
            <Icon active name="thumbs-up" />
            <Text>12 Likes</Text>
          </Button>
        </Left>
        <Body>
          <Button transparent>
            <Icon active name="chatbubbles" />
            <Text>4 Comments</Text>
          </Button>
        </Body>
        <Right>
          <Text>11h ago</Text>
        </Right>
      </CardItem>
      */}
    </Card>
  );
};

TrainingCard.propTypes = {
  data: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired,
  onAck: PropTypes.func.isRequired,
};

export default TrainingCard;
