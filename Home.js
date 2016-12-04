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

var rowHeight = height/3.32
var underlayColor = 'lightgreen'
class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      area: new Animated.Value(100),
      distance: new Animated.Value(100),
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
    // if(this.state.area._value == 1){
    //     Animated.spring(
    //       this.state.area,
    //       {
    //         toValue:2
    //       }
    //     ).start(()=>{
    //       this.state.area.setValue(2)
    //     })
    // } else if(this.state.area._value == 2){
    //   Animated.spring(
    //     this.state.area,
    //     {
    //       toValue:1
    //     }
    //   ).start(()=>{
    //     this.state.area.setValue(1)
    //   })
    // }
  }

  _moveDistance = () => {
    Animated.spring(
      this.state.area,
      {
        toValue:0
      }
    ).start(()=>{this.state.area.setValue(0)})

    if(this.state.distance._value == 100){
        Animated.spring(
          this.state.distance,
          {
            toValue:50
          }
        ).start()

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
    return (
      <View style={{flex:1}}>
              <Animated.View style={{
                    height:this.state.area.interpolate({
                        inputRange: [0, 50, 100],
                        outputRange: [0,50, 100]
                    }),
                    // marginTop:this.state.area.interpolate({
                    //     inputRange: [0,50, 100],
                    //     outputRange: [0,1, 2]
                    // }),
                    zIndex:2,
                    width: width,
                    backgroundColor:'green'
                  }}>

                        <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                               <Animated.View style={{

                                 transform:[
                                   {
                                     scale:
                                         this.state.area.interpolate({
                                             inputRange: [0, 50,100],
                                             outputRange: [0, 1,1]
                                         })
                                   }
                               ],

                              height:this.state.area.interpolate({
                                    inputRange: [0, 50, 100],
                                    outputRange: [0,50, 100]
                                }),
                              width:width/2, alignItems:'center',justifyContent:'center',backgroundColor:'blue'}}>
                              <Text style={{flex:1,color:'white',fontSize:40,textAlign: 'center',marginTop:30,fontFamily:'AvenirNext-Heavy'}}>Area</Text>

                          </Animated.View>
                      </View>
              </Animated.View>

            <TouchableHighlight onPress ={ () =>{this._moveDistance()}}>
              <Animated.View style={{
                    height:this.state.distance.interpolate({
                        inputRange: [0, 50, 100],
                        outputRange: [0,50, 100]
                    }),
                    // marginTop:this.state.area.interpolate({
                    //     inputRange: [0,50, 100],
                    //     outputRange: [0,1, 2]
                    // }),
                    zIndex:2,
                    width: width,
                    backgroundColor:'green'
                  }}>

                        <View style={{flex:1,alignItems:'center',justifyContent:'center'}} onPress ={ () =>{this._moveDistance()}}>
                               <Animated.View style={{

                                 transform:[
                                   {
                                     scale:
                                         this.state.distance.interpolate({
                                             inputRange: [0, 50,100],
                                             outputRange: [0, 0.5,1]
                                         })
                                   }
                               ],

                              height:this.state.distance.interpolate({
                                    inputRange: [0, 50, 100],
                                    outputRange: [0,90, 100]
                                }),
                              width:width/2, alignItems:'center',justifyContent:'center',backgroundColor:'blue'}}>
                              <Text style={{flex:1,color:'white',fontSize:40,textAlign: 'center',marginTop:30,fontFamily:'AvenirNext-Heavy'}}>Distance</Text>
                          </Animated.View>
                        </View>
              </Animated.View>
            </TouchableHighlight>

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
                outputRange: [rowHeight, height/10]
            }),
            marginTop:100,
            // marginRight:20,
            zIndex:4,
            width: width,
            backgroundColor:'yellow'
            }}>
                    <TouchableHighlight underlayColor = {underlayColor} style={{alignItems:'center',justifyContent:'center'}} onPress = { ()=>{this._moveMarker()}}>
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
