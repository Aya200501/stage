export const NotFound = () => {
  return (
    <main className="flex flex-col items-center justify-center gap-2 bg-background dark text-foreground">
      <img
        src="/icons/not-found.svg"
        alt="404 Not Found"
        className="size-[clamp(20rem,45vw,35rem)] object-contain"
      />
      <h1 className="text-[clamp(1.25rem,1.5vw,1.5rem)] font-bold text-center px-6">
        The Page You Requested Could Not Be Found.
      </h1>
    </main>
  );
};
