import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle } from 'react-native-reanimated'
import { GestureDetector, Gesture, GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';



export default function App() {

  const offset = useSharedValue({ x: 0, y: 0 })
  const pan = Gesture.Pan()
    .onUpdate((e) => {
      offset.value = {
        x: e.translationX,
        y: e.translationY,
      };
    })
    .onFinalize((e) => {
      offset.value = {
        x: 0,
        y: 0
      }
    });
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: offset.value.x },
        { translateY: offset.value.y }
      ]
    }
  })

  return (
    <GestureHandlerRootView>
      <GestureDetector gesture={pan}>
        <Animated.View style={[styles.box, animatedStyle]}>
        </Animated.View>
      </GestureDetector>
    </GestureHandlerRootView >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  box: {
    width: 40,
    height: 40,
    marginTop: 50,
    backgroundColor: 'red'
  }
});
