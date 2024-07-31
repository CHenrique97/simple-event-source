import useStore from "../store/useStore";
import {
    Card,
    CardContent,
    CardHeader,
  } from "@/components/ui/card"
  import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils";



const Snapshot: React.FC = () => {
    const principal = useStore((state) => state.principal);
    const interest = useStore((state) => state.interest);
    const lateFee = useStore((state) => state.lateFee);
  

    
    return (
<Card className={cn("w-[380px]")}>
      <CardHeader>
      </CardHeader>
      <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Principal</Label>
              <p className="text-sm font-medium leading-none">
              {principal}
            </p>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Interest</Label>
              <p className="text-sm font-medium leading-none">
              {interest}
            </p>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Late Fee</Label>
              <p className="text-sm font-medium leading-none">
              {lateFee}
            </p>
            </div>

          </div>
      </CardContent>
    </Card>
    );
  }

  export default Snapshot