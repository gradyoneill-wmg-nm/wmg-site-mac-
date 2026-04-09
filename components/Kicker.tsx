interface KickerProps {
  text: string;
}

export default function Kicker({ text }: KickerProps) {
  return (
    <span className="kicker">{text}</span>
  );
}
