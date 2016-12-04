
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
                    <Distance title={route.title} navigator = {navigator} />
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
      default:
    }
    //
    return (
      <View style={{flex:1}}>
        {scene}
      </View>
    )
  }

  static NavigationBarRouteMapper = self => ({

     LeftButton(route, navigator, index, navState) {
       if(route.title == 'Home') {
         return <View/>
       }else {
         return(
           <TouchableHighlight style={{height:50,width:50,alignItems:'center',justifyContent:'center'}}  onPress = { ()=> {navigator.pop()}}>
             <Icon name="backward" size={30} color="white" />
          </TouchableHighlight>
         );
       }
     },
   RightButton(route, navigator, index, navState) {
     return <View/>
     return(
      <TouchableHighlight style={{height:50,width:50}}>
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
       return <View style={{backgroundColor:'#EF5350',height:height/10,width:width,alignItems:'center',justifyContent:'center',marginTop:10}}><Text style={{color:'white',fontSize:40,fontFamily:'Snell Roundhand',fontWeight:'bold'}}>Area</Text></View>
     }
   }
  });

  _navigationBar = () => {
    return (
      <Navigator.NavigationBar style={{flex:1,backgroundColor:'#F46C6C'}}
       routeMapper={Navigation.NavigationBarRouteMapper(this)}/>
    );

         return null;
  }

  render() {
    return (
    <View style={{flex:1}}>
      <Navigator
        initialRoute = {{ title: 'Home', index: 0 }}
        navigationBar={this._navigationBar()}
        renderScene = {(route, navigator ) => this._renderScene(route, navigator)}
        />
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
