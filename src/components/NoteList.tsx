import * as React from "react";
import { StyleSheet } from "react-nativescript";
import { ListView, ActionBar, ActionItem, Color, Dialogs } from "@nativescript/core";
import { Note } from "../types/Note";
import { format } from "date-fns";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "../NavigationParamList";

type Props = {
    navigation: FrameNavigationProp<MainStackParamList, "Notes">;
};

export function NoteList({ navigation }: Props) {
    const [notes, setNotes] = React.useState<Note[]>([]);

    const deleteNote = async (id: string) => {
        const result = await Dialogs.confirm({
            title: "Delete Note",
            message: "Are you sure you want to delete this note?",
            okButtonText: "Delete",
            cancelButtonText: "Cancel"
        });

        if (result) {
            setNotes(notes.filter(note => note.id !== id));
        }
    };

    const renderNote = ({ item }: { item: Note }) => {
        return (
            <gridLayout 
                rows="auto, auto" 
                columns="*, auto"
                className="p-4 border-b border-gray-200"
                onTap={() => navigation.navigate("Editor", { note: item })}
            >
                <label 
                    row={0} 
                    col={0} 
                    className="text-lg font-bold text-purple-900"
                    text={item.title || "Untitled"} 
                />
                <label 
                    row={1} 
                    col={0} 
                    className="text-sm text-gray-600"
                    text={format(new Date(item.date), "MMM d, yyyy")} 
                />
                <button 
                    row="0" 
                    col="1" 
                    rowSpan="2"
                    className="text-red-500 font-bold"
                    text="Delete" 
                    onTap={(args) => {
                        args.object.ios.preventNavigation();
                        deleteNote(item.id);
                    }}
                />
            </gridLayout>
        );
    };

    return (
        <flexboxLayout style={styles.container}>
            <ActionBar>
                <ActionItem 
                    ios.position="right"
                    android.position="actionBar"
                    onTap={() => navigation.navigate("Editor")}
                >
                    <label className="text-white text-lg m-r-10">+ New Note</label>
                </ActionItem>
            </ActionBar>
            {notes.length === 0 ? (
                <label className="text-center text-gray-500 text-lg m-t-20">
                    No notes yet. Tap + to create one!
                </label>
            ) : (
                <ListView
                    items={notes}
                    cellFactory={renderNote}
                    separatorColor={new Color("#E5E7EB")}
                />
            )}
        </flexboxLayout>
    );
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        backgroundColor: "#fff"
    }
});