import React, {useState, useEffect, Fragment} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
  StyleSheet,
  SafeAreaView,
  Alert,
  ScrollView,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import {callAPIbyCity, callAPIbyLocation} from '../services/apiServices';
import Fonts from '../utils/fonts.js';
import {convertInttoTime, randomBackground} from '../utils/base';

const {height: heightSreen, width: widthSreen} = Dimensions.get('window');

const convertTimetoHTML = obj => {
  return (
    obj && (
      <View style={{flexDirection: 'row'}}>
        <Text style={[styless.colorPri, {fontSize: 25}]}>{`${
          obj.hours
        }:${obj.minutes.substr(-2)}`}</Text>
        <Text style={[styless.colorPri, {marginLeft: 5}]}>{obj.ampm}</Text>
      </View>
    )
  );
};

const ViewTemperature = props => {
  if (!props) return;
  const {temp, temp_max, temp_min} = props;
  let Result;
  if (temp_min && temp_max && temp_min !== temp_max) {
    Result = (
      <Fragment>
        <Text
          style={[
            styless.colorPri,
            {fontSize: 35, marginTop: 7},
          ]}>{`${temp_min}°-`}</Text>
        <Text style={[styless.colorPri, {fontSize: 45}]}>{`${temp_max}°`}</Text>
      </Fragment>
    );
  } else if (temp) {
    Result = (
      <Text style={[styless.colorPri, {fontSize: 35}]}>{`${temp_max}°`}</Text>
    );
  } else {
    Result = (
      <Text style={[styless.colorPri, {fontSize: 30}]}>temperature</Text>
    );
  }
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      {Result}
    </View>
  );
};

