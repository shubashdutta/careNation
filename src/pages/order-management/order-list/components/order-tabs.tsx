import useFilter from "@/hooks/use-fIlter";
import type { IOrder } from "../type";

const TABS: { label: string; value: string }[] = [
  { label: "All Order", value: "" },
  { label: "New Order", value: "New Order" },
  { label: "Accepted Order", value: "Accept Order" },
  { label: "Sent Warehouse", value: "Sent Warehouse" },
];

const OrderTabs = ({ orders }: { orders: IOrder[] }) => {
  const { status, updateSearchParams } = useFilter();

  const countFor = (value: string) =>
    value === ""
      ? orders.length
      : orders.filter((order) => order.status === value).length;

  return (
    <div className="flex flex-wrap items-center gap-1 rounded-xl border border-tertiary-75 bg-white p-1.5">
      {TABS.map((tab) => {
        const active = status === tab.value;
        return (
          <button
            key={tab.label}
            type="button"
            onClick={() => updateSearchParams({ status: tab.value })}
            className={`flex cursor-pointer items-center gap-2 rounded-lg px-3 py-1.5 text-sm transition-colors ${
              active
                ? "bg-primary-500 text-white"
                : "text-tertiary-300 hover:text-tertiary-100"
            }`}
          >
            {tab.label}
            <span
              className={`rounded-full px-1.5 py-0.5 text-xs ${
                active
                  ? "bg-white/20 text-white"
                  : "bg-gray-100 text-tertiary-300"
              }`}
            >
              {countFor(tab.value)}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default OrderTabs;
