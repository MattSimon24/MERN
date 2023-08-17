import { ConflictError, UnauthorizedError } from "../errors/http_errors";
import { Note } from "../models/note";
import { User } from "../models/user";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const fetchData = async (input:RequestInfo, init?: RequestInit) => {
    const response = await fetch(input,init);
    if (response.ok){
        return response;
    } else {
        const errorBody = await response.json();
        const errorMessage = errorBody.error;

        switch (response.status) {
            case 401:
                throw new UnauthorizedError(errorMessage)
                break;
            
            case 409:
                throw new ConflictError(errorMessage)
                break;
        
            default:
                throw Error(`Request failed with: ${response.status} message: ${errorMessage}`);
                break;
        }
      
    }   
}

export const getLoggedInUser = async ():Promise<User> => {
    const response = await fetchData("api/users", {method: "GET"});
    return response.json();
}

export type SignUpCredentials = {
    username: string,
    email: string,
    password: string,
}

export const signUp = async (credentials: SignUpCredentials):Promise<User> => {
    const response = await fetchData("api/users/signup", 
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),    
    });
   
    return response.json();
}

export type LoginCredentials = {
    username: string,
    email: string,
    password: string,
}

export const login = async (credentials: LoginCredentials):Promise<User> => {
    const response = await fetchData("api/users/login", 
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),    
    });
   
    return response.json();
}

export const logout = async () => {
    await fetchData("api/users/logout",{method: "POST"});

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