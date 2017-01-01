
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  MapView,
  Navigator,
  Dimensions,
  StatusBar,
  TouchableHighlight
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
var {height, width } = Dimensions.get('window')
var Home = require('./Home')
var Distance = require('./Distance')
var Area = require('./Area')
var Markers = require('./Markers')
class Navigation extends Component {

  _renderScene = ( route, navigator ) => {
    //console.log('route =>',route, ' navigator=>',navigator);

    switch (route.title) {
      case 'Home':
            return  (
                <View style={{flex:1,backgroundColor:'transparent',marginTop:height/13}}>
                    <Home title={route.title} navigator = {navigator}/>
                </View>
            )
      case 'Area':
            return  (
                <View style={{flex:1,backgroundColor:'transparent',marginTop:height/13}}>
                    <Area title={route.title} navigator = {navigator}/>
                </View>
            )
      case 'Distance':
            return (
                <View style={{flex:1,backgroundColor:'transparent',marginTop:height/13}}>
                    <Distance title={route.title} navigator = {navigator}/>
                </View>
            );
        break;
        case 'Markers':
              return (
                <View style={{flex:1,backgroundColor:'green',marginTop:height/12}}>
                      <Markers title={route.title} navigator = {navigator} />
                </View>
              );
          break;
      default:
    }
  }

  static NavigationBarRouteMapper = self => ({

     LeftButton(route, navigator, index, navState) {
       return <View/>
       if(route.title == 'Home') {
         return <View style={{height:height/10,width:50}}/>
       }else {
         return(
           <TouchableHighlight style={{backgroundColor:'blue',height:width/6,width:width/10,alignItems:'center',justifyContent:'center',marginTop:-height/37}} underlayColor= 'transparent'  onPress = { ()=> {navigator.pop()}}>
             <Icon name="backward" size={40} color="white" />
          </TouchableHighlight>
         );
       }
     },

     RightButton(route, navigator, index, navState) {
       return <View/>
       return(
        <TouchableHighlight style={{height:height/10,width:50}}>
           <View/>
        </TouchableHighlight>
       );
     },

     Title(route, navigator, index, navState) {
        return self._getTitle(navigator,route)
     }

  });

  _getTitle(navigator,route){
    switch (route.title) {
      case 'Home':
          return(
            <View style={{backgroundColor:'green',height:height/13,width:width,alignItems:'center',justifyContent:'center',marginTop:-height/37}}>
               <Image source = {require('./Images/mapper_logo.png')} style={{width:width/4,height:height/20}}/>
            </View>
          )
      case 'Area':
          return(
            <View style={{backgroundColor:'#00C5F0',height:height/13,width:width,alignItems:'center',justifyContent:'center',marginTop:-height/37,flexDirection:'row'}}>

               <TouchableHighlight style={{flex:1,height:height/15,backgroundColor:'transparent',alignItems:'center',justifyContent:'center'}} onPress = { ()=> {navigator.pop()}} >
                    <Icon name="keyboard-arrow-left" size={40} color="white" />
                </TouchableHighlight>

                <View style={{flex:5,height:height/15,backgroundColor:'transparent',alignItems:'center',justifyContent:'center'}}>
                    <Image source = {require('./Images/mapper_logo.png')} style={{width:width/4,height:height/20}}/>
                </View>

                <View style={{flex:1,height:height/15,backgroundColor:'transparent'}}>
                </View>

              {/* <Image source = {require('./Images/mapper_logo.png')} style={{width:width/4,height:height/20}}/>
               <Icon name="backward" size={40} color="white" />
               <Icon name="backward" size={40} color="white" /> */}
            </View>
          )
      case 'Distance':
          return(
            <View style={{backgroundColor:'#FF5900',height:height/13,width:width,alignItems:'center',justifyContent:'center',marginTop:-height/37,flexDirection:'row'}}>

               <TouchableHighlight style={{flex:1,height:height/15,backgroundColor:'transparent',alignItems:'center',justifyContent:'center'}} onPress = { ()=> {navigator.pop()}} >
                    <Icon name="keyboard-arrow-left" size={40} color="white" />
                </TouchableHighlight>

                <View style={{flex:5,height:height/15,backgroundColor:'transparent',alignItems:'center',justifyContent:'center'}}>
                    <Image source = {require('./Images/mapper_logo.png')} style={{width:width/4,height:height/20}}/>
                </View>

                <View style={{flex:1,height:height/15,backgroundColor:'transparent'}}>
                </View>

              {/* <Image source = {require('./Images/mapper_logo.png')} style={{width:width/4,height:height/20}}/>
               <Icon name="backward" size={40} color="white" />
               <Icon name="backward" size={40} color="white" /> */}
            </View>
          )
      case 'Markers':
          return(
            <View style={{backgroundColor:'#00C5F0',height:height/8.5,width:width,alignItems:'center',justifyContent:'center'}}>
               <Image source = {require('./Images/mapper_logo.png')} style={{width:width/4,height:height/18,marginTop:10}}/>
            </View>
          )
      default:

    }


  }

  _navigationBar = () => {
    return (
      <Navigator.NavigationBar style={{flex:1,backgroundColor:'#F46C6C',height:height/15}}
       routeMapper={Navigation.NavigationBarRouteMapper(this)}/>
    );
  }

  render() {
    return (
      <Navigator
        initialRoute = {{ title: 'Home', index: 0 }}
        navigationBar={this._navigationBar()}
        renderScene = {(route, navigator ) => this._renderScene(route, navigator)}
        />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    //position:'absolute',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'coral',
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

module.exports = Navigation
