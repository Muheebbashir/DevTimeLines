import { SignUp } from "@clerk/clerk-react";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <SignUp
        forceRedirectUrl="/dashboard"
        appearance={{
          variables: {
            colorPrimary: "#7c3aed",
          },
        }}
      />
    </div>
  );
}
