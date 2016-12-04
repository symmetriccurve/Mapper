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
      <View style={{marginTop:15}}>
          <View style={{height:height/15,width:width,shadowOffset:{width: 0, height:2},shadowColor:'black',shadowRadius:2,shadowOpacity:0.5}}>
              <View style={{height:height/15,width:width,backgroundColor:'#EF5350',flexDirection:'row'}}>
                      <TouchableHighlight onPress ={()=>{this._reset()}} style={{height:height/15,width:width/5,backgroundColor:'#550000'}}>
                        <View>
                          <Animated.View style={{
                            position:'absolute',
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
                            height:height/15,
                            width:width/5,backgroundColor:'transparent',flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                              <Icon name="backward" size={20} color="white"/>
                          </Animated.View>
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
                                    outputRange: [1,0]
                                })
                              }
                            ],
                            height:height/15,
                            width:width/5,backgroundColor:'transparent',flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                              <Icon name="users" size={20} color="white"/>
                          </Animated.View>
                         </View>
                      </TouchableHighlight>

                      {/* Search Bar */}
                      <Animated.View style={{height:height/15,
                        width:this.state.icon.interpolate({
                            inputRange: [0, 100],
                            outputRange: [0,width-width/5]
                        }) ,

                        backgroundColor:'#65D5EF',alignItems:'center',justifyContent:'center'}}>
                          <TextInput
                              placeholder = 'Search'
                              style={{height:height/15,backgroundColor:'white',textAlign:'center',fontFamily:'AvenirNext-Heavy',color:'white'}}/>
                      </Animated.View>
                      <View style={{width:width,height:height/15,justifyContent:'center'}}>
                          <Text style={{color:'white',fontSize:20,marginTop:0,fontFamily:'AvenirNext-Heavy',marginLeft:20}}>Mapper</Text>
                      </View>
              </View>
        </View>


        <View style={{width:width,shadowOffset:{width: 0, height:2},shadowColor:'black',shadowRadius:2,shadowOpacity:0.5,zIndex:5}}>
              <TouchableHighlight onPress ={ () =>{this._moveArea()}}>
                        <Animated.View style={{
                              height:this.state.area.interpolate({
                                  inputRange: [0, 50, 100],
                                  outputRange: [0,50, rowHeight]
                              }),
                             //marginTop:10,
                              width: width,
                              backgroundColor:'#65D5EF',
                              zIndex:5
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
       </View>

       <View style={{width:width,shadowOffset:{width: 0, height:2},shadowColor:'black',shadowRadius:2,shadowOpacity:0.5,zIndex:4}}>
          <TouchableHighlight onPress ={ () =>{this._moveDistance()}}>
                    <Animated.View style={{
                          height:this.state.distance.interpolate({
                              inputRange: [0, 50, 100],
                              outputRange: [0,50, rowHeight]
                          }),
                          width: width,
                          backgroundColor:'#F0A24F'
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
      </View>
      <View style={{width:width,shadowOffset:{width: 0, height:2},shadowColor:'black',shadowRadius:2,shadowOpacity:0.5,zIndex:3}}>
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
                            backgroundColor:'#44D8C6'
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
      </View>
      </View>
    );
  }
}

module.exports = Home
