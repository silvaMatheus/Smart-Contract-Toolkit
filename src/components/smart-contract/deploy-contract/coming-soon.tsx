import { Card, CardContent } from "@/components/ui/card";

export default function ComingSoon() {
  return (
    <div className="-ml-5 -mr-5 absolute inset-0 bg-black/50 z-10 flex justify-center items-center">
      <Card className="w-full max-w-sm p-0">
        <CardContent className="flex flex-col items-center p-8">
          <div className="flex flex-col items-center space-y-5">
            <ClockIcon className="h-12 w-12 text-gray-500" />

            <div className="text-center space-y-5">
              <h3 className="text-sm font-semibold tracking-wide">
                Feature Soon
              </h3>
              <p className="text-sm text-gray-500">
                Advanced contract deployment features will be available in the
                future. Stay tuned for updates!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function ClockIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}
