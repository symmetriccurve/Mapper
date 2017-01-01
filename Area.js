
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Animated,
  TouchableHighlight,
  TextInput,
  Alert
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
//https://maps.googleapis.com/maps/api/place/textsearch/json?query=123+main+street&key=AIzaSyAdvT_G38grWe6w2oC3KAjxNVVlozbjlYo

var {height, width } = Dimensions.get('window')
const FF = 'AppleSDGothicNeo-Medium'
const FS = height/20
import Map from 'react-native-maps'
var LatLngToTurf = require('./Utilities/LatLngToTurf')

class Area extends Component {
  constructor(props){
    super(props)
    this.state = {
      points:[],
      userDrawing: false,
      area: 0,
      locationString:''
    }
  }

  componentWillMount() {
  }

  _handleDrag = (cord) => {
    if(this.state.userDrawing){
      this.setState({
        points:[...this.state.points,cord],
        area:this.state.points.length
      })
      if(this.state.points.length > 200 ){
        this.setState({
          points:[...this.state.points,this.state.points[0]]
        })
      }
    }
  }

  _handleDraw = () => {
      this.setState({
        userDrawing:!this.state.userDrawing
      })
  }

  _clear = () => {
    this.setState({
      points:[],
      area:0,
      userDrawing:false
    })
  }

  _mapPantoThisLocation = (location) => {
      // switch (expression) {
      //   case expression:
      //
      //     break;
      //   default:
      //
      // }
      this.refs.Map.animateToRegion({
          latitude:location.geometry.location.lat,
          longitude:location.geometry.location.lng,
          longitudeDelta:this._getZoomLevel(),
          latitudeDelta:this._getZoomLevel()
      },10000)
  }

  _fetchLocationDetails = () => {
    if(this.state.locationString != ''){
      var toSerachLocationURL = 'https://maps.googleapis.com/maps/api/place/textsearch/json?query='+ this.state.locationString + '&key=AIzaSyAdvT_G38grWe6w2oC3KAjxNVVlozbjlYo'
        fetch(toSerachLocationURL)
        .then((data) =>{
            return data.json()
        })
        .then((values) =>{
          console.log('values',values.results);
          values.results.length ? this._mapPantoThisLocation(values.results[0]) : Alert.alert('InCorrect Location')
        })
        .catch((error)=>{
          console.log('error====>',error);
        })
    }else {
      Alert.alert('Please Enter Location')
    }
  }

  _getControls = () => {
    if(!this.state.userDrawing){
      return (
        <View style={{flex:1,height:height/13,width:width,backgroundColor:'#00C5F0',flexDirection:'row'}}>
          <TouchableHighlight  style={{flex:6,height:height/13,width:width,backgroundColor:this.state.userDrawing?'#0aabcf':'#00C5F0',alignItems:'center',justifyContent:'center'}} onPress = {()=>{this._handleDraw()}}>
              <View>
                <Text style={{color:'white',fontSize:FS,fontFamily:FF}}>{this.state.userDrawing ? this.state.area : 'Draw'}</Text>
              </View>
          </TouchableHighlight>
        </View>
      )
    }else {
      return(
        <View style={{flex:1,height:height/13,width:width,backgroundColor:'#00C5F0',flexDirection:'row'}}>
            <View style={{flex:5,height:height/13,width:width,backgroundColor:this.state.userDrawing?'#0aabcf':'#00C5F0',alignItems:'center',justifyContent:'center'}} onPress = {()=>{this._handleDraw()}}>
                <Text style={{color:'white',fontSize:FS,fontFamily:FF}}>{this.state.userDrawing ? this.state.area : 'Draw'}</Text>
            </View>
            <TouchableHighlight  style={{flex:1,height:height/13,width:width,backgroundColor:this.state.userDrawing?'#0aabcf':'#00C5F0',alignItems:'center',justifyContent:'center'}} onPress = {()=>{this._clear()}}>
                <View>
                  <Text style={{color:'white',fontSize:FS,fontFamily:FF}}>{'Clear'}</Text>
                </View>
            </TouchableHighlight>
        </View>
      )
    }
  }
  render() {
    return (
    <View style={styles.container}>
      <View style={{height:height/10,width:width,backgroundColor:'#00C5F0',alignItems:'center',justifyContent:'center'}}>
          <View style={{height:height/15,width:width -width/15,backgroundColor:'white',alignItems:'center',justifyContent:'center',borderRadius:height/20,flexDirection:'row'}}>
              <View>
                <TextInput
                    style={{alignItems:'center',justifyContent:'center',height:height/20,width:width/1.3,backgroundColor:'white',fontFamily:'AvenirNext-bold'}}
                    value = {this.state.locationString}
                    onChangeText = {(locationString) => {this.setState({locationString})}}
                    placeholder = 'Search'
                    keyboardType = 'web-search'
                    onSubmitEditing = {()=>{this._fetchLocationDetails()}}
                    />
              </View>
              <TouchableHighlight style={{height:height/20,width:width/10,alignItems:'center',justifyContent:'center'}} onPress = {()=>{this.setState({locationString:''})}} underlayColor = 'transparent'>
                  <View>
                    {this.state.locationString != '' ? <Icon name="cancel" size = {20} color = "lightgrey" /> :null }
                  </View>
              </TouchableHighlight>
          </View>
      </View>
      <Map
         style={{flex:1,height:height/1.38,width:width}}
         mapType = 'hybrid'
         ref = 'Map'
         //loadingEnabled = {true}
         onPanDrag =  {(e) => {this._handleDrag(e.nativeEvent.coordinate)}}
         onPress =  {(e) => {this._handleDrag(e.nativeEvent.coordinate)}}
         //animateToRegion = {this._animateToRegion}
         scrollEnabled = {!this.state.userDrawing}
        >
          <Map.Polygon
             coordinates = {this.state.points}
             strokeColor = "#00C5F0"
             strokeWidth = {5}/>
        </Map>
        <View style={{flex:1,height:height/13,width:width,backgroundColor:'#00C5F0',flexDirection:'row'}}>
          {this._getControls()}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position:'absolute',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
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

module.exports = Area
