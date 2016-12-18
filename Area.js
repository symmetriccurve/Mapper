
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Animated,
  TouchableHighlight
} from 'react-native';

var {height, width } = Dimensions.get('window')
const FF = 'AppleSDGothicNeo-Medium'
const FS = height/20
import Map from 'react-native-maps'
var LatLngToTurf = require('./Utilities/LatLngToTurf')

class Area extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Map style={{height:height/1.25,width:width,backgroundColor:'red'}}/>
        <View style={{height:height/13,width:width,backgroundColor:'#00C5F0'}}>
            <TouchableHighlight  style={{height:height/13,width:width,backgroundColor:'#00C5F0',alignItems:'center',justifyContent:'center'}} onPress = {()=>{console.log('onPress')}}>
                <View>
                  <Text style={{color:'white',fontSize:FS,fontFamily:FF}}>Draw</Text>
                </View>
            </TouchableHighlight>
        </View>
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
    marginTop:height/8
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

module.exports = Area
