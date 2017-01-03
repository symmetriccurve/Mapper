
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
  Alert,
  Navigator
} from 'react-native';

var units = "miles";

import Icon from 'react-native-vector-icons/MaterialIcons';
//https://maps.googleapis.com/maps/api/place/textsearch/json?query=123+main+street&key=AIzaSyAdvT_G38grWe6w2oC3KAjxNVVlozbjlYo

import turf from '@turf/turf'
var {height, width } = Dimensions.get('window')
const FF = 'AppleSDGothicNeo-Medium'
const FS = height/20
import Map from 'react-native-maps'
var LatLngToTurf = require('./Utilities/LatLngToTurf')

class Distance extends Component {
  constructor(props){
    super(props)
    this.state = {
      points:[],
      userDrawing: false,
      area: 0,
      locationString:'',
      scrollEnabled: false
    }
  }

  componentWillMount() {
  }

  _handleDrag = (cord) => {
    if(this.state.userDrawing){

      this.setState({
        points:[...this.state.points,cord],
      },() => {

        var distance = 0
        if(this.state.points.length > 1) {
          //var turfPolygon = LatLngToTurf(this.state.points)
          //console.log('this.state.points.length',this.state.points);
          var from = LatLngToTurf(this.state.points[this.state.points.length - 2])
          var to = LatLngToTurf(this.state.points[this.state.points.length - 1 ])
          var points = {
              "type": "FeatureCollection",
              "features": [from, to]
            };
          distance = turf.distance(from, to, units);

          this.setState({
            area: this.state.area + distance,
          })
        }

      })
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

  _getZoomLevel = (zoomLevel) =>{
    //console.log('Check this',zoomLevel.geometry.bounds.northeast.lng - zoomLevel.geometry.bounds.southwest.lng);
    //console.log('Check this',zoomLevel.geometry.bounds.northeast.lat - zoomLevel.geometry.bounds.southwest.lat);
    //const longitudeDelta = Math.abs(se_lng - nw_lng);
    //const latitudeDelta = Math.abs(se_lat - nw_lat);
    //types: ["locality","political"]
    //console.log('zoomLevel',zoomLevel);
    switch (zoomLevel) {
        case "locality":
            return 0.7
        case "country":
            return 50
        case "postal_code":
            return 0.1
        case "premise":
        case "street_address":
            return 0.001
        default:
            return 100
    }
      return 0
  }

  _fetchLocationDetails = () => {
    if(this.state.locationString != ''){
      var api = "https://maps.googleapis.com/maps/api/geocode/json?&address="+JSON.stringify(this.state.locationString)
      fetch(api)
        .then((response) => {return response.json()})
        .then((responseData) => {

            if(responseData.results.length){
                //console.log('responseData.results[0]',responseData.results[0]);
                //console.log('latitudeDelta',responseData.results[0].geometry.viewport.northeast.lat - responseData.results[0].geometry.viewport.southwest.lat);
                //console.log('longitudeDelta',responseData.results[0].geometry.viewport.northeast.lat - responseData.results[0].geometry.viewport.southwest.lat);
                this.refs.Map.animateToRegion({
                    latitude: responseData.results[0].geometry.location.lat,
                    longitude: responseData.results[0].geometry.location.lng,
                    latitudeDelta: responseData.results[0].geometry.viewport.northeast.lat - responseData.results[0].geometry.viewport.southwest.lat,
                    longitudeDelta: responseData.results[0].geometry.viewport.northeast.lat - responseData.results[0].geometry.viewport.southwest.lat
                },500);
            }
          })
    }else {
      Alert.alert('Please Enter Location')
    }
  }

  _getControls = () => {
    if(!this.state.userDrawing){
      return (
        <View style={{flex:1,height:height/13,width:width,backgroundColor:'#FF9364',flexDirection:'row'}}>
          <TouchableHighlight  style={{flex:6,height:height/13,width:width,backgroundColor:this.state.userDrawing?'#FF9364':'#FF9364',alignItems:'center',justifyContent:'center'}} onPress = {()=>{this._handleDraw()}}>
              <View>
                <Text style={{color:'white',fontSize:FS - 10,fontFamily:FF,fontWeight:'bold'}}>{this.state.userDrawing ? this.state.area : 'DRAW'}</Text>
              </View>
          </TouchableHighlight>
        </View>
      )
    }else {
      return(
        <View style={{flex:1,height:height/13,width:width,backgroundColor:'#00C5F0',flexDirection:'row'}}>
            <View style={{flex:5,height:height/13,width:width,backgroundColor:this.state.userDrawing?'#FF9364':'#fc773d',alignItems:'center',justifyContent:'center'}} onPress = {()=>{this._handleDraw()}}>
                <Text style={{color:'white',fontSize:FS/2,fontFamily:FF}}>{this.state.userDrawing ? this.state.area + ' Miles' : 'Draw'}</Text>
            </View>
            <TouchableHighlight  style={{flex:1,height:height/13,width:width,backgroundColor:this.state.userDrawing?'#FF9364':'#fc773d',alignItems:'center',justifyContent:'center'}} onPress = {()=>{this._clear()}}>
            <Icon name="cancel" size = {30} color = "white" />
            </TouchableHighlight>
        </View>
      )
    }
  }

  _locateORClear = () => {
    if(this.state.locationString == '') {
      this.refs.searchBar.blur()
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.refs.Map.animateToRegion(
            {
              latitudeDelta : 0.0001,
              longitudeDelta : 0.0001,
              latitude : position.coords.latitude,
              longitude : position.coords.longitude
            } , 500 )
        },
        (error) => alert(JSON.stringify(error)),
        // params Support only for Android
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
      );
    } else {
        this.setState({locationString:''})
        this.refs.searchBar.focus()
    }
    //console.log('SearchBar', );
    // this.refs.Map.animateToRegion({
    //     latitude: 0,
    //     longitude: 0,
    //     latitudeDelta: 120,
    //     longitudeDelta: 140
    // },500);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{height:height/15,width:width,backgroundColor:'#FF9364',alignItems:'center',justifyContent:'center'}}>
            <View style={{height:height/20,width:width - width/15,backgroundColor:'white',alignItems:'center',justifyContent:'center',borderRadius:height/20,flexDirection:'row'}}>
                <View>
                  <TextInput
                      style={{alignItems:'center',justifyContent:'center',height:height/21,width:width/1.3,backgroundColor:'white',fontFamily:'AvenirNext-bold'}}
                      value = {this.state.locationString}
                      onChangeText = {(locationString) => {this.setState({locationString})}}
                      placeholder = 'Search'
                      keyboardType = 'web-search'
                      onSubmitEditing = {()=>{this._fetchLocationDetails()}}
                      ref = 'searchBar'
                      />
                </View>
                <TouchableHighlight style={{height:height/20,width:width/10,alignItems:'center',justifyContent:'center'}} onPress = {()=>{this._locateORClear()}} underlayColor = 'transparent'>
                    <View>
                      {this.state.locationString != '' ? <Icon name="cancel" size = {20} color = "lightgrey" /> : <Icon name="gps-fixed" size = {20} color = "#4285F4" />}
                    </View>
                </TouchableHighlight>
            </View>
        </View>
        <Map
           style={{flex:1,height:height/1.28,width:width}}
           mapType = 'hybrid'
           ref = 'Map'
           //loadingEnabled = {true}
           scrollEnabled = { this.state.scrollEnabled }
           onPanDrag =  {(e) => {this._handleDrag(e.nativeEvent.coordinate)}}
           onPress =  {(e) => {this._handleDrag(e.nativeEvent.coordinate)}}
           //animateToRegion = {this._animateToRegion}
           scrollEnabled = {!this.state.userDrawing}
           //onRegionChangeComplete={(center)=>{console.log('center',center)}}
          >
            <Map.Polyline
               coordinates = {this.state.points}
               strokeColor = "#fc773d"
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
    backgroundColor: 'red'
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

module.exports = Distance
