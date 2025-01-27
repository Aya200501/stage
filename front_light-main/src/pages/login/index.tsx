import { LoginForm } from "./components/login-form";
import Logo from "@/assets/icons/logo-name.svg?react";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { RegisterForm } from "./components/register-form";

const LoginPage = () => {
  return (
    <div className=" dark h-screen w-screen bg-background flex flex-col">
      <div className="w-full h-[4rem] bg-[#191E24] flex items-center justify-center border-white border border-opacity-20">
        <Logo />
      </div>
      <div className=" relative h-full w-full flex items-center justify-center">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
