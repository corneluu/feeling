import { useState } from 'react';
import './InputForm.css';

export default function InputForm({ onSubmit, isLoading }) {
    const [input, setInput] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.trim() && !isLoading) {
            onSubmit(input);
        }
    };

    return (
        <form className="input-form fade-in" onSubmit={handleSubmit}>
            <label htmlFor="emotion-input" className="input-label">
                How do you feel today?
            </label>
            <p style={{ textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '-1rem', marginBottom: '1rem' }}>
                (Please type in English, we will work on the Romanian version too)
            </p>

            <textarea
                id="emotion-input"
                className="emotion-textarea"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="I feel..."
                disabled={isLoading}
                rows={4}
                autoFocus
            />

            <div className="button-container">
                <button
                    type="submit"
                    className="submit-button"
                    disabled={!input.trim() || isLoading}
                >
                    {isLoading ? <span className="pulse">Reflecting...</span> : 'Reflect'}
                </button>
            </div>
        </form>
    );
}
