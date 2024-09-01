import { useEffect, useRef, useState } from "react";
import useStore, { EventState, EventType } from "./store/useStore";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./components/ui/collapsible";
import { Card, CardContent, CardTitle } from "./components/ui/card";
import { motion } from "framer-motion";
import { Label } from "@radix-ui/react-label";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { FaSync } from 'react-icons/fa';

const falseArray = Array(100).fill(false);

const calculations = (eventList: EventState[]) => {
  const { setPrincipal, setInterest, setLateFee, } = useStore.getState();

  let currentPrincipal = 0;
  let currentInterest = 0;
  let currentLateFee = 0;

  for (let i = 0; i < eventList.length; i++) {
    const event = eventList[i];

    switch (event.eventType) {
      case EventType.initLoan:
        if (event.principal !== null) {
          currentPrincipal = event.principal;
        }
        break;

      case EventType.accrual:
        if (event.interest !== null) {

          currentInterest += (event.interest / 100) * currentPrincipal;
        }
        break;

      case EventType.deliquency:
        if (event.lateFee !== null) {
          currentLateFee += event.lateFee;
        }
        if (event.lateInterest !== null) {
          currentInterest += (event.lateInterest/100) * currentPrincipal;
        }
        break;

      case EventType.payment:
        if (event.disbursement !== null) {
          let remainingDisbursement = event.disbursement;

          // Deduct from late fee first
          if (currentLateFee > 0) {
            const lateFeeDeduction = Math.min(
              remainingDisbursement,
              currentLateFee
            );
            currentLateFee -= lateFeeDeduction;
            remainingDisbursement -= lateFeeDeduction;
          }

          // Deduct from interest second
          if (remainingDisbursement > 0 && currentInterest > 0) {
            const interestDeduction = Math.min(
              remainingDisbursement,
              currentInterest
            );
            currentInterest -= interestDeduction;
            remainingDisbursement -= interestDeduction;
          }

          // Deduct from principal last
          if (remainingDisbursement > 0 && currentPrincipal > 0) {
            const principalDeduction = Math.min(
              remainingDisbursement,
              currentPrincipal
            );
            currentPrincipal -= principalDeduction;
            remainingDisbursement -= principalDeduction;
          }
        }
        break;

      default: {
      }
    }
  }

  // Update the store with the final values after processing all events
  setPrincipal(currentPrincipal);
  setInterest(currentInterest);
  setLateFee(currentLateFee);
};

export const EventList = () => {
  const handlePrincipalChange =
    (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const { eventList, changeEvent } = useStore.getState();

      const updatedEvent: EventState = {
        ...eventList[index],
        principal: Number(event.target.value),
      };

      changeEvent(updatedEvent, index);
    };

  const handleInterestChange =
    (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const { eventList, changeEvent } = useStore.getState();

      const updatedEvent: EventState = {
        ...eventList[index],
        interest: Number(event.target.value),
      };

      changeEvent(updatedEvent, index);
    };

  const handleLateInterestChange =
    (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const { eventList, changeEvent } = useStore.getState();

      const updatedEvent: EventState = {
        ...eventList[index],
        lateInterest: Number(event.target.value),
      };

      changeEvent(updatedEvent, index);
    };

  const handleLateFeeChange =
    (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const { eventList, changeEvent } = useStore.getState();

      const updatedEvent: EventState = {
        ...eventList[index],
        lateFee: Number(event.target.value),
      };

      changeEvent(updatedEvent, index);
    };

  const handleDisbursementChange =
    (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const { eventList, changeEvent } = useStore.getState();

      const updatedEvent: EventState = {
        ...eventList[index],
        disbursement: Number(event.target.value),
      };

      changeEvent(updatedEvent, index);
    };

    const reset = () => useStore.getState().reset();

  const renderComponent = (eventType: number, index: number) => {
    switch (eventType) {
      case 0:
        return (
          <Card className="flex flex-col items-center">
            <CardContent>
              <form>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5 items-center">
                    <Label htmlFor="principal">Principal</Label>
                    <Input
                      id="principal"
                      className="text-center"
                      placeholder="$ 100"
                      onChange={handlePrincipalChange(index)}
                    />
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        );
      case 1:
        return (
          <Card className="flex flex-col items-center">
            <CardContent>
              <form>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5 items-center">
                    <Label htmlFor="interest">Interest</Label>
                    <Input
                      id="interest"
                      className="text-center"
                      placeholder="% 10"
                      onChange={handleInterestChange(index)}
                    />
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        );
      case 2:
        return (
          <Card className="flex flex-col items-center">
            <CardContent>
              <form>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1 items-center">
                    <Label htmlFor="lateInterest">Late interest</Label>
                    <Input
                      id="lateInterest"
                      className="text-center"
                      placeholder="% 20"
                      onChange={handleLateInterestChange(index)}
                    />
                    <Label htmlFor="lateFee">Late fee</Label>
                    <Input
                      id="lateFee"
                      className="text-center"
                      placeholder="$ 10"
                      onChange={handleLateFeeChange(index)}
                    />
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        );
      case 3:
        return (
          <Card className="flex flex-col items-center">
            <CardContent>
              <form>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5 items-center">
                    <Label htmlFor="disbursement">Amount</Label>
                    <Input
                      id="disbursement"
                      className="text-center"
                      placeholder="$ 100"
                      onChange={handleDisbursementChange(index)}
                    />
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        );
      default:
        return null;
    }
  };

  const eventTypesMap = {
    0: "Init Loan",
    1: "Accrual",
    2: "Deliquency",
    3: "Payment",
  };

  const [isOpen, setIsOpen] = useState<boolean[]>(falseArray);

  const updateElement = (index: number) => {
    // Create a copy of the array
    const updatedArray = [...isOpen];

    // Update the specific element
    updatedArray[index] = !isOpen[index];
    // Set the new state
    setIsOpen(updatedArray);
  };

  const events = useStore((state) => state.eventList);
  const lastEventRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (lastEventRef.current) {
      lastEventRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [events]); // This effect runs whenever the events array changes

  return (
    <>
      <div className="flex flex-col items-center justify-center overflow-y-auto overflow-x-hidden custom-scrollbar pb-[10px]"  id="republish">
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
              open={isOpen[index]}
              className="space-y-2 flex flex-col items-center "
            >
              <CollapsibleTrigger>
                <Card
                  className="flex items-center justify-center p-[3px]"
                  onClick={() => updateElement(index)}
                >
                  <CardTitle>{eventTypesMap[event.eventType]}</CardTitle>
                </Card>
              </CollapsibleTrigger>
              <CollapsibleContent className="w-[120px] space-y-2">
                {renderComponent(event.eventType, index)}
              </CollapsibleContent>
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
      <div className="flex space-x-2 mb-3">
        <Button className="mb-3" onClick={() => calculations(events)}>
          Republish
        </Button>
        <Button variant="secondary" id="refresh" onClick={() => reset()}>
          <FaSync />
        </Button>
      </div>
    </>
  );
};
