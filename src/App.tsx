import { useState } from 'react';
import type { Page } from './types';
import './App.css';

const seed: Page[] = [
  {
    id: crypto.randomUUID(),
    type: 'text',
    content: 'Welcome to the dynamic book. Use Next/Previous buttons to navigate.',
    createdAt: Date.now(),
  },
  {
    id: crypto.randomUUID(),
    type: 'image',
    content: 'https://avatars.githubusercontent.com/u/85584595?v=4',
    createdAt: Date.now(),
  },
];

function App() {
  const [pages] = useState<Page[]>(seed);
  const [index, setIndex] = useState(0);

  const current = pages[index];
  const total = pages.length;

  return (
    <div style={{ maxWidth: 720, margin: '2rem auto', padding: '0 1rem' }}>
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h1>My Book</h1>
        <div>{index + 1} / {total}</div>
      </header>

      <main style={{ minHeight: 320, padding: '1rem 0' }}>
        {current?.type === 'text' ? (
          <p style={{ whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>{current.content}</p>
        ) : current?.type === 'image' ? (
          <img src={current.content} style={{ maxWidth: '100%', borderRadius: 8 }} />
        ) : (
          <p>No pages.</p>
        )}
      </main>

      <nav style={{ display: 'flex', gap: 8, justifyContent: 'space-between' }}>
        <button
          onClick={() => setIndex(i => Math.max(0, i - 1))}
          disabled={index === 0}
        >
          ← Previous
        </button>
        <button
          onClick={() => setIndex(i => Math.min(total - 1, i + 1))}
          disabled={index >= total - 1}
        >
          Next →
        </button>
      </nav>
    </div>
  );
}

export default App;
