import { useState } from "react";
import useStore from "./store/useStore";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./components/ui/collapsible";
import { Card, CardTitle } from "./components/ui/card";

export const EventList = () => {
  const eventTypesMap = {
    0: "initLoan",
    1: "accrual",
    2: "deliquency",
    3: "payment",
  };

  const [isOpen, setIsOpen] = useState(false);
  const events = useStore((state) => state.eventList);
  return (
    <div className="flex flex-col items-center justify-center overflow-y-auto overflow-x-hidden custom-scrollbar">
      {" "}
      {events.map((event) => (
        <div className="" key={event.eventId}>
          <Collapsible
            open={isOpen}
            onOpenChange={setIsOpen}
            className="w-[100px] mb-10 space-y-2"
          >
            <Card>
              <CardTitle>{eventTypesMap[event.eventType]}</CardTitle>
            </Card>

            <CollapsibleContent className="space-y-2"></CollapsibleContent>
          </Collapsible>
        </div>
      ))}
    </div>
  );
};
