import { Pencil2Icon } from "@radix-ui/react-icons";
import { BlocksIcon, DollarSign, Users } from "lucide-react";
import StatCard from "./stats-cards";

export default function Stats() {
  const stats = [
    {
      title: "Active Contracts",
      value: "4",
      icons: <BlocksIcon />,
    },
    { title: "Draft Contracts", value: "2", icons: <Pencil2Icon /> },
    {
      title: "Total Revenue",
      value: "$45,231.89",
      icons: <DollarSign />,
    },
    { title: "Transactions", value: "+2350", icons: <Users /> },
  ];
  return (
    <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <StatCard
          key={index}
          title={stat.title}
          icon={stat.icons}
          value={stat.value}
        />
      ))}
    </div>
  );
}
