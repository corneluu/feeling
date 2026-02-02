import './ResponseCard.css';

export default function ResponseCard({ data, onReset }) {
    if (!data) return null;

    return (
        <div className="response-container fade-in">

            {/* Acknowledgment */}
            <div className="acknowledgment section">
                <p>{data.acknowledgment}</p>
            </div>

            {/* Verse */}
            <div className="verse-card section">
                <p className="verse-text">"{data.verse.text}"</p>
                <p className="verse-source">— {data.verse.source}</p>
            </div>

            {/* Reflection */}
            <div className="reflection section">
                <p>{data.reflection}</p>
            </div>

            {/* Reset Action */}
            <div className="action-area">
                <button onClick={onReset} className="reset-link">
                    Begin again
                </button>
            </div>

            {/* Footer Disclaimer */}
            <footer className="footer-disclaimer">
                This app offers reflection and encouragement, not professional advice.
            </footer>
        </div>
    );
}
