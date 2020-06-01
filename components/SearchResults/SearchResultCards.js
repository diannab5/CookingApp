import Carousel, { Pagination } from 'react-native-snap-carousel';
import React, { useState } from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import SliderEntry from './SliderEntry'

function wp (percentage) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}

const { width: viewportWidth} = Dimensions.get('window');
const slideWidth = wp(75);
const itemHorizontalMargin = wp(2);
const itemWidth = slideWidth + itemHorizontalMargin * 2;
const sliderWidth = Dimensions.get('window').width;

export default function MyCarousel (props) {
  const [active, setActive] = useState(0);

  const _renderItem = ({item}) => {
    return <SliderEntry data={item} navigation={props.navigation}/>;
  }
  return (
    <View style={styles.exampleContainer, styles.shadow}>
      <Carousel
      data={props.recipes}
      renderItem={_renderItem}
      sliderWidth={sliderWidth}
      itemWidth={itemWidth}
      layout={'default'}
      loop={true}
      onSnapToItem={(index) => setActive( index ) }
      />
      <Pagination
      dotsLength={props.recipes.length}
      activeDotIndex={active}
      containerStyle={styles.paginationContainer}
      dotColor={'rgba(255, 255, 255, 0.92)'}
      dotStyle={styles.paginationDot}
      inactiveDotColor={'lightsalmon'}
      inactiveDotOpacity={0.5}
      inactiveDotScale={0.8}
      />
    </View>
  );      
}

const styles = StyleSheet.create({
  exampleContainer: {
    marginVertical: 30
},
  shadow: {
      position: 'absolute',
      top: 30,
      left: itemHorizontalMargin,
      right: itemHorizontalMargin,
      shadowColor: 'black',
      shadowOpacity: 0.25,
      shadowOffset: { width: 0, height: 10 },
      shadowRadius: 10,
      borderRadius: 8
  },
  paginationContainer: {
      paddingVertical: 18
  },
  paginationDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
  }
});