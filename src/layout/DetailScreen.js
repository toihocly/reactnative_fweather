import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import fonts from '../utils/fonts';
import {convertInttoHours, convertInttoDate} from '../utils/base';

const {height: heightSreen, width: widthSreen} = Dimensions.get('window');

const WeatherItem = ({item: {main, weather, dt}}) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        width: 90,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'grey',
        margin: 4,
      }}>
      <Text
        style={{
          fontSize: 13,
          fontFamily: fonts.LoraRegular,
          color: '#fff',
          marginTop: 20,
        }}>
        {convertInttoDate(1000 * dt)}
      </Text>
      <Text
        style={{
          fontSize: 20,
          fontFamily: fonts.LoraBold,
          color: '#fff',
        }}>
        {convertInttoHours(1000 * dt)}
      </Text>
      <Image
        style={{height: 50, width: 50, marginTop: 20}}
        source={{
          uri: `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`,
        }}
      />
      <Text
        style={{
          fontSize: 30,
          marginTop: 10,
          color: '#fff',
          fontFamily: fonts.LoraBold,
        }}>{`${Math.floor(main.temp, 2)}°`}</Text>
    </View>
  );
};

const DetailScreen = ({navigation}) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    setData(navigation.getParam('data', []));
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, justifyContent: 'flex-start', paddingTop: 60}}>
        <Image
          source={require('../assets/images/overView.jpg')}
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            flex: 1,
            resizeMode: 'stretch',
            //  height: '100%',
            //  width: '100%',
          }}
        />
        <View style={{height: 220}}>
          <FlatList
            horizontal={true}
            data={data}
            renderItem={value => <WeatherItem {...value} />}
            keyExtractor={(value, index) => index.toString()}
          />
        </View>
        <View style={{flex: 1}}>
          <Text></Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DetailScreen;
