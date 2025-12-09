"use client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DirectionProvider } from "@radix-ui/react-direction";
import queryClient from "@/lib/reactQueryClient";

const Providers = ({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: string;
}) => {
  
  return (
    <DirectionProvider dir={locale === "ar" ? "rtl" : "ltr"}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </DirectionProvider>
  );
};

export default Providers;
