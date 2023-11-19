import React, { useEffect } from "react";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import Animated, { Easing, Keyframe, useAnimatedStyle, useSharedValue, withDelay, withRepeat, withSequence, withTiming } from 'react-native-reanimated';
import { View, StyleSheet, Text, Platform } from "react-native";
import { DEFAULT_COLORS } from "../../global-styles/colors";
import { TEXT_SIZES } from "../../global-styles/text.style";
import { ANDROID_ANCHORS, AnimationAnchors, IOS_ANCHORS } from "./animation-anchors";



export default function Guide() {

    const anchors = Platform.OS === 'ios' ? IOS_ANCHORS : ANDROID_ANCHORS

    return (
        <View style={styles.wrapper}>
            <View style={styles.row}>
                <AddTaskAnimation anchors={anchors} />
                <View style={styles.text_box}>
                    <Text style={styles.title}>
                        Add task
                    </Text>
                    <Text style={styles.text}>
                        To add a new task to your to-do, swipe down on the transparent area
                    </Text>
                </View>
            </View>
            <View style={styles.row}>
                <DeleteTaskAnimation anchors={anchors} />
                <View style={styles.text_box}>
                    <Text style={styles.title}>
                        Remove task
                    </Text>
                    <Text style={styles.text}>
                        To delete a task, simply double-tap on it
                    </Text>
                </View>
            </View>
            <View style={styles.row}>
                <CompleteTaskAnimation anchors={anchors} />
                <View style={styles.text_box}>
                    <Text style={styles.title}>
                        Complete task
                    </Text>
                    <Text style={styles.text}>
                        To mark a task as complete, swipe from right to left
                    </Text>
                </View>
            </View>
            <View style={styles.row}>
                <MoveBackTaskAnimation anchors={anchors} />
                <View style={styles.text_box}>
                    <Text style={styles.title}>
                        Undo
                    </Text>
                    <Text style={styles.text}>
                        To undo a task, swipe from left to right
                    </Text>
                </View>
            </View>
        </View>
    )
}


