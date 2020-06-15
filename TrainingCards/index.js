import React, {useState} from 'react';
import {Container, View, Text, H2} from 'native-base';
import {Dimensions, StyleSheet} from 'react-native';
import TrainingCard from './Card';
import ConfirmCard from './ConfirmCard';
import data from './data';

import Carousel, {Pagination} from 'react-native-snap-carousel'; // Version can be specified in package.json

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.8);
const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 2.8);
//const ITEM_HEIGHT = Math.round((ITEM_WIDTH * 3) / 4);

const Cards = () => {
  const [index, setIndex] = useState(0);
  const [ackCount, setAckCount] = useState(0);

  const renderItem = item => {
    if (item.confirmCard) {
      return (
        <ConfirmCard data={item} complete={ackCount === data.length - 1} />
      );
    }

    return (
      <TrainingCard
        data={item}
        count={data.length - 1}
        style={styles.itemContainer}
        onAck={() => setAckCount(ackCount + 1)}
      />
    );
  };

  return (
    <Container>
      <View
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 20,
        }}>
        <H2>Restroom Cleaning</H2>
      </View>
      <Carousel
        data={data}
        renderItem={({item}) => renderItem(item)}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        containerCustomStyle={styles.carouselContainer}
        inactiveSlideShift={0}
        onSnapToItem={index => setIndex(index)}
        useScrollView={true}
      />
      <View
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{color: ackCount === data.length - 1 ? 'green' : 'grey'}}>
          {`${ackCount} / ${data.length - 1} Steps Acknowledged`}
        </Text>
      </View>
      <Pagination
        dotsLength={data.length}
        activeDotIndex={index}
        containerStyle={{}}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 8,
          backgroundColor: 'grey',
        }}
        inactiveDotStyle={
          {
            // Define styles for inactive dots here
          }
        }
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    </Container>
  );
};

export default Cards;

const styles = StyleSheet.create({
  carouselContainer: {
    marginTop: 10,
  },
  itemContainer: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'dodgerblue',
  },
  itemLabel: {
    color: 'white',
    fontSize: 24,
  },
  counter: {
    marginTop: 25,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
