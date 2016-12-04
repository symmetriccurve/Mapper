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
      val: new Animated.Value(0),
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

  _move = () => {
    Animated.spring(
      this.state.val,
      {
        toValue:1
      }
    ).start(()=>{
      Animated.spring(
        this.state.val,
        {
          toValue:0
        }
      ).start()
    })


  }

  render() {
    console.log('height =>', height,'width=>',width);
    return (
      <View style={{flex:1}}>
              <Animated.View style={{
              transform:[

                {
                  scale:
                      this.state.val.interpolate({
                          inputRange: [0, 1],
                          outputRange: [3, 1]
                      })
                }
            ],
            // height:this.state.val.interpolate({
            //     inputRange: [0, 1],
            //     outputRange: [height/3, height/10]
            // }),
            marginTop:this.state.val.interpolate({
                inputRange: [0, 1],
                outputRange: [100, 0]
            }),
            // marginLeft:20,
            // marginRight:20,
            width: this.state.val.interpolate({
                inputRange: [0, 1],
                outputRange: [width, width]
            }),
            backgroundColor:'green'
            }}>
                    <TouchableHighlight underlayColor= 'transparent' style={{alignItems:'center',justifyContent:'center'}} onPress = { ()=>{this._move()}}>
                      <Text style={{color:'white',fontSize:30,fontFamily:'AvenirNext-Heavy'}}>Area</Text>
                    </TouchableHighlight>
              </Animated.View>
              {/*<Animated.View  style={{width:2000,flexDirection:'row',transform:[{scale:this.state.distanceScale}],marginLeft:this.state.distanceLeft,marginRight:this.state.distanceRight,backgroundColor:'#F0A24F',height:100,alignItems:'center',justifyContent:'center',shadowOffset:{width: 0, height:1},shadowColor:'black',shadowRadius:2,shadowOpacity:0.5,borderRadius: 5,zIndex:-1}}>
                  <View style={{flex:1,backgroundColor:'purple'}}>
                    <TouchableHighlight style={{flex:1,alignItems:'center',justifyContent:'center',height:100,width:width}} onPress = { ()=>{this._move('distance')}}>
                      <Text style={{color:'white',fontSize:40,fontFamily:'AvenirNext-Heavy'}}>Distance</Text>
                    </TouchableHighlight>
                  </View>
                  <View style= {{height:height,width:width,backgroundColor:'yellow'}}/>
              </Animated.View>
            <Animated.View  style={{transform:[{scale:this.state.markerScale}],marginLeft:this.state.markersLeft,marginRight:this.state.markersRight,flex:1,backgroundColor:'#44D8C6',height:100,width:width,alignItems:'center',justifyContent:'center',shadowOffset:{width: 0, height:1},shadowColor:'black',shadowRadius:2,shadowOpacity:0.5,borderRadius: 5,zIndex:-1}}>
                  <TouchableHighlight style={{flex:1,alignItems:'center',justifyContent:'center',height:100,width:width}} onPress = { ()=>{this._move('markers')}}>
                    <Text style={{color:'white',fontSize:40,fontFamily:'AvenirNext-Heavy'}}>Markers</Text>
                  </TouchableHighlight>
            </Animated.View> */}
      </View>
    );
  }
}

module.exports = Home
