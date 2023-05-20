import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { runOnJS } from 'react-native-reanimated'

export default function App() {
  const [state, setState] = useState(0);
  const [Color , setColor] = useState("#f0f");
  const transX = useSharedValue(0);
  const transbg = useSharedValue("#303");
  
  
  const penGestureHandler = useAnimatedGestureHandler({
    onStart: () => {},
    onActive: (e) => {
      runOnJS(setColor)('#444')
      if (e.translationX < 100) {
        if (e.translationX < -100) {
          return;
        }
        transX.value = e.translationX;
        transbg.value = "#303" 
      }
    },
    onEnd: (e) => {
      if  ( e.translationX >= 98 ) {
        runOnJS(setState)(state + 1) 
      }
      if  ( e.translationX <= -98 ) {
        runOnJS(setState)(state - 1) 
      }
      runOnJS(setColor)('#f0f')
      transbg.value = withSpring("#303");
      transX.value = withSpring(0);
    },
  });

  const transXStyle = useAnimatedStyle(()=>{
    return {transform:[
      {
        translateX:transX.value /6
      }
    ],
    backgroundColor:transbg.value,
  }
})

  const tranStyle = useAnimatedStyle(()=>{
    return {transform:[
      {
        translateX:transX.value
      }
    ]
  }
})

  const handleState=(sympol)=>{
    setState(eval(`${state} ${sympol} 1`));
  }

  return (
    <View style={styles.container}>
      <StatusBar
        style="light"
      />
      <Animated.View
        style={[styles.circleContainer , transXStyle] }
      >
        <TouchableOpacity onPress={() => handleState("-")}>
          <View style={styles.Symbols}>
          <Text style={[styles.text , {color:Color}]}>-</Text>
          </View>
        </TouchableOpacity>
        <GestureHandlerRootView>
          <PanGestureHandler onGestureEvent={penGestureHandler}>
            <Animated.View style={[styles.circle, tranStyle]}>
              <TouchableOpacity onPress={() => handleState("+")}>
                <View
                  style={styles.circleLisener}
                >
                  <Text style={{ fontSize: 20, color: "#fff" }}> {state} </Text>
                </View>
              </TouchableOpacity>
            </Animated.View>
          </PanGestureHandler>
        </GestureHandlerRootView>
        <TouchableOpacity style={{zIndex:-9}} onPress={() => handleState("+")}>
          <View style={styles.Symbols}>
            <Text style={[styles.text ,{color:Color}]}>+</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: '#202',
    alignItems: 'center',
    justifyContent: 'center',
    color:'#fff' 
  },
  circleContainer: {
    width: 300,
    height: 110,
    // backgroundColor: "#202",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 100,
    justifyContent: "space-evenly",
  },
  circleLisener:{
    width: 80,
    height: 80,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",          
  },
  circle:{ 
    width:100 , height:100 , backgroundColor:'#505' , alignItems:'center', borderRadius:100 , justifyContent:'center',
  },
  text :{
    fontSize:20,
  },
  Symbols:{
    display:'flex' ,alignItems:'center', justifyContent:'center',width:100 , height: 100 ,
  }
});