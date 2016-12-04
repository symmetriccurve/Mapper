import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Animated,
  Dimensions,
  TouchableHighlight,
  TextInput
} from 'react-native';

var { height, width } = Dimensions.get('window')

var rowHeight = height/3.32
var underlayColor = 'lightgreen'
var Distance =require('./Distance')

import Icon from 'react-native-vector-icons/FontAwesome';

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      area: new Animated.Value(100),
      distance: new Animated.Value(100),
      marker: new Animated.Value(100),
      icon: new Animated.Value(0),
    };
  }


  _moveArea = () => {

    Animated.spring(
      this.state.distance,
      {
        toValue:0
      }
    ).start()

    if(this.state.area._value == 100){
        Animated.spring(
          this.state.area,
          {
            toValue:50
          }
        ).start()
    }
  }

  _moveArea = () => {
    this._rotateIcon()
    Animated.spring(
      this.state.distance,
      {
        toValue:0
      }
    ).start()

    Animated.spring(
      this.state.marker,
      {
        toValue:0
      }
    ).start()

      Animated.spring(
        this.state.area,
        {
          toValue:50
        }
      ).start()
  }

  _moveDistance = () => {
    this._rotateIcon()
    Animated.spring(
      this.state.area,
      {
        toValue:0
      }
    ).start()

    Animated.spring(
      this.state.marker,
      {
        toValue:0
      }
    ).start()


      Animated.spring(
          this.state.distance,
          {
            toValue:50
          }
        ).start()
  }

  _moveMarker = () => {
    this._rotateIcon()
    Animated.spring(
      this.state.area,
      {
        toValue:0
      }
    ).start()

    Animated.spring(
      this.state.distance,
      {
        toValue:0
      }
    ).start()

    Animated.spring(
      this.state.marker,
      {
        toValue:50
      }
    ).start()
  }

  _rotateIcon = () => {

    Animated.spring(
      this.state.icon,
      {
        toValue:100
      }
    ).start()

  }

  _reset = () => {
        Animated.spring(
          this.state.icon,{
            toValue:0
          }
        ).start()
        Animated.spring(
          this.state.area,
          {
            toValue:100
          }
        ).start()

        Animated.spring(
          this.state.distance,
          {
            toValue:100
          }
        ).start()

        Animated.spring(
          this.state.marker,
          {
            toValue:100
          }
        ).start()

  }


  render() {
    return (
      <View style={{flex:1,marginTop:15}}>
              <View style={{height:70,width:width,backgroundColor:'yellow',flexDirection:'row'}}>
                      <TouchableHighlight onPress ={()=>{this._reset()}} style={{height:70,width:width/5,backgroundColor:'coral'}}>
                          <Animated.View style={{
                            transform:[
                              {
                                rotate:this.state.icon.interpolate({
                                    inputRange: [0, 100],
                                    outputRange: ['180deg','0deg']
                                })
                              },
                              {
                                scale:this.state.icon.interpolate({
                                    inputRange: [0, 100],
                                    outputRange: [0,1]
                                })
                              }
                            ],


                            height:70,width:width/5,backgroundColor:'transparent',flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                              <Icon name="backward" size={30} color="#900"/>
                          </Animated.View>
                      </TouchableHighlight>
                      <Animated.View style={{height:70,

                        width:this.state.icon.interpolate({
                            inputRange: [0, 100],
                            outputRange: [0,width-width/5]
                        }) ,

                        backgroundColor:'lightyellow',alignItems:'center',justifyContent:'center'}}>
                          <TextInput
                              placeholder = 'Serach'
                              style={{height:50,backgroundColor:'violet',borderRadius:25,textAlign:'center',fontFamily:'AvenirNext-Heavy',color:'white'}}/>
                      </Animated.View>
              </View>
              <TouchableHighlight onPress ={ () =>{this._moveArea()}}>
                        <Animated.View style={{
                              height:this.state.area.interpolate({
                                  inputRange: [0, 50, 100],
                                  outputRange: [0,50, rowHeight]
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
                                                       outputRange: [0, 0.5,1]
                                                   })
                                             }
                                         ],

                                        height:this.state.area.interpolate({
                                              inputRange: [0, 50, 100],
                                              outputRange: [0,90, rowHeight]
                                          }),
                                        width:width/2, alignItems:'center',justifyContent:'center'}}>
                                        <Text style={{flex:1,color:'white',fontSize:40,textAlign: 'center',marginTop:50,fontFamily:'AvenirNext-Heavy'}}>Area</Text>
                                    </Animated.View>
                                  </View>
                        </Animated.View>
            </TouchableHighlight>

            <TouchableHighlight onPress ={ () =>{this._moveDistance()}}>
                    <Animated.View style={{
                          height:this.state.distance.interpolate({
                              inputRange: [0, 50, 100],
                              outputRange: [0,50, rowHeight]
                          }),
                          zIndex:2,
                          width: width,
                          backgroundColor:'blue'
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
                                          outputRange: [0,90, rowHeight]
                                      }),
                                    width:width/2, alignItems:'center',justifyContent:'center'}}>
                                    <Text style={{flex:1,color:'white',fontSize:40,textAlign: 'center',fontFamily:'AvenirNext-Heavy'}}>Distance</Text>
                                </Animated.View>
                              </View>
                    </Animated.View>
            </TouchableHighlight>

            <TouchableHighlight onPress ={ () =>{this._moveMarker()}}>
                      <Animated.View style={{
                            height:this.state.marker.interpolate({
                                inputRange: [0, 50, 100],
                                outputRange: [0,50, rowHeight]
                            }),
                            // marginTop:this.state.area.interpolate({
                            //     inputRange: [0,50, 100],
                            //     outputRange: [0,1, 2]
                            // }),
                            zIndex:2,
                            width: width,
                            backgroundColor:'coral'
                          }}>

                            <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                                <Animated.View style={{

                                     transform:[
                                       {
                                         scale:
                                             this.state.marker.interpolate({
                                                 inputRange: [0, 50,100],
                                                 outputRange: [0, 0.5,1]
                                             })
                                       }
                                   ],

                                  height:this.state.marker.interpolate({
                                        inputRange: [0, 50, 100],
                                        outputRange: [0,90, rowHeight]
                                    }),
                                  width:width/2, alignItems:'center',justifyContent:'center'}}>
                                  <Text style={{flex:1,color:'white',fontSize:40,textAlign: 'center',marginTop:50,fontFamily:'AvenirNext-Heavy'}}>marker</Text>
                              </Animated.View>
                            </View>
                      </Animated.View>
          </TouchableHighlight>

          <TouchableHighlight style={{height:50,width:width,backgroundColor:'tan'}} onPress = { ()=> {this._reset()}}>
            <View>
              <Distance/>
            </View>
          </TouchableHighlight>
      </View>
    );
  }
}

module.exports = Home
