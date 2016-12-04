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

var { height, width } = Dimensions.get('window')
class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      area: new Animated.Value(0),
      distance: new Animated.Value(0),
      marker: new Animated.Value(0),
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

  _moveArea = () => {
    if(this.state.area._value == 0){
        Animated.spring(
          this.state.area,
          {
            toValue:1
          }
        ).start(()=>{
          this.state.area.setValue(1)
        })
    } else {

      Animated.spring(
        this.state.area,
        {
          toValue:0
        }
      ).start(()=>{
        this.state.area.setValue(0)
      })

    }
  }

  _moveDistance = () => {
    if(this.state.distance._value == 0){
        Animated.spring(
          this.state.distance,
          {
            toValue:1
          }
        ).start(()=>{
          this.state.distance.setValue(1)
        })
    } else {

      Animated.spring(
        this.state.distance,
        {
          toValue:0
        }
      ).start(()=>{
        this.state.distance.setValue(0)
      })

    }
  }

  _moveMarker = () => {
    if(this.state.marker._value == 0){
        Animated.spring(
          this.state.marker,
          {
            toValue:1
          }
        ).start(()=>{
          this.state.marker.setValue(1)
        })
    } else {

      Animated.spring(
        this.state.marker,
        {
          toValue:0
        }
      ).start(()=>{
        this.state.marker.setValue(0)
      })

    }
  }

  render() {
    console.log('height =>', height,'width=>',width);
    return (
      <View style={{flex:1}}>
              <Animated.View style={{
              transform:[
                //
                // {
                //   scale:
                //       this.state.val.interpolate({
                //           inputRange: [0, 1],
                //           outputRange: [2, 1]
                //       })
                // }
            ],
            height:this.state.area.interpolate({
                inputRange: [0, 1],
                outputRange: [height/3, height/10]
            }),
            marginTop:this.state.area.interpolate({
                inputRange: [0, 1],
                outputRange: [100, 0]
            }),
            // marginLeft:20,
            // marginRight:20,
            width: width,
            backgroundColor:'green'
            }}>
                    <TouchableHighlight underlayColor= '#eeeeee' style={{alignItems:'center',justifyContent:'center'}} onPress = { ()=>{this._moveArea()}}>
                        <Animated.View style={{
                          transform:[
                            {scale:this.state.area.interpolate({
                              inputRange:[0,1],
                              outputRange:[1.5,1]
                            })}
                          ],
                          alignItems:'center',justifyContent:'center',backgroundColor:'transparent',height:height/3,width:width/2}}>
                          <Text style={{color:'white',fontSize:30,fontFamily:'AvenirNext-Heavy'}}>Area</Text>
                        </Animated.View>
                    </TouchableHighlight>
              </Animated.View>


              <Animated.View style={{
              transform:[
                //
                // {
                //   scale:
                //       this.state.val.interpolate({
                //           inputRange: [0, 1],
                //           outputRange: [2, 1]
                //       })
                // }
            ],
            height:this.state.distance.interpolate({
                inputRange: [0, 1],
                outputRange: [height/3, height/10]
            }),
            marginTop:this.state.distance.interpolate({
                inputRange: [0, 1],
                outputRange: [100, 0]
            }),
            // marginLeft:20,
            // marginRight:20,
            width: width,
            backgroundColor:'green'
            }}>
                    <TouchableHighlight underlayColor= 'lightgrey' style={{alignItems:'center',justifyContent:'center'}} onPress = { ()=>{this._moveDistance()}}>
                        <Animated.View style={{
                          transform:[
                            {scale:this.state.distance.interpolate({
                              inputRange:[0,1],
                              outputRange:[1.5,1]
                            })}
                          ],
                          alignItems:'center',justifyContent:'center',backgroundColor:'transparent',height:height/3,width:width/2}}>
                          <Text style={{color:'white',fontSize:30,fontFamily:'AvenirNext-Heavy'}}>Distance</Text>
                        </Animated.View>
                    </TouchableHighlight>
              </Animated.View>


              <Animated.View style={{
              transform:[
                //
                // {
                //   scale:
                //       this.state.val.interpolate({
                //           inputRange: [0, 1],
                //           outputRange: [2, 1]
                //       })
                // }
            ],
            height:this.state.marker.interpolate({
                inputRange: [0, 1],
                outputRange: [height/3, height/10]
            }),
            marginTop:this.state.marker.interpolate({
                inputRange: [0, 1],
                outputRange: [100, 0]
            }),
            // marginLeft:20,
            // marginRight:20,
            width: width,
            backgroundColor:'green'
            }}>
                    <TouchableHighlight underlayColor= 'transparent' style={{alignItems:'center',justifyContent:'center'}} onPress = { ()=>{this._moveMarker()}}>
                        <Animated.View style={{
                          transform:[
                            {scale:this.state.marker.interpolate({
                              inputRange:[0,1],
                              outputRange:[1.5,1]
                            })}
                          ],
                          alignItems:'center',justifyContent:'center',backgroundColor:'transparent',height:height/3,width:width/2}}>
                          <Text style={{color:'white',fontSize:30,fontFamily:'AvenirNext-Heavy'}}>Markers</Text>
                        </Animated.View>
                    </TouchableHighlight>
              </Animated.View>


      </View>
    );
  }
}

module.exports = Home
