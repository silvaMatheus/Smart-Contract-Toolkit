import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import useLoadAndHandleContract from "@/hooks/useLoadContract";

import { ContractFunctionProps } from "@/types/contracts.types";
import { ReloadIcon } from "@radix-ui/react-icons";
import { AlertTriangle, Check } from "lucide-react";
import { useRef, useState } from "react";

export default function FunctionCard({
  func,
}: {
  func: ContractFunctionProps;
}) {
  const inputRefs = useRef<{ [key: string]: HTMLInputElement }>({});
  const [customGas, setCustomGas] = useState("");
  const [showGasInput, setShowGasInput] = useState(false);
  const {
    handleFunctionCall,
    isRunningFunction,
    feedback,
    result,
    hasRunFunction,
  } = useLoadAndHandleContract();

  return (
    <AccordionItem value={func.name} className="rounded-sm border shadow px-5">
      <AccordionTrigger className="flex p-0">
        <CardHeader className="py-5 px-0 items-start flex flex-col w-full gap-2">
          <div className="flex space-x-3 items-center">
            <CardTitle>{func.name}</CardTitle>
            <Badge
              variant={
                func.stateMutability === "view" ? "secondary" : "default"
              }
            >
              {func.stateMutability}
            </Badge>
          </div>

          <CardDescription className="flex  w-full">
            {func.inputs.length > 0 && "Inputs: "}
            {func.inputs
              .map(
                (input) =>
                  `${input.name} (${input.type}, ${input.internalType})`
              )
              .join(", ")}
          </CardDescription>

          <CardDescription className="flex  w-full">
            {func.outputs.length > 0 && "Outputs: "}
            {func.outputs
              .map((output) => `${output.type} (${output.internalType})`)
              .join(", ")}
          </CardDescription>
        </CardHeader>
      </AccordionTrigger>
      <AccordionContent className="flex flex-col space-y-5">
        <Separator />
        <>
          {func.inputs.map((input, index) => (
            <div key={index} className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Label className="capitalize">{input.name}</Label>
                <Input
                  ref={(el) => {
                    if (el && inputRefs.current)
                      inputRefs.current[input.name] = el;
                  }}
                  type="text"
                  placeholder={`Enter ${input.name}`}
                  className="border rounded-md px-2 py-1"
                />
              </div>
              <span className="text-xs text-gray-500">
                {input.type} ({input.internalType})
              </span>
            </div>
          ))}
          <div className="flex items-center gap-2">
            <Label htmlFor="showCustomGasInput">Show Custom Gas Input:</Label>
            <input
              id="showCustomGasInput"
              type="checkbox"
              checked={showGasInput}
              onChange={(e) => setShowGasInput(e.target.checked)}
              className="border rounded-md px-2 py-1"
            />
          </div>
          {showGasInput && (
            <div className="flex items-center gap-2">
              <Label>Custom Gas Limit:</Label>
              <Input
                type="number"
                placeholder="Enter custom gas limit"
                value={customGas}
                onChange={(e) => setCustomGas(e.target.value)}
                className="border rounded-md px-2 py-1"
              />
            </div>
          )}
          {hasRunFunction && (
            <Alert
              variant={
                feedback.startsWith("Error:") ? "destructive" : "default"
              }
            >
              <AlertTitle className="flex gap-3 items-center">
                {feedback.startsWith("Error:") ? (
                  <>
                    <AlertTriangle />
                    <span>Error</span>
                  </>
                ) : (
                  <>
                    <Check />
                    <span> Success</span>
                  </>
                )}
              </AlertTitle>
              <AlertDescription>{feedback}</AlertDescription>
              <AlertDescription>{result}</AlertDescription>
            </Alert>
          )}
          <Button
            disabled={isRunningFunction}
            onClick={() =>
              handleFunctionCall(
                func,
                func.inputs.map((input) =>
                  inputRefs.current ? inputRefs.current[input.name].value : ""
                )
              )
            }
          >
            {isRunningFunction && (
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            )}
            {func.stateMutability === "view" ? "Read" : "Write"}
          </Button>
        </>
      </AccordionContent>
    </AccordionItem>
  );
}
