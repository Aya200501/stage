import React from "react";
import { Button } from "@/components/ui/button";
import UserIcon from "@/assets/icons/UserIcon.svg?react";
import PasswordIcon from "@/assets/icons/UserIcon.svg?react";
import { toast } from "sonner";
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
      <div className="flex w-full items-center gap-2.5 rounded-[0.625rem] border-0 px-3.5 py-1.5 text-xs ring-2 ring-[#89939E] focus-within:text-[#D22627] focus-within:ring-[#D22627]">
        <Icon className="fill-current" />
        <Input
          {...props}
          className="h-9 w-full border-0 bg-transparent p-0 text-xs text-[#89939E] outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </div>
    </div>
  );
};

export const RegisterForm = ({ toggleView }: { toggleView: () => void }) => {
  const { backendApi, setUser, setAccessToken, setRefreshToken } =
    useGlobalContext();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const fullName = formData.get("fullName") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const result = await backendApi.signup({ fullName, email, password });
      toast.success("success");
      setAccessToken(result.accessToken);
      setRefreshToken(result.refreshToken);
      setUser(result.user);
    } catch (error) {
      toast.error("error");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative flex shrink-0 flex-col items-center justify-start gap-5 self-stretch px-2"
    >
      <div className="text-lg font-semibold text-[#F5F7FA]">CONNEXION</div>
      <FormInput name="fullName" label="Full Name" Icon={UserIcon} />
      <FormInput type="email" name="email" label="email" Icon={UserIcon} />
      <div className="flex w-full flex-col items-start justify-start gap-2">
        <FormInput
          name="password"
          type="password"
          label="Mot de passe"
          Icon={PasswordIcon}
        />
      </div>
      <Button className="h-12 w-full bg-[#D22627] text-sm font-semibold text-white hover:bg-[#D22627]/80">
        S&lsquo;inscrire
      </Button>
      <Button
        variant="link"
        className="h-0 focus-visible:underline focus-visible:ring-0 focus-visible:ring-offset-0"
        onClick={toggleView}
      >
        Se connecter
      </Button>
    </form>
  );
};
