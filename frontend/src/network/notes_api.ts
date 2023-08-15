import { Note } from "../models/note";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const fetchData = async (input:RequestInfo, init?: RequestInit) => {
    const response = await fetch(input,init);
    if (response.ok){
        return response;
    } else {
        const errorBody = await response.json();
        const errorMessage = errorBody.error;
        throw Error(errorMessage);
    }   
}


export const fetchNotes = async(): Promise<Note[]> => {
    const response = await fetchData("/api/notes", { method: "GET" });
    return response.json();
}

export type NoteInput = {
    title: string,
    text?: string,
}

export const createNote= async (note: NoteInput): Promise<Note> => {
    const response = await fetchData("/api/notes",
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(note),    
    });
    return response.json();   
}

export const updateNote = async (note: NoteInput, noteId: string): Promise<Note> => {
    const response = await fetchData(`/api/notes/${noteId}`,
    {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(note),    
    });
    return response.json();   
}

export const deleteNote =async (noteId:string) => {
    await fetchData(`api/notes/${noteId}`,{method: 'DELETE'});   
}