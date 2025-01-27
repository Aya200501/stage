interface AlertScreenshotProps {
  src: string;
}

export const AlertScreenshot = ({ src }: AlertScreenshotProps) => {
  return (
    <img
      src={src}
      alt="screenshot"
      className="w-full h-72 object-fill rounded-md"
    />
  );
};
