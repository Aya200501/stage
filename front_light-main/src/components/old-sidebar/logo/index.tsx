import { Link } from "react-router-dom";

export const Logo = () => {
  return (
    <Link
      to="/"
      className="flex w-full items-center gap-2 overflow-hidden pl-0.5"
    >
      <div className="relative min-h-[24px] min-w-[24px]">
        <img
          alt="Logo"
          src="/icons/brain.svg"
          style={{
            objectFit: "cover",
          }}
        />
      </div>
      <div className="relative h-[26px] w-[63px] transition-all duration-500 ease-in-out">
        <img
          alt="Logo"
          src="/icons/dakaAi.svg"
          style={{
            objectFit: "cover",
          }}
        />
      </div>
    </Link>
  );
};
