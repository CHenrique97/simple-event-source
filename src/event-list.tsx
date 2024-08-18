import { forwardRef, ReactElement, useEffect, useRef, useState } from "react";
import useStore, { EventType } from "./store/useStore";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./components/ui/collapsible";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./components/ui/card";
import { motion } from "framer-motion";
import { Label } from "@radix-ui/react-label";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";

const changeEvent = (uuid:string) => {
  return uuid
}

const falseArray = Array(10).fill(false)

export const EventList = () => {


 
  const [principal, setPrincipal] = useState(0);
  const [interest, setInterest] = useState(0);
  const [lateInterest, setLateInterest] = useState(0);
  const [lateFee, setLateFee] = useState(0);
  const [disbursement, setDisbursement] = useState(0);


  const handlePrincipalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrincipal(Number(event.target.value));
  }
const handleInterestChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInterest(Number(event.target.value));
  } 
const handleLateInterestChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLateInterest(Number(event.target.value));
  }
const handleLateFeeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLateFee(Number(event.target.value));
  }
const handleDisbursementChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDisbursement(Number(event.target.value));
  }


  const componentMap = {
    0: (
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
                  onChange={handlePrincipalChange}
                />
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    ),
    1: (
      <Card className=" flex flex-col items-center">
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5 items-center">
                <Label htmlFor="interest">Interest</Label>
                <Input
                  id="interest"
                  className="text-center"
                  placeholder="% 10"
                  onChange={handleInterestChange}
                />
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    ),
    2: (
      <Card className=" flex flex-col items-center">
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1 items-center">
                <Label htmlFor="lateInterest">Late interest</Label>
                <Input
                  id="lateInterest"
                  className="text-center"
                  placeholder="% 20"
                  onChange={handleLateInterestChange}
                />
                <Label htmlFor="lateFee">Late fee</Label>
                <Input
                  id="lateFee"
                  className="text-center"
                  placeholder="$ 10"
                  onChange={handleLateFeeChange}
                />
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    ),
    3: (
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
                  onChange={handleDisbursementChange}
                />
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    ),
  }

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
    console.log(updatedArray)
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
            open={isOpen[index]}
            className="space-y-2"
          >
            <CollapsibleTrigger>
            <Card className="flex items-center justify-center p-[3px]" onClick={() => updateElement(index)}>
              <CardTitle>{eventTypesMap[event.eventType]}</CardTitle>
            </Card>
            </CollapsibleTrigger>
            <CollapsibleContent className="w-[120px] space-y-2">
            {componentMap[event.eventType]}
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
    <Button className="mb-3">Republish</Button>
    </>
  );
};
