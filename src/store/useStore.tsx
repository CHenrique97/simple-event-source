import {create} from 'zustand';

// Define the state interface
interface StoreState {
    principal: number;
    interest: number;
    lateFee: number;
    isDropped: boolean;
    setPrincipal: (value: number) => void;
    setInterest: (value: number) => void;
    setLateFee: (value: number) => void;
    setIsDropped: (value: boolean) => void;
    reset: () => void;
  }
  
  // Define the store
  const useStore = create<StoreState>((set) => ({
    principal: 0, // initial state for principal
    interest: 0,  // initial state for interest
    lateFee: 0,   // initial state for late fee
    isDropped: false,
  
    // Actions to update the state
    setIsDropped: (value) =>  set(() => ({ isDropped: value })),
    setPrincipal: (value) => set(() => ({ principal: value })),
    setInterest: (value) => set(() => ({ interest: value })),
    setLateFee: (value) => set(() => ({ lateFee: value })),
  
    // Action to reset the state
    reset: () => set(() => ({ principal: 0, interest: 0, lateFee: 0 }))
  }));
  
  export default useStore;