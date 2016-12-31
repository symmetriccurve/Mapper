
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Animated,
  TouchableHighlight,
  TextInput
} from 'react-native';

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
      area: 0
    }
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
      <View style={{height:height/12,width:width,backgroundColor:'brown',alignItems:'center',justifyContent:'center'}}>

      </View>
      <Map
         style={{flex:1,height:height/1.44,width:width}}
         mapType = 'hybrid'
         //ref = { (MapRef)=> {if( MapRef !=null ) { MapRef.fitToElements(true) }} }
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
