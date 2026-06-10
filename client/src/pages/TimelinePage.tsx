import { useState } from "react";

import DashboardNavbar from "../components/DashboardNavbar";
import TimelineHeader from "../components/TimelineHeader";
import TimelineSearch from "../components/TimelineSearch";
import TimelineStats from "../components/TimelineStats";
import TimelineCategoryFilter from "../components/TimelineCategoryFilter";
import TimelineSort from "../components/TimelineSort";
import TimelineFeed from "../components/TimelineFeed";
import CreateTimelineModal from "../components/CreateTimelineModal";

import { useTimelines } from "../hooks/useTimelines";

export default function TimelinePage() {
  const { data: timelines = [] } = useTimelines();
  const [showCreate, setShowCreate] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("Newest");

  const filteredTimelines = [...timelines]
    .filter((timeline) => {
      const query = search.toLowerCase();

      const matchesSearch =
        timeline.title.toLowerCase().includes(query) ||
        timeline.description.toLowerCase().includes(query) ||
        timeline.category.toLowerCase().includes(query);

      const matchesCategory =
        category === "All" || timeline.category === category;

      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === "Oldest") {
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      }

      if (sortBy === "HighestImpact") {
        return b.impactScore - a.impactScore;
      }

      if (sortBy === "LowestImpact") {
        return a.impactScore - b.impactScore;
      }

      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

  return (
    <>
      <DashboardNavbar />

      <div
        style={{
          background: "#f8f9fb",
          minHeight: "100vh",
        }}
      >
        <TimelineHeader
          totalEntries={filteredTimelines.length}
          onCreate={() => setShowCreate(true)}
        />

        <TimelineSearch search={search} setSearch={setSearch} />

        <TimelineStats total={filteredTimelines.length} />

        <TimelineCategoryFilter category={category} setCategory={setCategory} />

        <TimelineSort sortBy={sortBy} setSortBy={setSortBy} />

        <TimelineFeed timelines={filteredTimelines} />
      </div>
      {showCreate && (
        <CreateTimelineModal onClose={() => setShowCreate(false)} />
      )}
    </>
  );
}
