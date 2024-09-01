import "./App.css";



import { Field } from "./fields/fields";
import Snapshot from "./card/snapshot";
import { ThemeProvider } from "./components/ui/theme-provider";
import { EventTypes } from "./event-types";
import { EventList } from "./event-list";
import Joyride from 'react-joyride';

function App() {
  const snapshotStyle: React.CSSProperties = {
    margin: "5px",
    display: "flex",
    flexDirection: "column",
    alignContent: "flex-start",
    alignItems: "center",
    width: "500px", // Width of the square
    height: "400px", // Height of the square
    border: "2px solid white", // White border with 5px width
    borderRadius: "15px", // Rounded edges with 15px radius
  };

  const eventListStyle: React.CSSProperties = {
    margin: "5px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    alignContent: "flex-start",
    width: "300px", // Width of the square
    height: "400px", // Height of the square
    border: "2px solid white", // White border with 5px width
    borderRadius: "15px", // Rounded edges with 15px radius
  };

  const eventTypesStyle: React.CSSProperties = {
    marginTop: "10px",
    marginLeft: "5px",
    width: "820px", // Width of the square
    border: "2px solid white", // White border with 5px width
    borderRadius: "15px", // Rounded edges with 15px radius
  };

  const steps = [
    {
      target: '#my-first-step',
      content: 'Welcome to simple-event-sourcing, this is the list of events',
    },
    {
      target: '#my-second-step',
      content: 'To start, you can init a loan with the amount of choosing',
    },
  ];





  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Joyride steps={steps} />
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-45 max-w-screen-lg">
          <div className="calculation-area space-y-4">
            <Field title="Event list" style={eventListStyle}>
              <EventList></EventList>
            </Field>

            <Field title="Snapshot" style={snapshotStyle}>
              <Snapshot />
            </Field>
          </div>
          <Field title="Event Types " style={eventTypesStyle}>
            <EventTypes></EventTypes>
          </Field>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
