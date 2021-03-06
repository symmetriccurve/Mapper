
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Animated
} from 'react-native';

var {height, width } = Dimensions.get('window')

import Map from 'react-native-maps'
class Distance extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Map style={{height:height,width:width,backgroundColor:'yellow'}}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position:'absolute',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

module.exports = Distance
