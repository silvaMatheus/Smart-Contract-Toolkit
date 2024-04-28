import Image from "next/image";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";

export default function News() {
  const news = [
    {
      img: "",
      title: "  New Office Opening in San Francisc",
      subtitle:
        "We're excited to expand our presence and serve our customers better.",
    },
    {
      img: "",
      title: "  New Office Opening in San Francisc",
      subtitle:
        "We're excited to expand our presence and serve our customers better.",
    },
    {
      img: "",
      title: "  New Office Opening in San Francisc",
      subtitle:
        "We're excited to expand our presence and serve our customers better.",
    },
  ];

  return (
    <Card x-chunk="dashboard-01-chunk-5">
      <CardHeader>
        <CardTitle>News</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-8">
        {news.map((item, index) => (
          <div key={index}>
            <div className="flex items-center gap-4">
              <Image
                alt="Product image"
                className="aspect-square w-35 rounded-md object-cover"
                height="35"
                src="/placeholder.svg"
                width="84"
              />
              <div className="space-y-3">
                <p className="text-sm font-medium leading-none">{item.title}</p>

                <p className="text-sm text-muted-foreground">{item.subtitle}</p>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
