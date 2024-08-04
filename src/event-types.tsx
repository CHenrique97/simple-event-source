import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DraggableCard } from "./card/cards";
export const EventTypes = () => {
  return (
    <div className="flex justify-center pb-10 overflow">
      <DraggableCard>
      <Card className="w-[180px] h-[250px] mr-4 ml-2">
        <CardHeader className="flex  items-center" >
          <CardTitle className="">Init loan </CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5 items-center">
                <Label htmlFor="name"> Principal </Label>
                <Input id="name" placeholder="           $ 100 " />
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      </DraggableCard>
      <DraggableCard>
      <Card className="w-[180px] h-[250px] mr-4">
      <CardHeader className="flex  items-center" >
          <CardTitle >Accrual</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5 items-center">
                <Label htmlFor="name"> Interest </Label>
                <Input id="name" placeholder="           % 10 " />
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      </DraggableCard>
      <DraggableCard>
      <Card className="w-[180px] h-[250px] mr-4">
      <CardHeader className="flex  items-center" >
          <CardTitle>Deliquency </CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5 items-center">
                <Label htmlFor="name"> Late interest </Label>
                <Input id="name" placeholder="           % 20 " />
                <Label htmlFor="name"> Late fee </Label>
                <Input id="name" placeholder="           $ 10 " />
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      </DraggableCard>
      <DraggableCard>
      <Card className="w-[180px] h-[250px] mr-4">
      <CardHeader className="flex  items-center" >
          <CardTitle>Payment</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5 items-center">
                <Label htmlFor="name"> Amount </Label>
                <Input id="name" placeholder="           $ 100 " />
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      </DraggableCard>
    </div>
  );
};
