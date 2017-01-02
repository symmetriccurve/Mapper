
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

const colors = {
  navBar : { mainClr:'#EF5350' },
  area : { mainClr: '#65D5EF', subClr: '#65D5EF' },
  distance : { mainClr:'#F0A24F', subClr: '#F0A24F' },
  marker : { mainClr: '#44D8C6', subClr:  '#44D8C6'}
}

class Navigation extends Component {
   constructor(props){
     super(props)
     this.state = {
       navColor: 'blue'
     }
   }
  _renderScene = ( route, navigator ) => {
    //console.log('route =>',route, ' navigator=>',navigator);

    switch (route.title) {
      case 'Home':
            return  (
                <View style={{flex:1,backgroundColor:'transparent',marginTop:height/12}}>
                    <Home title={route.title} navigator = {navigator} colors = {colors}/>
                </View>
            )
      case 'Area':
            return  (
                <View style={{flex:1,backgroundColor:'transparent',marginTop:height/12}}>
                    <Area title={route.title} navigator = {navigator} colors = {colors}/>
                </View>
            )
      case 'Distance':
            return (
                <View style={{flex:1,backgroundColor:'transparent',marginTop:height/12}}>
                    <Distance title={route.title} navigator = {navigator} colors = {colors}/>
                </View>
            );
        break;
        case 'Markers':
              return (
                <View style={{flex:1,backgroundColor:'green',marginTop:height/12}}>
                      <Markers title={route.title} navigator = {navigator} colors = {colors}/>
                </View>
              );
          break;
      default:
    }
  }

  static NavigationBarRouteMapper = self => ({

     LeftButton(route, navigator, index, navState) {
       if(route.title == 'Home') {
         return <View />
       }else {
         return(
          <TouchableHighlight style={{backgroundColor:'transparent',height:height/25,width:height/30,alignItems:'center',marginLeft:height/50}} underlayColor= 'transparent'  onPress = { ()=> {navigator.pop()} }>
             <Image style={{height:height/30,width:height/30}} source = {require('./Images/backarrow.png')}/>
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
              <View style={{backgroundColor:'transparent',height:height/25,width:width/3,alignItems:'center',justifyContent:'center'}}>
                 <Image source = {require('./Images/mapper_logo.png')} style={{width:width/4,height:height/20,resizeMode: 'contain'}}/>
              </View>
          )
      case 'Area':
          return(
            <View style={{backgroundColor:'transparent',height:height/25,width:width/3,alignItems:'center',justifyContent:'center'}}>
               <Image source = {require('./Images/area.png')} style={{width:width/5,height:height/25,resizeMode: 'contain'}}/>
            </View>
          )
      case 'Distance':
          return(
            <View style={{backgroundColor:'transparent',height:height/25,width:width/3,alignItems:'center',justifyContent:'center'}}>
               <Image source = {require('./Images/distance.png')} style={{width:width/5,height:height/25,resizeMode: 'contain'}}/>
            </View>
          )
      case 'Markers':
          return(
            <View style={{backgroundColor:'transparent',height:height/25,width:width/3,alignItems:'center',justifyContent:'center'}}>
               <Image source = {require('./Images/markers.png')} style={{width:width/5,height:height/25,resizeMode: 'contain'}}/>
            </View>
          )
      default:

    }


  }

  _navigationBar = () => {
    return (
      <Navigator.NavigationBar style={{flex:1,backgroundColor:colors.navBar.mainClr,height:height/12}}
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
