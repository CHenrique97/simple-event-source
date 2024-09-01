import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "./components/ui/button";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"; // Adjust import based on your project structure
import useStore from './store/useStore';
import { EventType, EventState } from './store/useStore';
import { useState } from "react";

import { v4 as randomUUID } from "uuid";
import { cn } from "./lib/utils";

interface HoverButtonProps {
  isActive: () => boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const HoverButton: React.FC<HoverButtonProps> = ({ isActive, onClick, children }) => {
  const active = isActive();

  return (
    <Button
      onClick={active ? onClick : undefined}
      className={cn(
        "transition-colors duration-200",
        active ? "hover:bg-blue-500" : "bg-gray-400 hover:bg-gray-500 cursor-not-allowed"
      )}
      disabled={!active}
    >
      {children}
    </Button>
  );
};


export const EventTypes = () => {

  const [principal, setPrincipal] = useState(0);
  const [interest, setInterest] = useState(0);
  const [lateInterest, setLateInterest] = useState(0);
  const [lateFee, setLateFee] = useState(0);
  const [disbursement, setDisbursement] = useState(0);

  const appendEvent = useStore((state) => state.appendEvent);
  const  eventList = useStore((state) => state.eventList)

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


  const  addEvent = (eventState: EventState) => {
    appendEvent(eventState);
  }

  return (
    <div className="flex justify-center pb-10 overflow" id="my-first-step">
      {/* Init Loan Card */}
      <Card className="w-[180px] h-[250px] mr-4 ml-2 flex flex-col items-center" id="my-second-step">
        <CardHeader className="flex items-center">
          <CardTitle>Init loan</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5 items-center">
                <Label htmlFor="principal">Principal</Label>
                <Input id="principal" className="text-center" placeholder="$ 100 " onChange={handlePrincipalChange} />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <HoverButton
                  isActive={() => eventList.length === 0}
                  onClick={() =>
                    addEvent({
                      eventType: EventType.initLoan,
                      eventId: randomUUID(),
                      principal: principal,
                      interest: 0,
                      lateInterest: 0,
                      lateFee: 0,
                      disbursement: 0,
                    })
                  }
                >
                  Add
                </HoverButton>
              </TooltipTrigger>
              <TooltipContent>
                <p>Add to library</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardFooter>
      </Card>

      {/* Accrual Card */}
      <Card className="w-[180px] h-[250px] mr-4 flex flex-col items-center">
        <CardHeader className="flex items-center">
          <CardTitle>Accrual</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5 items-center">
                <Label htmlFor="Interest">Interest</Label>
                <Input id="Interest" className="text-center" placeholder="% 10 " onChange={handleInterestChange} />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <HoverButton
                  isActive={() =>
                    eventList.length === 0
                      ? false
                      : eventList[eventList.length - 1].eventType === EventType.initLoan ||
                        eventList[eventList.length - 1].eventType === EventType.payment
                  }
                  onClick={() =>
                    addEvent({
                      eventType: EventType.accrual,
                      eventId: randomUUID(),
                      principal: 0,
                      interest: interest,
                      lateInterest: 0,
                      lateFee: 0,
                      disbursement: 0,
                    })
                  }
                >
                  Add
                </HoverButton>
              </TooltipTrigger>
              <TooltipContent>
                <p>Add to library</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardFooter>
      </Card>

      {/* Deliquency Card */}
      <Card className="w-[180px] h-[250px] mr-4 flex flex-col items-center">
        <CardHeader className="flex items-center">
          <CardTitle>Deliquency</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1 items-center">
                <Label htmlFor="lateInterest">Late interest</Label>
                <Input id="lateInterest" className="text-center" placeholder="% 20 " onChange={handleLateInterestChange} />
                <Label htmlFor="lateFee">Late fee</Label>
                <Input id="lateFee" className="text-center" placeholder="$ 10 " onChange={handleLateFeeChange} />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="-mt-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <HoverButton
                  isActive={() =>
                    eventList.length === 0
                      ? false
                      : eventList[eventList.length - 1].eventType === EventType.accrual ||
                        eventList[eventList.length - 1].eventType === EventType.deliquency
                  }
                  onClick={() =>
                    addEvent({
                      eventType: EventType.deliquency,
                      eventId: randomUUID(),
                      principal: 0,
                      interest: 0,
                      lateInterest: lateInterest,
                      lateFee: lateFee,
                      disbursement: 0,
                    })
                  }
                >
                  Add
                </HoverButton>
              </TooltipTrigger>
              <TooltipContent>
                <p>Add to library</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardFooter>
      </Card>

      {/* Payment Card */}
      <Card className="w-[180px] h-[250px] mr-4 flex flex-col items-center">
        <CardHeader className="flex items-center">
          <CardTitle>Payment</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5 items-center">
                <Label htmlFor="disbursement">Amount</Label>
                <Input id="disbursement" className="text-center" placeholder="$ 100 " onChange={handleDisbursementChange} />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <HoverButton
                  isActive={() => (eventList.length === 0 ? false : eventList.length > 0)}
                  onClick={() =>
                    addEvent({
                      eventType: EventType.payment,
                      eventId: randomUUID(),
                      principal: 0,
                      interest: 0,
                      lateInterest: 0,
                      lateFee: 0,
                      disbursement: disbursement,
                    })
                  }
                >
                  Add
                </HoverButton>
              </TooltipTrigger>
              <TooltipContent>
                <p>Add to library</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardFooter>
      </Card>
    </div>
  );
};