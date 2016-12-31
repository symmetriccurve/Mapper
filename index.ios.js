import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

var Home = require('./Home')
var Navigation = require('./Navigation')
export default class Mapper extends Component {
  render() {
    //return <View style={{flex:1,backgroundColor:'yellow'}}/>
    return (
      <View style={{flex:1}}>
        <Navigation style={{marginTop:-150}}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    //position:'absolute',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: '#F5FCFF',
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

AppRegistry.registerComponent('Mapper', () => Mapper);
