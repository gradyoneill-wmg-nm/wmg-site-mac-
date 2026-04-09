'use client';
import { useState } from 'react';

export default function CitationChecker() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<{ passed: boolean; missing: string[] } | null>(null);

  const runCheck = () => {
    if (!input.trim()) return;

    const missing: string[] = [];

    // Check for a year (4 digits)
    if (!/\b(19|20)\d{2}\b/.test(input)) {
      missing.push('year');
    }

    // Check for a journal-like word (common journal terms)
    const journalPatterns = /\b(journal|jrsm|pnas|nature|lancet|bmj|plos|frontiers|annals|archives|review|medicine|biology|science|cell|neuroscience|psychology|acta|biophysics)\b/i;
    if (!journalPatterns.test(input)) {
      missing.push('journal');
    }

    // Check for researcher name pattern (word followed by "et al" or ending in comma)
    if (!/\b[A-Z][a-z]+\s*(et\s*al|&|,)/i.test(input)) {
      missing.push('researcher name');
    }

    // Check for sample size (N= followed by number or word)
    if (!/N\s*=\s*\w+/i.test(input)) {
      missing.push('sample size (N=)');
    }

    setResult({ passed: missing.length === 0, missing });
  };

  return (
    <div style={{ marginTop: 32 }}>
      <p style={{ fontFamily: 'var(--font-space-mono)', fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#4CBB17', marginBottom: 12 }}>
        INTERACTIVE DEMO
      </p>
      <p style={{ color: '#888', fontSize: 14, marginBottom: 16 }}>
        Type a wellness claim citation below and run it through the WMG Standard.
      </p>
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <input
          type="text"
          value={input}
          onChange={(e) => { setInput(e.target.value); setResult(null); }}
          placeholder="e.g. Kox et al., PNAS, 2014 · N=24"
          style={{
            flex: 1,
            background: '#0C0C0A',
            border: '1px solid #1a1a18',
            padding: '10px 14px',
            fontSize: 13,
            color: '#fff',
            fontFamily: 'var(--font-space-mono)',
            outline: 'none',
          }}
        />
        <button
          onClick={runCheck}
          style={{
            background: '#4CBB17',
            color: '#0C0C0A',
            padding: '10px 20px',
            fontFamily: 'var(--font-space-mono)',
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            border: 'none',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
          }}
        >
          Run Through WMG Standard
        </button>
      </div>

      {result && (
        <div style={{
          background: result.passed ? 'rgba(76,187,23,0.1)' : 'rgba(255,68,68,0.1)',
          border: `1px solid ${result.passed ? '#4CBB17' : '#ff4444'}`,
          padding: '16px 20px',
        }}>
          <div style={{
            fontFamily: 'var(--font-space-mono)',
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.2em',
            color: result.passed ? '#4CBB17' : '#ff4444',
            marginBottom: result.passed ? 0 : 8,
          }}>
            {result.passed ? '✓ PASSED' : '✗ FAILED'}
          </div>
          {!result.passed && (
            <p style={{
              fontFamily: 'var(--font-space-mono)',
              fontSize: 11,
              color: '#888',
            }}>
              Missing: {result.missing.join(', ')}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
