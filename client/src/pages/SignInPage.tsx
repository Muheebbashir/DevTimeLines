import { SignIn } from "@clerk/clerk-react";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <SignIn
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
