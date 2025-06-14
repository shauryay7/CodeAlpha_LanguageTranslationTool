import React, { useState } from 'react';
import './App.css';


const App = () => {
    const [text, setText] = useState('');
    const [translated, setTranslated] = useState('');
    const [sourceLang, setSourceLang] = useState('en');
    const [targetLang, setTargetLang] = useState('hi');

    const API_KEY = 'AIzaSyB2cN_OHDRFTA5qBGGu3xtwPnJ8jE7tkAo'; // 🔒 Replace with secure method in production

    const languages = {
        en: 'English',
        hi: 'Hindi',
        es: 'Spanish',
        fr: 'French',
        de: 'German',
        ja: 'Japanese',
        ru: 'Russian',
        zh: 'Chinese',
        ar: 'Arabic',
    };

    const translateText = async () => {
        if (!text.trim()) return;

        try {
            const response = await fetch(
                `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        q: text,
                        source: sourceLang,
                        target: targetLang,
                        format: 'text',
                    }),
                }
            );

            const data = await response.json();
            const translatedText = data.data?.translations[0]?.translatedText;
            setTranslated(translatedText || 'Translation failed.');
        } catch (error) {
            console.error('Translation error:', error);
            setTranslated('Translation failed.');
        }
    };

    const handleCopy = () => {
        if (translated) {
            navigator.clipboard.writeText(translated);
            alert('✅ Copied to clipboard!');
        }
    };

    const handleSpeak = () => {
        if (translated) {
            const utterance = new SpeechSynthesisUtterance(translated);
            utterance.lang = targetLang;
            speechSynthesis.speak(utterance);
        }
    };

    return (
        <main className="app-container">
            <div className="app-wrapper">
                <h1 className="app-title">🌐 Language Translator</h1>

                <section className="input-section">
      <textarea
          className="text-input"
          rows={5}
          placeholder="Type your text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
      />

                    <div className="language-select">
                        <select value={sourceLang} onChange={(e) => setSourceLang(e.target.value)}>
                            {Object.entries(languages).map(([code, name]) => (
                                <option key={code} value={code}>{name}</option>
                            ))}
                        </select>

                        <span className="arrow">➡️</span>

                        <select value={targetLang} onChange={(e) => setTargetLang(e.target.value)}>
                            {Object.entries(languages).map(([code, name]) => (
                                <option key={code} value={code}>{name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="button-group">
                        <button onClick={translateText}>🔍 Translate</button>
                    </div>
                </section>

                {translated && (
                    <section className="output-section">
                        <h2>✨ Translated Text</h2>
                        <div className="translated-text">{translated}</div>
                        <div className="copy-speak-buttons">
                            <button onClick={handleCopy}>📋 Copy</button>
                            <button onClick={handleSpeak}>🔊 Speak</button>
                        </div>
                    </section>
                )}
            </div>
        </main>

    );
};import React, { useState } from 'react';
import './App.css';


const App = () => {
    const [text, setText] = useState('');
    const [translated, setTranslated] = useState('');
    const [sourceLang, setSourceLang] = useState('en');
    const [targetLang, setTargetLang] = useState('hi');

    const API_KEY = 'AIzaSyB2cN_OHDRFTA5qBGGu3xtwPnJ8jE7tkAo'; // 🔒 Replace with secure method in production

    const languages = {
        en: 'English',
        hi: 'Hindi',
        es: 'Spanish',
        fr: 'French',
        de: 'German',
        ja: 'Japanese',
        ru: 'Russian',
        zh: 'Chinese',
        ar: 'Arabic',
    };

    const translateText = async () => {
        if (!text.trim()) return;

        try {
            const response = await fetch(
                `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        q: text,
                        source: sourceLang,
                        target: targetLang,
                        format: 'text',
                    }),
                }
            );

            const data = await response.json();
            const translatedText = data.data?.translations[0]?.translatedText;
            setTranslated(translatedText || 'Translation failed.');
        } catch (error) {
            console.error('Translation error:', error);
            setTranslated('Translation failed.');
        }
    };

    const handleCopy = () => {
        if (translated) {
            navigator.clipboard.writeText(translated);
            alert('✅ Copied to clipboard!');
        }
    };

    const handleSpeak = () => {
        if (translated) {
            const utterance = new SpeechSynthesisUtterance(translated);
            utterance.lang = targetLang;
            speechSynthesis.speak(utterance);
        }
    };

    return (
        <main className="app-container">
            <div className="app-wrapper">
                <h1 className="app-title">🌐 Language Translator</h1>

                <section className="input-section">
      <textarea
          className="text-input"
          rows={5}
          placeholder="Type your text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
      />

                    <div className="language-select">
                        <select value={sourceLang} onChange={(e) => setSourceLang(e.target.value)}>
                            {Object.entries(languages).map(([code, name]) => (
                                <option key={code} value={code}>{name}</option>
                            ))}
                        </select>

                        <span className="arrow">➡️</span>

                        <select value={targetLang} onChange={(e) => setTargetLang(e.target.value)}>
                            {Object.entries(languages).map(([code, name]) => (
                                <option key={code} value={code}>{name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="button-group">
                        <button onClick={translateText}>🔍 Translate </button>
                    </div>
                </section>

                {translated && (
                    <section className="output-section">
                        <h2>✨ Translated Text</h2>
                        <div className="translated-text">{translated}</div>
                        <div className="copy-speak-buttons">
                            <button onClick={handleCopy}>📋 Copy</button>
                            <button onClick={handleSpeak}>🔊 Speak</button>
                        </div>
                    </section>
                )}
            </div>
        </main>

    );
};

export default App;


export default App;
