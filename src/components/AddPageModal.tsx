import { useEffect, useState } from 'react';
import type { PageType } from '../types';

type FormData = { type: PageType; content: string };

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: FormData) => void;
}

const MAX_TEXT_LENGTH = 1000;

export default function AddPageModal({ open, onClose, onSubmit }: Props) {
  const [type, setType] = useState<PageType>('text');
  const [content, setContent] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setType('text');
      setContent('');
      setError(null);
    }
  }, [open]);

  function validate(): boolean {
    if (!content.trim()) {
      setError(type === 'text' ? 'Please enter text.' : 'Please paste an image URL.');
      return false;
    }
    if (type === 'text' && content.trim().length > MAX_TEXT_LENGTH) {
      setError(`Text is too long. Maximum ${MAX_TEXT_LENGTH} characters allowed.`);
      return false;
    }
    if (type === 'image') {
      try {
        const u = new URL(content.trim());
        if (!['http:', 'https:'].includes(u.protocol)) throw new Error('bad protocol');
      } catch {
        setError('Please provide a valid http(s) URL.');
        return false;
      }
    }
    setError(null);
    return true;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({ type, content: content.trim() });
    onClose();
  }

  if (!open) return null;

  return (
    <div className="modal" role="dialog" aria-modal="true" aria-label="Add a new page">
      <div className="modal__backdrop" onClick={onClose} />
      <div className="modal__panel">
        <h2 className="modal__title">Add a new page</h2>

        <form onSubmit={handleSubmit} className="modal__grid">
          <div className="modal__row">
            <button
              type="button"
              className={`btn ${type === 'text' ? 'btn-primary' : ''}`}
              onClick={() => setType('text')}
              aria-pressed={type === 'text'}
            >
              Text
            </button>
            <button
              type="button"
              className={`btn ${type === 'image' ? 'btn-primary' : ''}`}
              onClick={() => setType('image')}
              aria-pressed={type === 'image'}
            >
              Image URL
            </button>
          </div>

          {type === 'text' ? (
            <label>
              <div style={{ marginBottom: 6, fontWeight: 600, display: 'flex', justifyContent: 'space-between' }}>
                <span>Text</span>
                <span style={{ color: content.length > MAX_TEXT_LENGTH ? '#b91c1c' : 'var(--muted)', fontSize: 12 }}>
                  {content.length}/{MAX_TEXT_LENGTH}
                </span>
              </div>
              <textarea
                className="textarea"
                placeholder="Write text…"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                maxLength={MAX_TEXT_LENGTH}
                autoFocus
              />
            </label>
          ) : (
            <label>
              <div style={{ marginBottom: 6, fontWeight: 600 }}>Image URL</div>
              <input
                className="input"
                placeholder="Paste image URL…"
                type="url"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                autoFocus
              />
            </label>
          )}

          {error && <div style={{ color: '#b91c1c', fontSize: 14 }}>{error}</div>}

          <div className="modal__actions">
            <button type="button" className="btn" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">Add page</button>
          </div>
        </form>
      </div>
    </div>
  );
}
