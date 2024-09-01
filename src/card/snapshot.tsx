import useStore, { EventType, EventState } from "../store/useStore";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useEffect } from "react";
import { motion } from "framer-motion";

interface AnimatedValueProps {
  value: number;
}

const AnimatedValue: React.FC<AnimatedValueProps> = ({ value }) => (
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
const calculations = (eventList: EventState[]) => {
  const {principal, interest, lateFee, setPrincipal, setInterest, setLateFee } = useStore.getState();

  if (eventList.length === 0) {
    return;
  }

  const lastEvent: EventState = eventList[eventList.length - 1];

  switch (lastEvent.eventType) {
    case EventType.initLoan:
      if (lastEvent.principal !== null) setPrincipal(lastEvent.principal);
     break;

    case EventType.accrual:
      if (lastEvent.interest !== null) {
        const interestTotal :number  =( (lastEvent.interest/100) * principal) + interest
        
        setInterest(interestTotal)}

      break;

    case EventType.deliquency:
      if (lastEvent.lateFee !== null) {
        setLateFee(lateFee + lastEvent.lateFee)
      const lateInterestTotal: number = (lastEvent.lateInterest || 0  * principal) + interest;
      setInterest(lateInterestTotal)}
      // Perform delinquency-specific actions here
      break;

    case EventType.payment:
      if (lastEvent.disbursement !== null) {
        let remainingDisbursement = lastEvent.disbursement;

        // Deduct from late fee first
        if (lateFee > 0) {
          const lateFeeDeduction = Math.min(remainingDisbursement, lateFee);
          setLateFee(lateFee - lateFeeDeduction);
          remainingDisbursement -= lateFeeDeduction;
        }

        // Deduct from interest second
        if (remainingDisbursement > 0 && interest > 0) {
          const interestDeduction = Math.min(remainingDisbursement, interest);
          setInterest(interest - interestDeduction);
          remainingDisbursement -= interestDeduction;
        }

        // Deduct from principal last
        if (remainingDisbursement > 0 && principal > 0) {
          const principalDeduction = Math.min(remainingDisbursement, principal);
          setPrincipal(principal - principalDeduction);
          remainingDisbursement -= principalDeduction;
        }
      }
      break

    default:
      {}
  }
};

const Snapshot: React.FC = () => {
  const principal = useStore((state) => state.principal);
  const interest = useStore((state) => state.interest);
  const lateFee = useStore((state) => state.lateFee);
  const eventList = useStore((state) => state.eventList);

  useEffect(() => {
    calculations(eventList);
  }, [eventList.length]);

  return (
    <Card className={cn("w-[300px]")} id="snapshot">
      <CardContent>
        <div className="flex flex-col items-center justify-center gap-10">
          <div className="flex flex-row space-x-1.5 mt-8">
          <CardTitle>Principal:</CardTitle>
            <CardTitle>
              <AnimatedValue value={Number(principal.toFixed(2))} />
            </CardTitle>
          </div>
          <div className="flex flex-row space-x-4">
            <CardTitle>Interest:</CardTitle>
            <CardTitle>
              <AnimatedValue value={Number(interest.toFixed(2))} />
            </CardTitle>
          </div>
          <div className="flex flex-row space-x-2.5">
            <CardTitle>Late Fee:</CardTitle>
            <CardTitle>
              <AnimatedValue value={Number(lateFee.toFixed(2))} />
            </CardTitle>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Snapshot;
