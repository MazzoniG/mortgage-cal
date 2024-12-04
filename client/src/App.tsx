import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Mortgage from './pages/Mortgage';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Mortgage />} />
            </Routes>
        </Router>
    );
}

export default App;
