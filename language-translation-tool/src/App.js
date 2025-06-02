import React, { useState } from 'react';

const App = () => {
    const [text, setText] = useState('');
    const [translated, setTranslated] = useState('');
    const [sourceLang, setSourceLang] = useState('en');
    const [targetLang, setTargetLang] = useState('hi');

    const API_KEY = 'AIzaSyB2cN_OHDRFTA5qBGGu3xtwPnJ8jE7tkAo'; // Replace with your actual API key

    const languages = {
        en: 'English',
        hi: 'Hindi',
        es: 'Spanish',
        fr: 'French',
        de: 'German',
        ja: 'Japanese',
        ru: 'Russian',
        zh: 'Chinese',
        ar: 'Arabic'
    };

    const translateText = async () => {
        if (!text.trim()) return;

        try {
            const response = await fetch(
                `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        q: text,
                        source: sourceLang,
                        target: targetLang,
                        format: 'text'
                    })
                }
            );

            const data = await response.json();
            const translatedText = data.data?.translations[0]?.translatedText;

            if (translatedText) {
                setTranslated(translatedText);
            } else {
                setTranslated('Translation failed.');
            }
        } catch (error) {
            console.error('Translation error:', error);
            setTranslated('Translation failed.');
        }
    };

    const handleCopy = () => {
        if (translated) {
            navigator.clipboard.writeText(translated);
            alert('Copied!');
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
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6 flex flex-col items-center">
            <div className="w-full max-w-2xl">
                <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    🌍 Language Translator
                </h1>

                <div className="bg-white rounded-2xl shadow-xl p-8 mb-6 border border-gray-100">
                    <textarea
                        className="w-full p-4 rounded-xl border-2 border-gray-200 mb-6 focus:border-blue-500 focus:outline-none transition-colors duration-200 resize-none text-gray-700 placeholder-gray-400"
                        rows={4}
                        placeholder="Enter text to translate..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />

                    <div className="flex items-center justify-center gap-6 mb-6">
                        <select
                            value={sourceLang}
                            onChange={(e) => setSourceLang(e.target.value)}
                            className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors duration-200 bg-white text-gray-700 font-medium min-w-[140px]"
                        >
                            {Object.entries(languages).map(([code, name]) => (
                                <option key={code} value={code}>{name}</option>
                            ))}
                        </select>

                        <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-3 rounded-full">
                            <span className="text-white text-xl">➡️</span>
                        </div>

                        <select
                            value={targetLang}
                            onChange={(e) => setTargetLang(e.target.value)}
                            className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors duration-200 bg-white text-gray-700 font-medium min-w-[140px]"
                        >
                            {Object.entries(languages).map(([code, name]) => (
                                <option key={code} value={code}>{name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="text-center">
                        <button
                            onClick={translateText}
                            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                        >
                            Translate
                        </button>
                    </div>
                </div>

                {translated && (
                    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                            <span className="mr-2">✨</span>
                            Translated Text:
                        </h2>
                        <div className="bg-gray-50 p-4 rounded-xl mb-6 border-l-4 border-blue-500">
                            <p className="text-gray-700 leading-relaxed text-lg">{translated}</p>
                        </div>
                        <div className="flex gap-3 justify-center">
                            <button
                                onClick={handleCopy}
                                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-medium px-6 py-2 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center gap-2"
                            >
                                📋 Copy
                            </button>
                            <button
                                onClick={handleSpeak}
                                className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-medium px-6 py-2 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center gap-2"
                            >
                                🔊 Speak
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default App;