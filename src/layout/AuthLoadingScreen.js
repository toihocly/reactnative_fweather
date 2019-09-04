import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  Animated,
  StyleSheet,
  Dimensions,
} from 'react-native';
import background from '../assets/images/background.jpg';
import weather1 from '../assets/images/sunny.png';
import weather2 from '../assets/images/cloud.png';
import weather3 from '../assets/images/wind.png';
import weather4 from '../assets/images/rain.png';
import weather5 from '../assets/images/storm.png';
import Fonts from '../utils/fonts.js';
import {convertInttoTime, colorSecond, colorPrimary} from '../utils/base';

const {height: heightSreen, width: widthSreen} = Dimensions.get('window');

const weathers = [weather1, weather2, weather3, weather4, weather5];

const AuthLoadingScreen = ({navigation}) => {
  const [timeScale, setTimeScale] = useState(new Animated.Value(0));
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    const anim1 = Animated.timing(timeScale, {
      toValue: 2,
      duration: 2000,
    });
    timeScale.addListener(obj => {
      if (obj.value === 2) {
        setImageIndex(value => (value + 1) % weathers.length);
      }
    });

    Animated.loop(anim1).start();
  }, []);

  useEffect(() => {
    return () => {
      timeScale.removeAllListeners();
    };
  }, []);

  const onMove = () => {
    navigation.navigate('App');
  };

  const scaleWidth = timeScale.interpolate({
    inputRange: [0, 2],
    outputRange: [50, 200],
  });
  const scaleHeight = timeScale.interpolate({
    inputRange: [0, 2],
    outputRange: [50, 200],
  });
  return (
    <View
      onStartShouldSetResponder={() => true}
      onMoveShouldSetResponder={() => true}
      onResponderMove={onMove}
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'yellow',
      }}>
      <Image
        style={{position: 'absolute', left: 0, top: 0, height: '100%'}}
        source={background}
        resizeMode="stretch"
      />
      <Text
        style={[
          styless.colorSec,
          {
            fontSize: 20,
            position: 'absolute',
            width: widthSreen,
            textAlign: 'center',
            top: 30,
          },
        ]}>
        Wish you a happy working day
      </Text>
      <Animated.Image
        source={weathers[imageIndex]}
        style={{width: scaleWidth, height: scaleHeight}}
      />
      <Animated.Text
        style={{
          marginTop: 10,
          color: '#03A9F4',
          fontSize: 20,
        }}>
        swipe the screen
      </Animated.Text>
    </View>
  );
};

const styless = StyleSheet.create({
  colorPri: {
    color: colorPrimary,
    fontFamily: Fonts.LoraRegular,
  },
  colorSec: {
    color: '#03A9F4',
    fontFamily: Fonts.LoraBold,
  },
});

export default AuthLoadingScreen;
