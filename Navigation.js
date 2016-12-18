
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
import Icon from 'react-native-vector-icons/FontAwesome';
var {height, width } = Dimensions.get('window')
var Home = require('./Home')
var Distance = require('./Distance')
var Area = require('./Area')
var Markers = require('./Markers')
class Navigation extends Component {

  _renderScene = ( route, navigator ) => {
    //console.log('route =>',route, ' navigator=>',navigator);
    var scene = <View/>
    switch (route.title) {
      case 'Home':
            return (
              <View>
                    <StatusBar hidden={false} barStyle = 'light-content' />
                    <Home title={route.title} navigator = {navigator} />
              </View>
            );
        break;
      case 'Area':
            return (
              <View>
                    <Area title={route.title} navigator = {navigator} />
              </View>
            );
        break;
      case 'Distance':
            return (
              <View>
                    <Distance title={route.title} navigator = {navigator} />
              </View>
            );
        break;
        case 'Markers':
              return (
                <View>
                      <Markers title={route.title} navigator = {navigator} />
                </View>
              );
          break;
      default:
    }
  }

  static NavigationBarRouteMapper = self => ({

     LeftButton(route, navigator, index, navState) {
       if(route.title == 'Home') {
         return <View style={{height:height/10,width:50}}/>
       }else {
         return(
           <TouchableHighlight style={{height:height/10,width:50,alignItems:'center',justifyContent:'center'}}  onPress = { ()=> {navigator.pop()}}>
             <Icon name="backward" size={30} color="white" />
          </TouchableHighlight>
         );
       }
     },
   RightButton(route, navigator, index, navState) {
     return <View style={{height:height/10,width:50}}/>
     return(
      <TouchableHighlight style={{height:height/10,width:50}}>
         <View/>
      </TouchableHighlight>
     );
   },
   Title(route, navigator, index, navState) {
     if(route.title == 'Home'){
       return(
         <View style={{backgroundColor:'#EF5350',height:height/10,width:width,alignItems:'center',justifyContent:'center'}}>
            <Image source = {require('./Images/mapper_logo.png')} style={{width:width/4,height:height/20,marginTop:10}}/>
         </View>
       )
     } else {

       return(
         <View style={{backgroundColor:'#EF5350',height:height/10,width:width,alignItems:'center',justifyContent:'center'}}>
            <Image source = {require('./Images/mapper_logo.png')} style={{width:width/4,height:height/20,marginTop:10}}/>
         </View>
       )
     }
   }
  });

  _navigationBar = () => {
    return (
      <Navigator.NavigationBar style={{flex:1,backgroundColor:'#F46C6C',height:height/8}}
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
