import React, { useEffect } from "react";
import { FontAwesome, FontAwesome5, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import Animated, { Easing, Keyframe, useAnimatedStyle, useSharedValue, withDelay, withRepeat, withSequence, withTiming } from 'react-native-reanimated';
import { View, StyleSheet, Text } from "react-native";
import { DEFAULT_COLORS } from "../../global-styles/colors";
import { TEXT_SIZES } from "../../global-styles/text.style";



export default function Guide() {



    return (
        <View>
            <AddTaskAnimation />
            <DeleteTaskAnimation />
            <CompleteTaskAnimation />
            <MoveBackTaskAnimation />
        </View>
    )
}


function AddTaskAnimation() {
    //(35; 10) left_bottom
    //(110; 170) right_top
    const animationState = useSharedValue({ x: 0, y: 0, rotation: '35deg', touchingOpacity: 0 })
    useEffect(() => {
        animationState.value = withRepeat(
            withSequence(
                withDelay(400, withTiming({ x: 0, y: 0, rotation: '35deg', touchingOpacity: 0 }, { duration: 400 })),
                withTiming({ x: 50, y: 35, rotation: '35deg', touchingOpacity: 0 }, { duration: 800, easing: Easing.ease }),
                withTiming({ x: 50, y: 35, rotation: '45deg', touchingOpacity: 1 }, { duration: 300, easing: Easing.ease }),
                withTiming({ x: 50, y: 15, rotation: '45deg', touchingOpacity: 1 }, { duration: 300, easing: Easing.ease }),
            ), -1)
    })

    //point.value = withSequence()
    const animatedPoint = useAnimatedStyle(() => ({
        bottom: 0 + animationState.value.y,
        left: 0 + animationState.value.x,
        transform: [{ rotate: animationState.value.rotation }]
    }))
    const animatedTouchingPoint = useAnimatedStyle(() => ({
        opacity: animationState.value.touchingOpacity
    }))
    return (
        <>
            <View>
                <View style={styles.phone}>
                    <Ionicons name="phone-portrait-outline" size={200} color={DEFAULT_COLORS.secondary} />
                    <Animated.View style={[styles.pointer, animatedPoint]}>
                        <MaterialCommunityIcons name="hand-pointing-up" size={40} color={DEFAULT_COLORS.secondary_dark} style={{ zIndex: 1 }} />
                        <Animated.View style={[styles.touchPoint, animatedTouchingPoint]}>

                        </Animated.View>
                    </Animated.View>
                    <View style={styles.addItemZone}></View>
                </View>
            </View>
        </>
    )
}
function DeleteTaskAnimation() {
    //(35; 10) left_bottom
    //(110; 170) right_top
    const animationState = useSharedValue({ x: 0, y: 0, rotation: '35deg', touchingOpacity: 0, textOpacity: 0 })
    const textStateLineThroughOpacity = useSharedValue(1)
    useEffect(() => {
        animationState.value = withRepeat(
            withSequence(
                withDelay(400, withTiming({ x: 0, y: 0, rotation: '35deg', touchingOpacity: 0, textOpacity: 1 }, { duration: 400 })),
                withTiming({ x: 35, y: 110, rotation: '35deg', touchingOpacity: 0, textOpacity: 1 }, { duration: 800, easing: Easing.ease }),
                withTiming({ x: 35, y: 110, rotation: '45deg', touchingOpacity: 1, textOpacity: 1 }, { duration: 150, easing: Easing.ease }),
                withTiming({ x: 35, y: 110, rotation: '35deg', touchingOpacity: 0, textOpacity: 1 }, { duration: 150, easing: Easing.ease }),
                withTiming({ x: 35, y: 110, rotation: '45deg', touchingOpacity: 1, textOpacity: 1 }, { duration: 150, easing: Easing.ease }),
                withTiming({ x: 35, y: 110, rotation: '35deg', touchingOpacity: 0, textOpacity: 1 }, { duration: 150, easing: Easing.ease }),
                withTiming({ x: 35, y: 90, rotation: '35deg', touchingOpacity: 0, textOpacity: 0 }, { duration: 500, easing: Easing.ease }),
            ), -1)
    })
    const text = useSharedValue({ textDecoration: 'none' })
    //point.value = withSequence()
    const animatedPoint = useAnimatedStyle(() => ({
        bottom: 0 + animationState.value.y,
        left: 0 + animationState.value.x,
        transform: [{ rotate: animationState.value.rotation }]
    }))
    const animatedTouchingPoint = useAnimatedStyle(() => ({
        opacity: animationState.value.touchingOpacity
    }))
    const animatedText = useAnimatedStyle(() => ({
        opacity: animationState.value.textOpacity
    }))
    return (
        <>
            <View>
                <View style={styles.phone}>
                    <Ionicons name="phone-portrait-outline" size={200} color={DEFAULT_COLORS.secondary} />
                    <Animated.View style={[styles.pointer, animatedPoint]}>
                        <MaterialCommunityIcons name="hand-pointing-up" size={40} color={DEFAULT_COLORS.secondary_dark} style={{ zIndex: 1 }} />
                        <Animated.View style={[styles.touchPoint, animatedTouchingPoint]}>

                        </Animated.View>
                    </Animated.View>
                    <View style={styles.taskListBox}>
                        <Text style={styles.taskText}>Task #1</Text>
                        <Text style={styles.taskText}>Task #2</Text>
                        <Animated.Text style={[styles.taskText, animatedText]}>Task #3</Animated.Text>
                    </View>
                </View>
            </View>
        </>
    )
}
function CompleteTaskAnimation() {
    //(35; 10) left_bottom
    //(110; 170) right_top
    const animationState = useSharedValue({ x: 0, y: 0, rotation: '35deg', touchingOpacity: 0, lineThroughOpacity: 0 })
    const textStateLineThroughOpacity = useSharedValue(1)
    useEffect(() => {
        animationState.value = withRepeat(
            withSequence(
                withDelay(400, withTiming({ x: 0, y: 0, rotation: '35deg', touchingOpacity: 0, lineThroughOpacity: 0 }, { duration: 400 })),
                withTiming({ x: 75, y: 110, rotation: '35deg', touchingOpacity: 0, lineThroughOpacity: 0 }, { duration: 800, easing: Easing.ease }),
                withTiming({ x: 75, y: 110, rotation: '45deg', touchingOpacity: 1, lineThroughOpacity: 0 }, { duration: 300, easing: Easing.ease }),
                withTiming({ x: 35, y: 110, rotation: '45deg', touchingOpacity: 1, lineThroughOpacity: 0 }, { duration: 500, easing: Easing.ease }),
                withTiming({ x: 35, y: 90, rotation: '35deg', touchingOpacity: 0, lineThroughOpacity: 1 }, { duration: 500, easing: Easing.ease }),
            ), -1)
    })
    const text = useSharedValue({ textDecoration: 'none' })
    //point.value = withSequence()
    const animatedPoint = useAnimatedStyle(() => ({
        bottom: 0 + animationState.value.y,
        left: 0 + animationState.value.x,
        transform: [{ rotate: animationState.value.rotation }]
    }))
    const animatedTouchingPoint = useAnimatedStyle(() => ({
        opacity: animationState.value.touchingOpacity
    }))
    const animatedLineThrough = useAnimatedStyle(() => ({
        opacity: animationState.value.lineThroughOpacity
    }))
    return (
        <>
            <View>
                <View style={styles.phone}>
                    <Ionicons name="phone-portrait-outline" size={200} color={DEFAULT_COLORS.secondary} />
                    <Animated.View style={[styles.pointer, animatedPoint]}>
                        <MaterialCommunityIcons name="hand-pointing-up" size={40} color={DEFAULT_COLORS.secondary_dark} style={{ zIndex: 1 }} />
                        <Animated.View style={[styles.touchPoint, animatedTouchingPoint]}>

                        </Animated.View>
                    </Animated.View>
                    <View style={styles.taskListBox}>
                        <Text style={styles.taskText}>Task #1</Text>
                        <Text style={styles.taskText}>Task #2</Text>
                        <Text style={styles.taskText}>Task #3</Text>
                        <Animated.View style={[styles.lineThrough, animatedLineThrough]}></Animated.View>
                    </View>
                </View>
            </View>
        </>
    )
}
function MoveBackTaskAnimation() {
    //(35; 10) left_bottom
    //(110; 170) right_top
    const animationState = useSharedValue({ x: 0, y: 0, rotation: '35deg', touchingOpacity: 0, lineThroughOpacity: 0 })
    const textStateLineThroughOpacity = useSharedValue(1)
    useEffect(() => {
        animationState.value = withRepeat(
            withSequence(
                withDelay(400, withTiming({ x: 0, y: 0, rotation: '35deg', touchingOpacity: 0, lineThroughOpacity: 1 }, { duration: 400 })),
                withTiming({ x: 35, y: 110, rotation: '35deg', touchingOpacity: 0, lineThroughOpacity: 1 }, { duration: 800, easing: Easing.ease }),
                withTiming({ x: 35, y: 110, rotation: '45deg', touchingOpacity: 1, lineThroughOpacity: 1 }, { duration: 300, easing: Easing.ease }),
                withTiming({ x: 75, y: 110, rotation: '45deg', touchingOpacity: 1, lineThroughOpacity: 1 }, { duration: 500, easing: Easing.ease }),
                withTiming({ x: 75, y: 90, rotation: '35deg', touchingOpacity: 0, lineThroughOpacity: 0 }, { duration: 500, easing: Easing.ease }),
            ), -1)
    })
    const text = useSharedValue({ textDecoration: 'none' })
    //point.value = withSequence()
    const animatedPoint = useAnimatedStyle(() => ({
        bottom: 0 + animationState.value.y,
        left: 0 + animationState.value.x,
        transform: [{ rotate: animationState.value.rotation }]
    }))
    const animatedTouchingPoint = useAnimatedStyle(() => ({
        opacity: animationState.value.touchingOpacity
    }))
    const animatedLineThrough = useAnimatedStyle(() => ({
        opacity: animationState.value.lineThroughOpacity
    }))
    return (
        <>
            <View>
                <View style={styles.phone}>
                    <Ionicons name="phone-portrait-outline" size={200} color={DEFAULT_COLORS.secondary} />
                    <Animated.View style={[styles.pointer, animatedPoint]}>
                        <MaterialCommunityIcons name="hand-pointing-up" size={40} color={DEFAULT_COLORS.secondary_dark} style={{ zIndex: 1 }} />
                        <Animated.View style={[styles.touchPoint, animatedTouchingPoint]}>

                        </Animated.View>
                    </Animated.View>
                    <View style={styles.taskListBox}>
                        <Text style={styles.taskText}>Task #1</Text>
                        <Text style={styles.taskText}>Task #2</Text>
                        <Text style={styles.taskText}>Task #3</Text>
                        <Animated.View style={[styles.lineThrough, animatedLineThrough]}></Animated.View>
                    </View>
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    phone: {
        width: 160,
        height: 230,
        //backgroundColor: 'red'
    },
    pointer: {
        position: 'absolute',
        width: 40,
        height: 40
    },
    touchPoint: {
        width: 15,
        height: 15,
        borderRadius: 15,
        backgroundColor: DEFAULT_COLORS.accent1,
        position: 'absolute',
        top: -5,
        right: 10

    },
    addItemZone: {
        width: 100,
        height: 50,
        backgroundColor: DEFAULT_COLORS.accent2,
        position: 'absolute',
        bottom: 25,
        right: 10,
        zIndex: -1
    },
    taskListBox: {
        paddingVertical: 25,
        paddingHorizontal: 10,
        width: 100,
        height: 150,
        position: "absolute",
        top: 20,
        right: 10,
        zIndex: -1
    },
    taskText: {
        fontSize: TEXT_SIZES.small,
        color: DEFAULT_COLORS.secondary,
        marginBottom: 4,
    },
    lineThrough: {
        width: 40,
        height: 1,
        backgroundColor: DEFAULT_COLORS.secondary,
        position: 'absolute',
        bottom: 80,
        left: 13

    }

})