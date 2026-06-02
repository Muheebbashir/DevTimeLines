import { UserButton } from "@clerk/clerk-react";
import { useMe } from "../hooks/useMe";
import CreateTimelineForm from "../components/CreateTimelineForm";

export default function Dashboard() {
  const { data, loading } = useMe();

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Welcome {data?.displayName}</h1>
      <p>Streak: {data?.streak}</p>
      <p>Growth: {data?.growthScore}</p>
      <CreateTimelineForm />
      <UserButton/>
    </div>
  );
}