import { forwardRef, ReactElement, useEffect, useRef, useState } from "react";
import useStore from "./store/useStore";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./components/ui/collapsible";
import { Card, CardTitle } from "./components/ui/card";
import { motion } from "framer-motion";

export const EventList = () => {
  const eventTypesMap = {
    0: "Init Loan",
    1: "Accrual",
    2: "Deliquency",
    3: "Payment",
  };

  const [isOpen, setIsOpen] = useState(false);
  const events = useStore((state) => state.eventList);
  const lastEventRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (lastEventRef.current) {
      lastEventRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [events]); // This effect runs whenever the events array changes

  return (
    <div className="flex flex-col items-center justify-center overflow-y-auto overflow-x-hidden custom-scrollbar pb-[10px]">
      {" "}
      {events.map((event, index) => (
        <motion.div
          key={event.eventId}
          ref={lastEventRef}
          initial={{ opacity: 0, translateY: -20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Collapsible
            open={isOpen}
            onOpenChange={setIsOpen}
            className="w-[100px]  space-y-2"
          >
            <Card className="flex items-center justify-center p-[3px]">
              <CardTitle>{eventTypesMap[event.eventType]}</CardTitle>
            </Card>

            <CollapsibleContent className="space-y-2"></CollapsibleContent>
          </Collapsible>
          {/* Conditionally render the arrow for all items except the last one */}
          {index < events.length - 1 && (
            <div className="flex justify-center">
              <div className="w-0 h-0 border-l-[10px] border-r-[10px] border-t-[10px] border-l-transparent border-r-transparent border-t-white m-[10px]"></div>
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
};
