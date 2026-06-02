import { useMe } from "../hooks/useMe";
import CreateTimelineForm from "../components/CreateTimelineForm";
import TimelineFeed from "../components/TimelineFeed";

export default function Dashboard() {
  const { data, loading } = useMe();

  if (loading) return <div>Loading...</div>;

 return (
  <div className="container mx-auto py-8 px-4">
    <h1 className="text-3xl font-bold">
      Welcome {data?.displayName}
    </h1>

    <p>Streak: {data?.streak}</p>
    <p>Growth: {data?.growthScore}</p>

    <div className="mt-8">
      <CreateTimelineForm />
    </div>

    <div className="mt-8">
      <TimelineFeed />
    </div>
  </div>
);
}
