import AuthContainer from "@/app/components/auth/AuthContainer";

// Remove Navbar, Footer, and Chatbot for this page by using a full-height container
export default function AuthPage() {
  return (
    <div className="min-h-screen">
      <AuthContainer />
    </div>
  );
}
