import * as React from "react";
import { StyleSheet } from "react-nativescript";
import { ActionBar, ActionItem } from "@nativescript/core";
import { Note } from "../types/Note";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "../NavigationParamList";
import { RouteProp } from "@react-navigation/core";

type Props = {
    navigation: FrameNavigationProp<MainStackParamList, "Editor">;
    route: RouteProp<MainStackParamList, "Editor">;
};

export function NoteEditor({ navigation, route }: Props) {
    const existingNote = route.params?.note;
    const [title, setTitle] = React.useState(existingNote?.title || "");
    const [content, setContent] = React.useState(existingNote?.content || "");

    const saveNote = () => {
        if (!title.trim() && !content.trim()) {
            navigation.goBack();
            return;
        }

        const note: Note = {
            id: existingNote?.id || Date.now().toString(),
            title: title.trim(),
            content: content.trim(),
            date: existingNote?.date || new Date().toISOString()
        };
        
        // In a real app, you'd save to storage here
        navigation.goBack();
    };

    return (
        <flexboxLayout style={styles.container}>
            <ActionBar>
                <ActionItem 
                    ios.position="right"
                    android.position="actionBar"
                    onTap={saveNote}
                >
                    <label className="text-white text-lg m-r-10">Save</label>
                </ActionItem>
            </ActionBar>
            <textField
                hint="Note Title"
                text={title}
                onTextChange={(args) => setTitle(args.value)}
                className="text-xl p-4 border-b border-gray-200"
                style={styles.input}
                returnKeyType="next"
            />
            <textView
                hint="Write your note here..."
                text={content}
                onTextChange={(args) => setContent(args.value)}
                className="p-4 flex-grow"
                style={styles.textArea}
            />
        </flexboxLayout>
    );
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        backgroundColor: "#fff",
        flexDirection: "column"
    },
    input: {
        fontSize: 18,
        color: "#1F2937"
    },
    textArea: {
        fontSize: 16,
        color: "#374151"
    }
});