function AddTaskAnimation({ anchors }: { anchors: AnimationAnchors }) {
    const animationState = useSharedValue({ x: 0, y: 0, rotation: '35deg', touchingOpacity: 0 })
    useEffect(() => {
        animationState.value = withRepeat(
            withSequence(
                withDelay(400, withTiming({ x: 0, y: 0, rotation: '35deg', touchingOpacity: 0 }, { duration: 400 })),
                withTiming({ ...anchors.add_panel.top_left, rotation: '35deg', touchingOpacity: 0 }, { duration: 800, easing: Easing.ease }),
                withTiming({ ...anchors.add_panel.top_left, rotation: '45deg', touchingOpacity: 1 }, { duration: 300, easing: Easing.ease }),
                withTiming({ ...anchors.add_panel.bottom_left, rotation: '45deg', touchingOpacity: 1 }, { duration: 300, easing: Easing.ease }),
            ), -1)
    })
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
                <View style={animationStyles.phone}>
                    <Ionicons name="phone-portrait-outline" size={200} color={DEFAULT_COLORS.secondary} />
                    <Animated.View style={[animationStyles.pointer, animatedPoint]}>
                        <MaterialCommunityIcons name="hand-pointing-up" size={40} color={DEFAULT_COLORS.secondary_dark} style={{ zIndex: 1 }} />
                        <Animated.View style={[animationStyles.touchPoint, animatedTouchingPoint]}>

                        </Animated.View>
                    </Animated.View>
                    <View style={animationStyles.addItemZone}></View>
                </View>
            </View>
        </>
    )
}
function DeleteTaskAnimation({ anchors }: { anchors: AnimationAnchors }) {
    const animationState = useSharedValue({ x: 0, y: 0, rotation: '35deg', touchingOpacity: 0, textOpacity: 0 })
    const textStateLineThroughOpacity = useSharedValue(1)
    useEffect(() => {
        animationState.value = withRepeat(
            withSequence(
                withDelay(400, withTiming({ x: 0, y: 0, rotation: '35deg', touchingOpacity: 0, textOpacity: 1 }, { duration: 400 })),
                withTiming({ ...anchors.task.left_side, rotation: '35deg', touchingOpacity: 0, textOpacity: 1 }, { duration: 800, easing: Easing.ease }),
                withTiming({ ...anchors.task.left_side, rotation: '45deg', touchingOpacity: 1, textOpacity: 1 }, { duration: 150, easing: Easing.ease }),
                withTiming({ ...anchors.task.left_side, rotation: '35deg', touchingOpacity: 0, textOpacity: 1 }, { duration: 150, easing: Easing.ease }),
                withTiming({ ...anchors.task.left_side, rotation: '45deg', touchingOpacity: 1, textOpacity: 1 }, { duration: 150, easing: Easing.ease }),
                withTiming({ ...anchors.task.left_side, rotation: '35deg', touchingOpacity: 0, textOpacity: 1 }, { duration: 150, easing: Easing.ease }),
                withTiming({ ...anchors.task.bellow, rotation: '35deg', touchingOpacity: 0, textOpacity: 0 }, { duration: 500, easing: Easing.ease }),
            ), -1)
    })
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
                <View style={animationStyles.phone}>
                    <Ionicons name="phone-portrait-outline" size={200} color={DEFAULT_COLORS.secondary} />
                    <Animated.View style={[animationStyles.pointer, animatedPoint]}>
                        <MaterialCommunityIcons name="hand-pointing-up" size={40} color={DEFAULT_COLORS.secondary_dark} style={{ zIndex: 1 }} />
                        <Animated.View style={[animationStyles.touchPoint, animatedTouchingPoint]}>

                        </Animated.View>
                    </Animated.View>
                    <View style={animationStyles.taskListBox}>
                        <Text style={animationStyles.taskText}>Task #1</Text>
                        <Text style={animationStyles.taskText}>Task #2</Text>
                        <Animated.Text style={[animationStyles.taskText, animatedText]}>Task #3</Animated.Text>
                    </View>
                </View>
            </View>
        </>
    )
}
function CompleteTaskAnimation({ anchors }: { anchors: AnimationAnchors }) {
    const animationState = useSharedValue({ x: 0, y: 0, rotation: '35deg', touchingOpacity: 0, lineThroughOpacity: 0 })
    const textStateLineThroughOpacity = useSharedValue(1)
    useEffect(() => {
        animationState.value = withRepeat(
            withSequence(
                withDelay(400, withTiming({ x: 0, y: 0, rotation: '35deg', touchingOpacity: 0, lineThroughOpacity: 0 }, { duration: 400 })),
                withTiming({ ...anchors.task.right_side, rotation: '35deg', touchingOpacity: 0, lineThroughOpacity: 0 }, { duration: 800, easing: Easing.ease }),
                withTiming({ ...anchors.task.right_side, rotation: '45deg', touchingOpacity: 1, lineThroughOpacity: 0 }, { duration: 300, easing: Easing.ease }),
                withTiming({ ...anchors.task.left_side, rotation: '45deg', touchingOpacity: 1, lineThroughOpacity: 0 }, { duration: 500, easing: Easing.ease }),
                withTiming({ ...anchors.task.bellow, rotation: '35deg', touchingOpacity: 0, lineThroughOpacity: 1 }, { duration: 500, easing: Easing.ease }),
            ), -1)
    })
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
                <View style={animationStyles.phone}>
                    <Ionicons name="phone-portrait-outline" size={200} color={DEFAULT_COLORS.secondary} />
                    <Animated.View style={[animationStyles.pointer, animatedPoint]}>
                        <MaterialCommunityIcons name="hand-pointing-up" size={40} color={DEFAULT_COLORS.secondary_dark} style={{ zIndex: 1 }} />
                        <Animated.View style={[animationStyles.touchPoint, animatedTouchingPoint]}>

                        </Animated.View>
                    </Animated.View>
                    <View style={animationStyles.taskListBox}>
                        <Text style={animationStyles.taskText}>Task #1</Text>
                        <Text style={animationStyles.taskText}>Task #2</Text>
                        <View style={animationStyles.centered}>
                            <Text style={animationStyles.taskText}>Task #3</Text>
                            <Animated.View style={[animationStyles.lineThrough, animatedLineThrough]}></Animated.View>
                        </View>
                    </View>
                </View>
            </View>
        </>
    )
}
function MoveBackTaskAnimation({ anchors }: { anchors: AnimationAnchors }) {
    const animationState = useSharedValue({ x: 0, y: 0, rotation: '35deg', touchingOpacity: 0, lineThroughOpacity: 0 })
    useEffect(() => {
        animationState.value = withRepeat(
            withSequence(
                withDelay(400, withTiming({ x: 0, y: 0, rotation: '35deg', touchingOpacity: 0, lineThroughOpacity: 1 }, { duration: 400 })),
                withTiming({ ...anchors.task.left_side, rotation: '35deg', touchingOpacity: 0, lineThroughOpacity: 1 }, { duration: 800, easing: Easing.ease }),
                withTiming({ ...anchors.task.left_side, rotation: '45deg', touchingOpacity: 1, lineThroughOpacity: 1 }, { duration: 300, easing: Easing.ease }),
                withTiming({ ...anchors.task.right_side, rotation: '45deg', touchingOpacity: 1, lineThroughOpacity: 1 }, { duration: 500, easing: Easing.ease }),
                withTiming({ ...anchors.task.bellow, rotation: '35deg', touchingOpacity: 0, lineThroughOpacity: 0 }, { duration: 500, easing: Easing.ease }),
            ), -1)
    })
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
                <View style={animationStyles.phone}>
                    <Ionicons name="phone-portrait-outline" size={200} color={DEFAULT_COLORS.secondary} />
                    <Animated.View style={[animationStyles.pointer, animatedPoint]}>
                        <MaterialCommunityIcons name="hand-pointing-up" size={40} color={DEFAULT_COLORS.secondary_dark} style={{ zIndex: 1 }} />
                        <Animated.View style={[animationStyles.touchPoint, animatedTouchingPoint]}>

                        </Animated.View>
                    </Animated.View>
                    <View style={animationStyles.taskListBox}>
                        <Text style={animationStyles.taskText}>Task #1</Text>
                        <Text style={animationStyles.taskText}>Task #2</Text>
                        <View style={animationStyles.centered}>
                            <Text style={animationStyles.taskText}>Task #3</Text>
                            <Animated.View style={[animationStyles.lineThrough, animatedLineThrough]}></Animated.View>
                        </View>
                    </View>
                </View>
            </View>
        </>
    )
}
const styles = StyleSheet.create({
    wrapper: {
        padding: 15,
        paddingBottom: 100,
        alignItems: 'center'
    },
    title: {
        fontSize: TEXT_SIZES.big,
        color: DEFAULT_COLORS.secondary
    },
    text: {
        fontSize: TEXT_SIZES.medium,
        color: DEFAULT_COLORS.secondary
    },
    text_box: {
        marginLeft: 20,
        flex: 1
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center'
    },

})
const animationStyles = StyleSheet.create({

    phone: {
        width: 160,
        height: 230,
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
        height: 2,
        backgroundColor: DEFAULT_COLORS.secondary,
        position: 'absolute',
        transform: [{ translateY: -2 }]

    },

    centered: {

        justifyContent: 'center'
    }

})