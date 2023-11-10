import React, { useRef, useState } from "react";
import { StatusBar, View, Text, StyleSheet, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { DEFAULT_COLORS } from "../global-styles/colors";
import Guide from "../components/guideCards/add-task-guide";
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";





export default function GuideScreen({ navigation }: { navigation: any }) {



    return (
        <>
            <StatusBar
                animated={true}
                backgroundColor={DEFAULT_COLORS.primary}
            />
            <SafeAreaView style={styles.content}>
                <ScrollView style={styles.scrollPadding}>
                    <Guide />
                </ScrollView>
                <Pressable style={styles.moveBack} onPress={() => navigation.goBack()}>
                    <Ionicons name="book-outline" size={42} color={DEFAULT_COLORS.secondary} />
                </Pressable>
            </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    content: {
        backgroundColor: DEFAULT_COLORS.primary,
        flex: 1,
        paddingVertical: 10,
        paddingBottom: 50
    },
    moveBack: {
        position: 'absolute',
        right: 30,
        bottom: 40,
        width: 40,
        height: 40,
        zIndex: 1
    },
    scrollPadding: {
        paddingVertical: 40
    }
})