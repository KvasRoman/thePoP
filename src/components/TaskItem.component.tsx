import React from "react";
import { StyleSheet, Platform } from "react-native";
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    runOnJS
} from 'react-native-reanimated';
import { TEXT_SIZES } from "../global-styles/text.style";
import { DEFAULT_COLORS } from "../global-styles/colors";

const MIN_HORIZONTAL_SWIPE_DISTANCE = 20;
const MIN_HORIZONTAL_ACTIVATION_DISTANCE = 10;
const VERTICAL_SLOP_DISTANCE = 30;

export enum TaskChangeTypes {
    update,
    change_status,
    delete
}
export type OnChangeAction = (completed: boolean, changeType: TaskChangeTypes) => void
export default function TaskItem({ title, completed, onChange }: { title: string, completed: boolean, onChange: OnChangeAction }) {
    const isComplete = useSharedValue(completed)
    const isLockedForChange = useSharedValue(false);

    const startPositionX = useSharedValue(0);
    const startPositionY = useSharedValue(0);
    const manual = Gesture.Manual()
        .manualActivation(true)
        .cancelsTouchesInView(false)
        .onTouchesDown((e, state) => {
            startPositionY.value = e.changedTouches[0].y;
            startPositionX.value = e.changedTouches[0].x;
        })
        .onTouchesMove((e, state) => {
            if (Math.abs(e.changedTouches[0].y - startPositionY.value) > VERTICAL_SLOP_DISTANCE) {
                if (Platform.OS === 'android') state.fail();
                if (Platform.OS === 'ios') state.end();
            }
            else if (Math.abs(e.changedTouches[0].x - startPositionX.value) > MIN_HORIZONTAL_ACTIVATION_DISTANCE) {
                state.activate();
            }
        })
        .onTouchesUp(e => {
            if (isLockedForChange.value) {
                console.log('the task is locked');
                return
            }
            if (startPositionX.value - e.changedTouches[0].x > MIN_HORIZONTAL_SWIPE_DISTANCE) {
                isComplete.value = true;
                runOnJS(onChange)(true, TaskChangeTypes.change_status);
                return
            }
            if (-(startPositionX.value - e.changedTouches[0].x) > MIN_HORIZONTAL_SWIPE_DISTANCE) {
                isComplete.value = false;
                runOnJS(onChange)(false, TaskChangeTypes.change_status);
                return
            }
        })
    const tap = Gesture.Tap()
        .numberOfTaps(2)
        .maxDelay(300)
        .onStart(e => {
            runOnJS(onChange)(false, TaskChangeTypes.delete)
        })
    const longPress = Gesture.LongPress()
        .minDuration(500)
        .onStart(e => {
            runOnJS(onChange)(false, TaskChangeTypes.update)
        })
    const combined = Gesture.Race(manual, tap, longPress);

    const taskTextStyle = useAnimatedStyle(() => {
        if (isComplete.value) {
            return {
                textDecorationLine: 'line-through'
            }
        }
        return {
            textDecorationLine: 'none'
        }
    })
    return (
        <GestureDetector gesture={combined}>
            <Animated.View style={[styles.box]}>
                <Animated.Text style={[styles.text, taskTextStyle]}>{title}</Animated.Text>
            </Animated.View >
        </GestureDetector>
    )
}


const styles = StyleSheet.create({
    box: {
        width: '100%',
        minHeight: 40,
        padding: 5,
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    text: {
        color: DEFAULT_COLORS.secondary,
        fontSize: TEXT_SIZES.medium,
    },
    complete: {
        textDecorationLine: 'line-through'
    },
})