import useStore, { EventType, EventState } from "../store/useStore";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useEffect } from "react";
import { motion } from "framer-motion";

const AnimatedValue = ({ value }) => (
  <motion.h3
    key={value}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
    className="text-lg font-medium"
  >
    $ {value}
  </motion.h3>
);

let calculations = (eventList: EventState[]) => {
  const { setPrincipal, setInterest, setLateFee } = useStore.getState();

  if (eventList.length === 0) {
    console.log("Event list is empty.");
    return;
  }

  const lastEvent: EventState = eventList[eventList.length - 1];

  switch (lastEvent.eventType) {
    case EventType.initLoan:
      if (lastEvent.principal !== null) setPrincipal(lastEvent.principal);
      console.log("Initializing loan with principal:", lastEvent.principal);
      // Perform initLoan-specific actions here
      break;

    case EventType.accrual:
      if (lastEvent.interest !== null) setInterest(lastEvent.interest);
      console.log("Accruing interest:", lastEvent.interest);
      // Perform accrual-specific actions here
      break;

    case EventType.deliquency:
      if (lastEvent.lateFee !== null) setLateFee(lastEvent.lateFee);
      console.log(
        "Delinquency detected. Late interest:",
        lastEvent.lateInterest,
        "Late fee:",
        lastEvent.lateFee
      );
      // Perform delinquency-specific actions here
      break;

    case EventType.payment:
      if (lastEvent.principal !== null) setPrincipal(lastEvent.principal);
      if (lastEvent.interest !== null) setInterest(lastEvent.interest);
      console.log(
        "Processing payment. Principal:",
        lastEvent.principal,
        "Interest:",
        lastEvent.interest
      );
      // Perform payment-specific actions here
      break;

    default:
      console.log("Unknown event type:", lastEvent.eventType);
  }
};

const Snapshot: React.FC = () => {
  const principal = useStore((state) => state.principal);
  const interest = useStore((state) => state.interest);
  const lateFee = useStore((state) => state.lateFee);
  const eventList = useStore((state) => state.eventList);

  useEffect(() => {
    calculations(eventList);
  }, [eventList]);

  return (
    <Card className={cn("w-[300px]")}>
      <CardContent>
        <div className="grid w-full items-center justify-center gap-10">
          <div className="flex flex-row space-x-1.5 mt-8">
            <CardTitle>Principal:</CardTitle>
            <CardTitle>
            <AnimatedValue value={principal} />
            </CardTitle>
          </div>
          <div className="flex flex-row space-x-4">
            <CardTitle>Interest:</CardTitle>
            <CardTitle>
            <AnimatedValue value={interest} />
            </CardTitle>
          </div>
          <div className="flex flex-row space-x-2.5">
            <CardTitle>Late Fee:</CardTitle>
            <CardTitle>
            <AnimatedValue value={lateFee} />
            </CardTitle>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Snapshot;
