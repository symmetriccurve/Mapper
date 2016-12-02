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
class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      areaLeft: new Animated.Value(0),
      areaRight: new Animated.Value(0),
      distanceLeft: new Animated.Value(0),
      distanceRight: new Animated.Value(0),
      markersLeft: new Animated.Value(0),
      markersRight: new Animated.Value(0),
      scale : new Animated.Value(0.3)
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

  _move = (type) => {
    //console.log('Type', type);
    if( type == 'area'){
      // Animated.parallel([
          Animated.spring(
            this.state.scale,
            {
              toValue: 1,
            }
          ).start(),


          // Animated.spring(
          //   this.state.areaLeft,
          //   {
          //     toValue: 50,
          //   }
          // ).start(()=>{})

          Animated.spring(
            this.state.distanceRight,
            {
              toValue: width*2,
            }
          ).start(),

          Animated.spring(
            this.state.markersRight,
            {
              toValue: width*2,
              delay:0
            }
          ).start(()=>{
            this.props.navigator.push({title:'Distance'}),
            Animated.spring(
              this.state.areaRight,
              {
                toValue: width,
              }
            ).start(()=>{
                this.state.areaRight.setValue(0)
                this.state.areaLeft.setValue(0)
                this.state.distanceLeft.setValue(0)
                this.state.distanceRight.setValue(0)
                this.state.markersLeft.setValue(0)
                this.state.markersRight.setValue(0)
             })
          });

    } else if(type == 'area') {

          Animated.spring(
            this.state.areaLeft,
            {
              toValue: 100,
            }
          ).start(()=>{})

          Animated.timing(
            this.state.distanceRight,
            {
              toValue: width*2,
              delay:1000000
            }
          ).start(),

          Animated.spring(
            this.state.markersRight,
            {
              toValue: width*2,
            }
          ).start(()=>{
            this.props.navigator.push({title:'Distance'}),
            Animated.spring(
              this.state.areaRight,
              {
                toValue: width,
              }
            ).start(()=>{
                this.state.areaRight.setValue(0)
                this.state.areaLeft.setValue(0)
                this.state.distanceLeft.setValue(0)
                this.state.distanceRight.setValue(0)
                this.state.markersLeft.setValue(0)
                this.state.markersRight.setValue(0)
             })
          });


    }




  }

  render() {
    return (
      <View style={styles.container}>
            <Animated.View style={{transform:[{scale:this.state.scale}],marginLeft:this.state.areaLeft,marginRight:this.state.areaRight,margin:3,flex:1,backgroundColor:'#65D5EF',height:100,width:width,alignItems:'center',justifyContent:'center',shadowOffset:{width: 0, height:0},shadowColor:'black',shadowRadius:1,shadowOpacity:0.5,zIndex:-1}}>
                  <TouchableHighlight underlayColor= 'transparent' style={{flex:1,alignItems:'center',justifyContent:'center',height:100,width:width}} onPress = { ()=>{this._move('area')}}>
                    <Text style={{color:'white',fontSize:40,fontFamily:'AvenirNext-Heavy'}}>Area</Text>
                  </TouchableHighlight>
            </Animated.View>
            <Animated.View  style={{marginLeft:this.state.distanceLeft,marginRight:this.state.distanceRight,flex:1,backgroundColor:'#F0A24F',height:100,width:width,alignItems:'center',justifyContent:'center',shadowOffset:{width: 0, height:1},shadowColor:'black',shadowRadius:2,shadowOpacity:0.5,borderRadius: 5,zIndex:-1}}>
                  <TouchableHighlight style={{flex:1,alignItems:'center',justifyContent:'center',height:100,width:width}} onPress = { ()=>{this._move('distance')}}>
                    <Text style={{color:'white',fontSize:40,fontFamily:'AvenirNext-Heavy'}}>Distance</Text>
                  </TouchableHighlight>
            </Animated.View>
            <Animated.View  style={{marginLeft:this.state.markersLeft,marginRight:this.state.markersRight,flex:1,backgroundColor:'#44D8C6',height:100,width:width,alignItems:'center',justifyContent:'center',shadowOffset:{width: 0, height:1},shadowColor:'black',shadowRadius:2,shadowOpacity:0.5,borderRadius: 5,zIndex:-1}}>
                  <TouchableHighlight style={{flex:1,alignItems:'center',justifyContent:'center',height:100,width:width}} onPress = { ()=>{this._move('markers')}}>
                    <Text style={{color:'white',fontSize:40,fontFamily:'AvenirNext-Heavy'}}>Markers</Text>
                  </TouchableHighlight>
            </Animated.View>
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
    backgroundColor:'lightblue'
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

module.exports = Home
