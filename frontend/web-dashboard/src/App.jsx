import React, { useState } from 'react';
import EcosystemHub from './pages/EcosystemHub';
import Dashboard from './pages/Dashboard';

function App() {
    const [view, setView] = useState('hub');

    // Handle simple routing for the demo
    React.useEffect(() => {
        const handleHash = () => {
            if (window.location.hash === '#dashboard') {
                setView('dashboard');
            } else {
                setView('hub');
            }
        };
        window.addEventListener('hashchange', handleHash);
        handleHash();
        return () => window.removeEventListener('hashchange', handleHash);
    }, []);

    return (
        <div className="App">
            {view === 'hub' ? <EcosystemHub /> : <Dashboard />}
        </div>
    );
}

export default App;
