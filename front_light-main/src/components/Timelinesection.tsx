interface TimelineSectionProps {
  title: string;
  index: number;
  isLast?: boolean;
  description: string;
  isActive?: boolean;
}

export const Timelinesection = ({
  title,
  index,
  description,
  isLast = false,
  isActive = false,
}: TimelineSectionProps) => {
  return (
    <div className="relative flex cursor-pointer gap-4">
      <div
        data-state={isActive ? "active" : "inactive"}
        className="flex h-full flex-col group"
      >
        {!isLast && (
          <div className="absolute left-[0.7rem] top-6 h-full w-0.5 group-data-[state=active]:bg-[#D22627] bg-[#F5F7FA]" />
        )}
        <span className="flex size-6 items-center justify-center rounded-full text-sm bg-[#F5F7FA] text-[#4D4D4D] group-data-[state=active]:bg-[#D22627] group-data-[state=active]:text-[#F5F7FA]">
          {index}
        </span>
      </div>
      <div className="flex flex-col gap-1 pb-10 text-sm font-medium">
        <h2>{title}</h2>
        <p className="text-xs w-24 font-medium text-[#89939E]">{description}</p>
      </div>
    </div>
  );
};