const HomeScreen = ({navigation}) => {
  const [cityName, setCityName] = useState('');
  const [viewCityName, setViewCityName] = useState('-----');
  const [data, setData] = useState('');
  const [sunrise, setSunrise] = useState();
  const [sunset, setSunset] = useState();
  const [humidity, setHumidity] = useState('humidity');
  const [cloud, setCloud] = useState('cloud');
  const [wind, setWind] = useState('wind');
  const [temperatureMin, setTemperatureMin] = useState(null);
  const [temperatureMax, setTemperatureMax] = useState(null);
  const [weatherIcon, setWeatherIcon] = useState('01d');
  const [dateTime, setDateTime] = useState('');
  const [bacground, setBackground] = useState();

  useEffect(() => {
    Geolocation.getCurrentPosition(
      async info => {
        const result = await callAPIbyLocation(info.coords);
        setData(result);
        setValueToState(result);
      },
      error => {
        Alert.alert('ERROR', 'Can not find location device');
      },
      // {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );

    setBackground(randomBackground(new Date()));
  }, []);

  const setValueToState = result => {
    setViewCityName(`${result.city.name}, ${result.city.country}`);

    setSunrise(convertInttoTime(1000 * result.city.sunrise));
    setSunset(convertInttoTime(1000 * result.city.sunset));
    setDateTime(1000 * result.list[0].dt);
    setTemperatureMin(Math.floor(result.list[0].main.temp_min, 2));
    setTemperatureMax(Math.floor(result.list[0].main.temp_max, 2));
    setHumidity(result.list[0].main.humidity + ' %');
    setWeatherIcon(result.list[0].weather[0].icon);
    setCloud(result.list[0].clouds.all + ' %');
    setWind(result.list[0].wind.speed + ' m/s');
  };

  const goWeather = async () => {
    try {
      if (cityName === '') {
        Alert.alert('ERROR', 'Location name is wrong');
        return;
      }
      const result = await callAPIbyCity(cityName);
      setData(result);
      setValueToState(result);
    } catch (error) {
      Alert.alert('ERROR', 'The location is not valid');
    }
  };

  onTargetLocation = async () => {
    Geolocation.getCurrentPosition(
      async info => {
        const result = await callAPIbyLocation(info.coords);
        setData(result);
        setValueToState(result);
        setCityName('');
      },
      error => {
        Alert.alert('ERROR', 'Can not find location device');
      },
      // {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  };

  const goOverview = () => {
    navigation.navigate('Detail', {
      name: viewCityName,
      data: data.list,
    });
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, position: 'relative'}}>
        <Image
          source={bacground}
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            flex: 1,
            resizeMode: 'stretch',
            height: '100%',
            width: '100%',
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingLeft: 20,
            marginTop: 20,
          }}>
          <View style={{position: 'relative', width: '80%'}}>
            <TextInput
              value={cityName}
              onChangeText={text => setCityName(text)}
              style={{
                paddingLeft: 10,
                paddingRight: 40,
                paddingTop: 3,
                paddingBottom: 3,
                borderRadius: 3,
                borderColor: '#03A9F4',
                borderWidth: 1,

                color: '#fff',
              }}
              placeholder="City or Region...."
              placeholderTextColor="#f2fbff"
              selectionColor="#fff"
            />
            <TouchableOpacity
              style={{position: 'absolute', top: 8, right: 15}}
              onPress={onTargetLocation}>
              <Image
                style={{height: 20, width: 20, tintColor: '#F44336'}}
                source={require('../assets/images/target.png')}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={{marginLeft: 20}} onPress={goWeather}>
            <Image
              style={{height: 20, width: 20, tintColor: '#fff'}}
              source={require('../assets/images/send.png')}
            />
          </TouchableOpacity>
        </View>
        <View style={{marginTop: 10}}>
          <View
            style={{
              marginTop: 10,
              flexDirection: 'row',
              marginLeft: 8,
              alignItems: 'center',
            }}>
            <Image
              style={{height: 20, width: 20, tintColor: '#fff'}}
              source={require('../assets/images/location.png')}
            />
            <Text style={styless.colorPri}>{viewCityName}</Text>
          </View>
          <View style={{marginTop: 10, flexDirection: 'row'}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: (widthSreen * 50) / 100,
              }}>
              <Image
                style={{height: 50, width: 50, tintColor: '#fff'}}
                source={require('../assets/images/sunrise.png')}
              />
              {convertTimetoHTML(sunrise)}
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: (widthSreen * 50) / 100,
              }}>
              <Image
                style={{height: 50, width: 50, tintColor: '#fff'}}
                source={require('../assets/images/sunset.png')}
              />
              {convertTimetoHTML(sunset)}
            </View>
          </View>
        </View>
        <View style={{flex: 1}}>
          <ScrollView contentContainerStyle={{flexGrow: 1}}>
            <View
              style={{
                // flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                //  marginBottom: 40,
              }}>
              <Image
                style={{height: 150, width: 150}}
                source={{
                  uri: `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`,
                }}
              />
              <ViewTemperature
                temp_max={temperatureMax}
                temp_min={temperatureMin}
              />
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <View style={{alignItems: 'center'}}>
                  <Image
                    style={{height: 50, width: 50}}
                    source={require('../assets/images/drop.png')}
                  />
                  <Text style={styless.colorPri}>{humidity}</Text>
                </View>
                <View style={{marginLeft: 50, alignItems: 'center'}}>
                  <Image
                    style={{height: 50, width: 50}}
                    source={require('../assets/images/cloud.png')}
                  />
                  <Text style={styless.colorPri}>{cloud}</Text>
                </View>
                <View style={{marginLeft: 50, alignItems: 'center'}}>
                  <Image
                    style={{height: 50, width: 50}}
                    source={require('../assets/images/wind.png')}
                  />
                  <Text style={styless.colorPri}>{wind}</Text>
                </View>
              </View>
              <Text style={[{marginTop: 20}, styless.colorPri]}>
                {new Date(dateTime).toDateString()}
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: 'flex-end',
                alignItems: 'center',
                paddingBottom: 25,
              }}>
              <TouchableOpacity
                style={{
                  marginTop: 30,
                  borderBottomWidth: 1,
                  borderBottomColor: '#fff',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={goOverview}>
                <Text style={[styless.colorPri, {fontSize: 20}]}>Overview</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styless = StyleSheet.create({
  colorPri: {
    color: '#fff',
    fontFamily: Fonts.LoraBold,
    fontSize: 20,
  },
  colorSec: {
    color: '#fff',
  },
});

export default HomeScreen;
