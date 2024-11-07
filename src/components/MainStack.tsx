import { BaseNavigationContainer } from '@react-navigation/core';
import * as React from "react";
import { stackNavigatorFactory } from "react-nativescript-navigation";
import { NoteList } from "./NoteList";
import { NoteEditor } from "./NoteEditor";
import { MainStackParamList } from "../NavigationParamList";

const StackNavigator = stackNavigatorFactory<MainStackParamList>();

export const MainStack = () => (
    <BaseNavigationContainer>
        <StackNavigator.Navigator
            initialRouteName="Notes"
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#6750A4",
                },
                headerTintColor: "#fff",
            }}
        >
            <StackNavigator.Screen
                name="Notes"
                component={NoteList}
                options={{ title: "My Notes" }}
            />
            <StackNavigator.Screen
                name="Editor"
                component={NoteEditor}
                options={({ route }) => ({ 
                    title: route.params?.note ? "Edit Note" : "New Note"
                })}
            />
        </StackNavigator.Navigator>
    </BaseNavigationContainer>
);