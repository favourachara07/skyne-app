import Chatbot from "../components/common/Chatbot";
import Footer from "../components/common/Footer";
import Navbar from "../components/common/Navbar";

interface PageLayoutProps {
  children: React.ReactNode;
  showChatbot?: boolean;
}

const PageLayout = ({ children, showChatbot = true }: PageLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      {/* Main content area - adjust top/bottom padding based on Navbar position */}
      <main className="flex-1 pb-24 md:pt-20 md:pb-10  max-w-7xl  w-full">
        {children}
      </main>

      <Footer />

      {/* Chatbot component */}
      {showChatbot && <Chatbot />}
    </div>
  );
};

export default PageLayout;
