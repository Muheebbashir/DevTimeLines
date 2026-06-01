import {useSyncUser} from "../hooks/useSyncUser"
import { UserButton } from "@clerk/clerk-react";

export default function DashboardPage() {
  useSyncUser();
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to Ascend.</p>
      <UserButton/>
    </div>
  );
}