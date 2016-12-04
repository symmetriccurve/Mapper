
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  MapView,
  Navigator,
  Dimensions,
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
            scene = <Home title={route.title} navigator = {navigator} />
        break;
      case 'Area':
              scene = <Area title={route.title} navigator = {navigator} />
        break;
      case 'Distance':
              scene =  <Distance title={route.title} navigator = {navigator} />
        break;
      default:
    }
    //
    return (
      <View style={{flex:1,marginTop:65}}>
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
      <TouchableHighlight style={{height:50,width:50,backgroundColor:'yellow'}}>
         <View/>
      </TouchableHighlight>
     );
   },
   Title(route, navigator, index, navState) {
     if(route.title == 'Home'){
       return <View style={{backgroundColor:'#EF5350',height:70,width:width,alignItems:'center',justifyContent:'center',marginTop:-20}}><Text style={{color:'white',fontSize:40,fontFamily:'Snell Roundhand',fontWeight:'bold'}}>Mapper</Text></View>
     } else {
       return <View style={{backgroundColor:'#EF5350',height:70,width:width,alignItems:'center',justifyContent:'center',marginTop:-20}}><Text style={{color:'white',fontSize:40,fontFamily:'Snell Roundhand',fontWeight:'bold'}}>Area</Text></View>
     }
   }
  });

  _navigationBar = () => {
    return (
      <Navigator.NavigationBar style={{}}
       routeMapper={Navigation.NavigationBarRouteMapper(this)}/>
    );

         return null;
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
