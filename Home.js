/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Animated,
  Dimensions,
  TouchableHighlight
} from 'react-native';

var {height, width } = Dimensions.get('window')
const cardHeight = height/3.35
const cardWidth = width - 10
const FF = 'AppleSDGothicNeo-Medium'
const FS = height/13
class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    // this.state.bounceValue.setValue(0.5);     // Start large
    // Animated.spring(                          // Base: spring, decay, timing
    //   this.state.bounceValue,                 // Animate `bounceValue`
    //   {
    //     toValue: 100,                         // Animate to smaller size
    //     friction: 1,                          // Bouncier spring
    //   }
    // ).start();                                // Start the animation
  }

  render() {
    return (
      <View style={styles.container}>
                <View style={{height:cardHeight}}>
                    <TouchableHighlight underlayColor= 'transparent'
                      style={[styles.card,{backgroundColor:'#65D5EF'}]}
                      onPress = { ()=>{  this.props.navigator.push({title:'Area'})}}>
                        <Text style={{color:'white',fontSize:FS,fontFamily:FF}}>Area</Text>
                    </TouchableHighlight>
                </View>


                <View style={{height:cardHeight}}>
                    <TouchableHighlight
                      style={[styles.card,{backgroundColor:'#F0A24F'}]}
                      onPress = { ()=>{ this.props.navigator.push({title:'Distance'})  }}>
                          <Text style={{color:'white',fontSize:FS,fontFamily:FF}}>Distance</Text>
                    </TouchableHighlight>
                </View>

                <View style={{height:cardHeight}}>
                    <TouchableHighlight
                      style={[styles.card,{backgroundColor:'#44D8C6'}]}
                      onPress = { ()=>{  this.props.navigator.push({title:'Markers'})  }}>
                          <Text style={{color:'white',fontSize:FS,fontFamily:FF}}>Markers</Text>
                    </TouchableHighlight>
                </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  card:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    width:cardWidth,
    backgroundColor:'#65D5EF',
    shadowOffset:{width: 0, height:1},
    shadowColor:'grey',shadowRadius:1,
    shadowOpacity:0.2,
    zIndex:3,
    borderRadius:5,
    marginTop:5
  },
  container: {
    //position:'absolute',
    // justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor:'yellow'
  }
});

module.exports = Home
