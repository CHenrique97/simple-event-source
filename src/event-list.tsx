import useStore from "./store/useStore"


export const  EventList = () => {

    const events = useStore((state) => state.eventList)
    return (<>       {events.map((event) => (
        <div key={event.eventId}>
          <p>{event.eventType}</p>
        </div>
      ))}</>)
}
