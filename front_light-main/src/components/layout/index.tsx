import React, { useEffect } from "react";
import { cn } from "@/lib/utils";
import { useGlobalContext } from "@/Context";

import { Upbar } from "../upbar";
import { ScrollArea } from "../ui/scroll-area";
export function Layout({ children }: { children: React.ReactNode }) {
  const { theme } = useGlobalContext();

  useEffect(() => {
    document.body.className = cn({
      dark: theme === "dark",
      light: theme === "light",
    });
  }, [theme]);

  return (
    <main
      className={cn(
        theme,
        "bg-background text-foreground transition-colors duration-500 flex flex-col "
      )}
    >
      <Upbar />
      <ScrollArea>
        <main className="p-3 sm:p-4 md:p-6 [&>*]:w-full  lg:gap-6 gap-4 flex flex-col  transition-[padding-left] duration-500 [&>*]:max-w-screen-2xl [&>*]:mx-auto">
          <div className="h-1 flex-1">{children}</div>
        </main>
      </ScrollArea>
    </main>
  );
}

// import { LoginForm } from "./components/login-form";
//
// // import { ScrollArea } from "@/components/ui/scroll-area";
// // import { RegisterForm } from "./components/register-form";

// const LoginPage = () => {
//   return (
//     <div className=" dark h-screen w-screen bg-black flex flex-col">
//       <div className="w-full h-[5rem] bg-[#191E24] flex items-center justify-center">
//         <Logo />
//       </div>
//       <div className=" relative h-full w-full flex items-center justify-center">
//         <LoginForm />
//       </div>
//     </div>
//   );
// };

// export default LoginPage;
