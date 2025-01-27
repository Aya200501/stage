import React from "react";
import { Button } from "@/components/ui/button";
import UserIcon from "@/assets/icons/UserIcon.svg?react";
import PasswordIcon from "@/assets/icons/passwordIcon.svg?react";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { useGlobalContext } from "@/Context";

import { Input, InputProps } from "@/components/ui/input";

interface LoginFormInputProps extends InputProps {
  label: string;
  Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
}

export const FormInput = ({ label, Icon, ...props }: LoginFormInputProps) => {
  return (
    <div className="flex w-full flex-col items-start justify-start gap-2 text-xs font-medium text-white lg:text-[#89939E]">
      {label}
      <div className="flex w-full relative items-center gap-2.5 rounded-[0.625rem] border-0  text-xs ring-2 ring-[#89939E] focus-within:text-[#D22627] focus-within:ring-[#D22627]">
        <Icon className="size-6 absolute left-2 bottom-1/2 translate-y-1/2" />
        <Input
          {...props}
          className="w-full border-0 bg-transparent pl-10 pr-4 py-6 text-xs text-[#89939E] outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </div>
    </div>
  );
};

export const LoginForm = () => {
  const { backendApi, setAccessToken, setRefreshToken, setUser } =
    useGlobalContext();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const { accessToken, refreshToken, user } = await backendApi.login({
        email,
        password,
      });
      toast.success("success");
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      setUser(user);
    } catch (error) {
      toast.error("error");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative flex shrink-0 flex-col items-center justify-start gap-6  px-4 w-[35rem] max-w-full"
    >
      <div className="text-md lg:text-2xl text-primary font-semibold">
        So connecter
      </div>
      <FormInput type="email" name="email" label="Email" Icon={UserIcon} />
      <div className="flex w-full flex-col items-start justify-start gap-2">
        <FormInput
          name="password"
          type="password"
          label="Mot de passe"
          Icon={PasswordIcon}
        />
        <Link
          to="/resetPassword"
          className="flex w-full items-center justify-end text-sm font-medium text-gray-300 focus-visible:outline-none"
        >
          Mot de passe oublié ?
        </Link>
      </div>
      <Button className="h-12 w-full bg-[#D22627]  font-semibold text-white hover:bg-[#D22627]/80">
        Se connecter
      </Button>
    </form>
  );
};
