import { UserButton } from "@clerk/clerk-react";

export default function DashboardPage() {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to Ascend.</p>
      <UserButton/>
    </div>
  );
}