export const Unauthorized = () => {
  return (
    <main className="flex flex-col items-center justify-center gap-5 ">
      <img
        src="/icons/unauthorized.svg"
        alt="403 Unauthorized"
        className="size-[clamp(15rem,40vw,30rem)] object-contain"
      />
      <h1 className="text-[clamp(1.25rem,1.5vw,1.5rem)] font-bold text-center px-6">
        You don’t have permission to access on this service
      </h1>
    </main>
  );
};
