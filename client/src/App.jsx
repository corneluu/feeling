import { useState } from 'react';
import InputForm from './components/InputForm';
import ResponseCard from './components/ResponseCard';
import { fetchReflection } from './services/api';
import './styles/index.css';

function App() {
  const [reflectionData, setReflectionData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleReflectionRequest = async (userInput) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchReflection(userInput);
      setReflectionData(data);
    } catch (err) {
      setError("We encountered a gentle pause. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setReflectionData(null);
    setError(null);
  };

  return (
    <main>
      <header className={reflectionData ? 'fade-in' : ''} style={{ textAlign: 'center', marginBottom: '1rem' }}>
        {/* Only show Title on initial screen to reduce clutter on result screen, or keep small */}
        {!reflectionData && <h1 style={{ fontSize: '1.2rem', fontWeight: '400', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--accent-color)' }}>Reflect</h1>}
      </header>

      {error && (
        <div style={{ textAlign: 'center', color: '#e74c3c', marginBottom: '1rem' }} className="fade-in">
          {error}
        </div>
      )}

      {!reflectionData ? (
        <InputForm onSubmit={handleReflectionRequest} isLoading={isLoading} />
      ) : (
        <ResponseCard data={reflectionData} onReset={handleReset} />
      )}
    </main>
  );
}

export default App;
