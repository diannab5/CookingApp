import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import PropTypes from 'prop-types';

const IS_IOS = Platform.OS === 'ios';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
const slideHeight = viewportHeight * 0.58;
const slideWidth = wp(76);
const itemHorizontalMargin = wp(2);
const itemWidth = slideWidth + itemHorizontalMargin * 2;
const entryBorderRadius = 8;

function wp (percentage) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}


export default function SliderEntry (props){
  
    const getImage = () => {
      const { data: { illustration }} = props 
      return (
        <Image
          source={{ uri: illustration }}
          style={styles.image}
        />
      );
    }
    const { data: recipe } = props;

    const uppercaseTitle = recipe.title ? (
        <Text
          style={[styles.title]}
          numberOfLines={2}
        >
            { recipe.title.toUpperCase() }
        </Text>
    ) : false
    const missingIng = recipe.missing ? (
      <Text
        style={[styles.time]}
        numberOfLines={2}
      >
        Missing Ingredients: { recipe.missing }
      </Text>
    ) : false;

    return (
        <TouchableOpacity
          activeOpacity={1}
          style={styles.slideInnerContainer}
          onPress={() => {props.navigation.navigate('Recipe', {recipe});}}>
            <View style={styles.shadow} />
            <View style={[styles.imageContainer]}>
                { getImage() }
                <View style={[styles.radiusMask]} />
            </View>
            <View style={[styles.textContainer]}>
                { uppercaseTitle }
                { missingIng }
                <Text
                  style={[styles.time]}
                  numberOfLines={2}
                >
                { recipe.time } minutes
                </Text>
            </View>
        </TouchableOpacity>
    );
}

SliderEntry.propTypes = {
  data: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
  slideInnerContainer: {
      width: itemWidth,
      height: slideHeight,
      paddingHorizontal: itemHorizontalMargin,
      paddingBottom: 8 // needed for shadow
  },
  imageContainer: {
      flex: 1,
      marginBottom: IS_IOS ? 0 : -1, // Prevent a random Android rendering issue
      backgroundColor: 'white',
      borderTopLeftRadius: entryBorderRadius,
      borderTopRightRadius: entryBorderRadius
  },
  image: {
      ...StyleSheet.absoluteFillObject,
      resizeMode: 'cover',
      borderRadius: IS_IOS ? entryBorderRadius : 0,
      borderTopLeftRadius: entryBorderRadius,
      borderTopRightRadius: entryBorderRadius
  },
  // image's border radius is buggy on iOS; let's hack it!
  radiusMask: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: entryBorderRadius,
      backgroundColor: 'white'
  },
  textContainer: {
      justifyContent: 'center',
      paddingTop: 20 - entryBorderRadius,
      paddingBottom: 20,
      paddingHorizontal: 16,
      backgroundColor: 'white',
      borderBottomLeftRadius: entryBorderRadius,
      borderBottomRightRadius: entryBorderRadius
  },
  title: {
      color: 'black',
      fontSize: 14,
      fontWeight: 'bold',
      letterSpacing: 0.5
  },
  time: {
      marginTop: 6,
      color: 'gray',
      fontSize: 13,
  }
});
