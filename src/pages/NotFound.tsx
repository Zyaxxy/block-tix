
import { MainLayout } from "@/components/layout/main-layout";
import { Button } from "@/components/ui/button";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[70vh] ticket-summary">
        <div className="max-w-md w-full text-center space-y-6">
          <h1 className="text-8xl font-bold text-gradient page-heading font-serif">404</h1>
          <h2 className="text-3xl font-semibold page-heading font-serif">Page Not Found</h2>
          <p className="text-muted-foreground font-serif">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="pt-4">
            <Button asChild>
              <Link to="/">Return to Home</Link>
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
