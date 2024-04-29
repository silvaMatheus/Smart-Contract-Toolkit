import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import SmartContractInteract from "../smart-contract-modal";

export function SheetInteractContract() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Interact with contract</Button>
      </SheetTrigger>
      <SheetContent side={"left"} className="w-full sm:w-4/12">
        <SmartContractInteract />
      </SheetContent>
    </Sheet>
  );
}
