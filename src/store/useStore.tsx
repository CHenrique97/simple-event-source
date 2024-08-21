
import {create} from 'zustand';

export enum EventType {
  initLoan,
  accrual,
  deliquency,
  payment
}

export interface EventState {
  eventType: EventType
  eventId: string
  principal: number | null
  interest: number | null
  lateInterest: number | null
  lateFee: number | null
  disbursement: number | null
}

// Define the state interface
interface StoreState {
    principal: number
    interest: number
    lateFee: number
    eventList: EventState[]
    setPrincipal: (value: number) => void
    setInterest: (value: number) => void
    setLateFee: (value: number) => void
    appendEvent: (value: EventState ) => void
    changeEvent: (value: EventState, index:number ) => void
    reset: () => void;
  }


  
  // Define the store
  const useStore = create<StoreState>((set) => ({
    principal: 0, // initial state for principal
    interest: 0,  // initial state for interest
    lateFee: 0,   // initial state for late fee
    eventList: [],
  
    // Actions to update the state
    setPrincipal: (value: number) => set(() => ({ principal: value })),
    setInterest: (value: number) => set(() => ({ interest: value })),
    setLateFee: (value: number) => set(() => ({ lateFee: value })),

    appendEvent: (value: EventState) => set((state) => ({ eventList: [...state.eventList, value] })),

    changeEvent: (value: EventState, index: number) => set((state) => ({
      eventList: state.eventList.map((event, i) =>
        i === index ? value : event
      )
    })),
  
    // Action to reset the state
    reset: () => set(() => ({ principal: 0, interest: 0, lateFee: 0 }))
  }));
  
  export default useStore;
