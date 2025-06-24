import React, { useEffect, useState } from 'react';
const Quote = () => {
    const [randomQuote, setRandomQuote] = useState(null);
    const [category, setCategory] = useState(null);
    useEffect(() => {
        let a = ["dream", "courage", "success", "failure", "work"]
        const Index = Math.floor(Math.random() * a.length)
        setCategory(a[Index]);
        fetch(`/${a[Index]}.json`)
            .then(res => res.json())
            .then(data => {
                const randomIndex = Math.floor(Math.random() * data.length);
                setRandomQuote(data[randomIndex]);
            })
            .catch(err => console.error('Failed to load quotes:', err));
    }, []);

    return (
        <div className='w-full h-full flex items-center p-5 text-2xl'>
            {randomQuote && (
                <blockquote>
                    “{randomQuote.quote}” 
                    {<div>
                        <strong> — {randomQuote.author === "Unknown" ? "Anonymous" : randomQuote.author}
                    </strong>
                    </div> }
                </blockquote>
            )}
        </div>
    );
};

export default Quote;
