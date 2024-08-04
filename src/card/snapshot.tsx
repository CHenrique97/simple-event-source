import useStore from "../store/useStore";
import {
    Card,
    CardContent,
    CardTitle,
  } from "@/components/ui/card"
import { cn } from "@/lib/utils";



const Snapshot: React.FC = () => {
    const principal = useStore((state) => state.principal);
    const interest = useStore((state) => state.interest);
    const lateFee = useStore((state) => state.lateFee);
  

    
    return (
<Card className={cn("w-[300px]")}>
      <CardContent>
          <div className="grid w-full items-center justify-center gap-10">
            <div className="flex flex-row space-x-1.5 mt-8">
              <CardTitle>Principal:</CardTitle>
              <CardTitle>
             $ {principal}
            </CardTitle>
            </div>
            <div className="flex flex-row space-x-4">
              <CardTitle>Interest:</CardTitle>
              <CardTitle>
              $ {interest}
            </CardTitle>
            </div>
            <div className="flex flex-row space-x-2.5">
              <CardTitle>Late Fee: </CardTitle>
              <CardTitle>
              $ {lateFee}
            </CardTitle>
            </div>

          </div>
      </CardContent>
    </Card>
    );
  }

  export default Snapshot