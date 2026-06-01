import { Link } from "react-router-dom";
import { SignedIn, SignedOut } from "@clerk/clerk-react";

export default function LandingPage() {
  return (
    <div>
      <h1>Ascend</h1>
      <p>Track your growth journey.</p>
      <SignedOut>
        <Link to="/sign-in">Sign In</Link>
        <Link to="/sign-up">Get Started</Link>
      </SignedOut>
      <SignedIn>
        <Link to="/dashboard">Go to Dashboard</Link>
      </SignedIn>
    </div>
  );
}