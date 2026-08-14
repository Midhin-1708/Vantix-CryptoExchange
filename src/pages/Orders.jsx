import SectionHeading from "../components/SectionHeading";
import RecentTransactions from "../components/RecentTransactions";

export default function Orders() {
  return (
    <div className="w-full">
      <SectionHeading
              title="Orders"
        subtitle="Review your recent buys, sells, and their status."
      />

      <div className="px-0">
        <RecentTransactions />
      </div>
    </div>
  );
}