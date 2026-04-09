interface PullQuoteProps {
  quote: string;
  citation?: string;
}

export default function PullQuote({ quote, citation }: PullQuoteProps) {
  return (
    <div className="pull-quote">
      <span className="quote-mark" aria-hidden="true">&ldquo;</span>
      <p className="quote-text">{quote}</p>
      {citation && <p className="quote-cite">&mdash; {citation}</p>}
    </div>
  );
}
