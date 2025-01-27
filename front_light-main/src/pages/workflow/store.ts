/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";


type State = {
    search: string;
    actionSelected: Record<string, any> | null;
    nodeSelected: Record<string, any> | null;
    nodeObjectBlock: string | null;
    editNodeData: Record<string, any> | null;
}


type Actions = {
    setSearch: (search: string) => void;
    setActionSelected: (action: Record<string, any> | null) => void;
    // setNbrNodes: (nbrNodes: number) => void;
    setNodeSelected: (nodeSelected: Record<string, any> | null) => void;
    setNodeObjectBlock: (nodeObjectBlock: string | null) => void;
    setEditNodeData: (editNode: Record<string, any> | null) => void;

}


const defaultState: State = {
    search: "",
    editNodeData: null,
    actionSelected: null,
    // nbrNodes: 0,/
    nodeSelected: null,
    nodeObjectBlock: null,
}


export const useStoreFlow = create<State & Actions>((set) => ({
    ...defaultState,
    setSearch: (search) => set({ search }),
    setActionSelected: (actionSelected) => set({ actionSelected }),
    // setNbrNodes: (nbrNodes) => set({ nbrNodes }),
    setNodeSelected: (nodeSelected) => set({ nodeSelected }),
    setNodeObjectBlock: (nodeObjectBlock) => set({ nodeObjectBlock }),
    setEditNodeData: (editNodeData) => set({ editNodeData }),
    editNodeData: null,
}));