interface ExplanationProps {
  title: string;
  description: string;
  Icon: React.ReactNode;
}

export default function Explanation({
  title,
  description,
  Icon,
}: ExplanationProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex items-center gap-2">
        {Icon}
        <label className="text-body1">{title}</label>
      </div>
      <p className="text-h3">{description}</p>
    </div>
  );
}
