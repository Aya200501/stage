import { Link } from "react-router-dom";
import LogoShape from "@/assets/icons/logo-shape.svg?react";
import LogoName from "@/assets/icons/logo-name.svg?react";

export function Logo() {
  return (
    <Link to="/" className="flex items-center">
      <div className="w-16   shrink-0 ">
        <LogoShape className="w-4/5 mx-auto  fill-current" />
      </div>
      <LogoName className="fill-current" />
    </Link>
  );
}
