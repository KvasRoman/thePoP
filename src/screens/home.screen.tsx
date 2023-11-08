import React, { useRef, useState } from "react";
import { Text, View, SafeAreaView, StyleSheet, KeyboardAvoidingView, Platform, TextInput, Modal, Pressable, ScrollView } from 'react-native'
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import TaskItem, { OnChangeAction, TaskChangeTypes } from "../components/TaskItem.component";
import { GestureDetector, GestureHandlerRootView, TouchableOpacity } from 'react-native-gesture-handler';
import AddItemZone from "../components/addItemZone.component";
import { addTask, deleteTask, moveBack, completeTask, updateTask } from "../redux/task.reducer";
import { addCompletedTask, deleteCompletedTask } from "../redux/finished-task.reducer";
import { TaskModel } from "../models/task.model";
import { DEFAULT_COLORS } from "../global-styles/colors";
import { TEXT_SIZES } from "../global-styles/text.style";
import uuid from 'react-native-uuid';
const MAX_TASK_TEXT_LENGTH = 50;

export default function HomeScreen() {
    const dispatch = useAppDispatch();
    const tasks = useAppSelector((selector) => selector.tasks)
    const completedtasks = useAppSelector((selector) => selector.completed)
    const taskInputRef = useRef<TextInput>(null);
    const [taskInputValue, setTaskInputValue] = useState('');
    const [taskTargetId, setTaskTargetId] = useState('-1');
    const [isTextInputVisible, setTextInputVisible] = useState(false);
    const openTaskAddModal = (task: TaskModel | null = null) => {
        setTextInputVisible(true);
        if (task) {
            setTaskTargetId(task.id);
            setTaskInputValue(task.title.substring(0, MAX_TASK_TEXT_LENGTH - 1));
        }
        if (task === null) {
            setTaskTargetId('-1');
            setTaskInputValue('');
        }


        setTimeout(() => {
            taskInputRef.current?.focus();

        }, 200)
    }
    const onTaskSubmit = (text: string, id: string = '-1') => {
        if (id === '-1') {
            setTextInputVisible(false);
            console.log(text);
            dispatch(addTask({
                id: uuid.v4() as string,
                title: text
            }))
            return
        }
        setTextInputVisible(false);
        dispatch(updateTask({
            id: id,
            title: text
        }))
    }
    const onTaskChange = (task: TaskModel, changeType: TaskChangeTypes, completed: boolean, prev: boolean) => {
        switch (changeType) {
            case TaskChangeTypes.delete: { onDeleteTask(task); break; }
            case TaskChangeTypes.change_status: { onChangeTaskState(task, completed, prev); break; }
            case TaskChangeTypes.update: { openTaskAddModal(task); break; }
            default: break;
        }
    }

    const onDeleteTask = (task: TaskModel) => {
        dispatch(deleteTask(task))
    }
    const onChangeTaskState = (task: TaskModel, completed: boolean, prev: boolean) => {
        if (prev === completed)
            return;
        if (completed) {
            dispatch(completeTask(task));
        }
        if (!completed) {
            dispatch(moveBack(task));
        }
    }
    const onTextInputValueChange = (text: string) => {
        if (text[text.length-1] === '\n'){
            taskInputRef.current?.blur();
            onTaskSubmit(taskInputValue, taskTargetId)
            return
        }
        setTaskInputValue(text)
    }
    return (

        <GestureHandlerRootView style={[styles.content, styles.flex1]}>
            <SafeAreaView style={[styles.flex1, styles.scrollWrapper]}>
                <ScrollView contentContainerStyle={{ paddingBottom: 200 }}>
                    {tasks.map((task) => <TaskItem title={task.title} completed={false} onChange={(completed: boolean, changeType: TaskChangeTypes) => { onTaskChange(task, changeType, completed, false) }} key={task.id}></TaskItem>)}
                    {completedtasks.map((task) => <TaskItem title={task.title} completed={true} onChange={(completed: boolean, changeType: TaskChangeTypes) => { onTaskChange(task, changeType, completed, true) }} key={task.id}></TaskItem>)}
                </ScrollView>
            </SafeAreaView>

            <AddItemZone onTriger={openTaskAddModal}></AddItemZone>
            <Modal
                animationType='fade'
                transparent={true}
                visible={isTextInputVisible}
                onRequestClose={() => { setTextInputVisible(false) }}
            >
                <Pressable
                    onPress={(event) => event.target == event.currentTarget && setTextInputVisible(false)}
                    style={[styles.flex1, styles.centered, styles.modalContent]}
                >
                    <View >
                        <TextInput
                            style={styles.inputText}
                            placeholderTextColor={DEFAULT_COLORS.secondary}
                            placeholder="your task"
                            multiline
                            numberOfLines={2}
                            blurOnSubmit={true}
                            maxLength={MAX_TASK_TEXT_LENGTH}
                            value={taskInputValue}
                            onChangeText={text => setTaskInputValue(text)}
                            ref={taskInputRef}
                            onSubmitEditing={e => { onTaskSubmit(e.nativeEvent.text, taskTargetId) }}></TextInput>
                    </View>
                </Pressable>
            </Modal>

        </GestureHandlerRootView>
    )
}

const styles = StyleSheet.create({
    content: {
        paddingVertical: 40,
        backgroundColor: DEFAULT_COLORS.primary
    },
    flex1: {
        flex: 1
    },
    centered: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    scrollWrapper: {
        paddingTop: 20
    },
    inputText: {
        fontSize: TEXT_SIZES.big,
        color: DEFAULT_COLORS.secondary
    },
    modalContent: {
        paddingHorizontal: 20,
        backgroundColor: DEFAULT_COLORS.primary
    }
})
