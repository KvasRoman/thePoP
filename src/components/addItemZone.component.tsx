import * as React from 'react'
import { View, Text, StyleSheet } from "react-native";
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
    useSharedValue,
    withTiming,
    useAnimatedStyle,
    useAnimatedReaction,
    runOnJS
} from 'react-native-reanimated';


const minSwipeDistance = 15;

export default function AddItemZone({onTriger} : {onTriger: () => void}){
    const startY = useSharedValue(0)
    const pan = Gesture.Pan()
    .onStart(e => {
        startY.value = e.y
    })
    .onEnd(e => {
        if(e.y - startY.value > minSwipeDistance){
            runOnJS(onTriger)()
        }
    })


    return(
        <GestureDetector gesture={pan}>
            <View style={styles.panel}></View>
        </GestureDetector>
    )
}
const styles = StyleSheet.create({
    panel: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 200,
    }
})

