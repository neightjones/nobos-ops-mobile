import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Image} from 'react-native';
import { Video } from 'expo-av';
import {
  Card,
  CardItem,
  Text,
  Body,
  Left,
  Button,
  Icon,
  View,
} from 'native-base';

const TrainingCard = ({ data, count, onAck, training }) => {
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
      <CardItem>
        <View style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Video
            source={{ uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }}
            useNativeControls
            rate={1.0}
            volume={1.0}
            isMuted={false}
            resizeMode={Video.RESIZE_MODE_CONTAIN}
            style={{ width: 200, height: 200 }}
          />
        </View>
        {/* <Image
          source={{
            uri: imageUrl,
          }}
          style={{height: 275, width: null, flex: 1}}
        /> */}
      </CardItem>
      <CardItem>
        <Text style={{ color: '#616161', fontSize: 14 }}>{description}</Text>
      </CardItem>
      {training && (
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
      )}
    </Card>
  );
};

TrainingCard.propTypes = {
  data: PropTypes.object.isRequired,
  count: PropTypes.number,
  onAck: PropTypes.func,
  training: PropTypes.bool.isRequired,
};

export default TrainingCard;
