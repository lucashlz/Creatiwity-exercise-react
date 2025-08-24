import { useState } from 'react';
import type { Page } from './types';
import './App.css';
import { useLocalStorage } from './hooks/useLocalStorage';
import AddPageModal from './components/AddPageModal';

const seed: Page[] = [
  {
    id: crypto.randomUUID(),
    type: 'text',
    content: 'Welcome to the creatiwity book. Use the Next/Previous buttons to navigate.',
    createdAt: Date.now(),
  }
];

const STORAGE_KEY = 'book-pages';

function App() {
  const [pages, setPages] = useLocalStorage<Page[]>(STORAGE_KEY, seed);

  const [index, setIndex] = useState(0);
  const [addOpen, setAddOpen] = useState(false);

  const current = pages[index];
  const total = pages.length;

  function handleAdd(data: { type: Page['type']; content: string }) {
    const newPage: Page = {
      id: crypto.randomUUID(),
      type: data.type,
      content: data.content,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    const next = [...pages, newPage];
    setPages(next);
    setIndex(next.length - 1);
  }

  function handleReset() {
    setPages(seed);
    setIndex(0);
  }

  return (
    <>
      <img src="/creatiwity-logo.svg" alt="Creatiwity Logo" className="creatiwity-logo-fixed" />
      
      <div className="container">
        <header className="header-row">
          <h1>The Creatiwity Book</h1>
          <div className="counter">
            <div>{Math.min(index + 1, Math.max(total, 1))} / {total || 1}</div>
            <button className="btn" onClick={handleReset} title="Reset to demo pages">Reset</button>
          </div>
        </header>

      <main className="card">
        {current?.type === 'text' ? (
          <p className="content-text">{current.content}</p>
        ) : current?.type === 'image' ? (
          <img src={current.content} className="content-image" alt="Page content" />
        ) : (
          <p className="no-content">No pages.</p>
        )}
      </main>

      <nav className="nav-row">
        <button className="btn" onClick={() => setIndex(i => Math.max(0, i - 1))} disabled={index === 0}>
          ← Previous
        </button>
  
        <button className="btn" onClick={() => setIndex(i => Math.min(total - 1, i + 1))} disabled={index >= total - 1}>
          Next →
          </button>
      </nav>

      <button
        className="fab"
        onClick={() => setAddOpen(true)}
        aria-label="Add page"
        title="Add page"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>


      <AddPageModal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onSubmit={handleAdd}
      />
      </div>
    </>
  );
}

export default App;
