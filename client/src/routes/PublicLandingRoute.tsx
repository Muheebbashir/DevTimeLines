import { Navigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

interface Props {
  children: React.ReactNode;
}

export default function PublicLandingRoute({ children }: Props) {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (isSignedIn) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}