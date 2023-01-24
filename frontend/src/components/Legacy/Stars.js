import React, { useEffect, useState } from "react";
import './Stars.css';
import Star from './Star';

function Stars() {
    const [stars, setStars] = useState({stars: []});

    useEffect(() => {
        async function fetchData() {
            const res = await fetch("http://127.0.0.1:5501/stars")
            const data = await res.json();
            console.log(data);
            setStars(data);
        }
        fetchData();       
    }, []); // empty dependency array means this effect will only run once (like componentDidMount in classes)

    return (
        <div className="stars">
            <h2>Stars</h2>
            {stars.stars && stars.stars.length > 0 && stars.stars.map(star => (
                <Star key={star.star_id} star={star} />
            ))}
        </div>
    );
}

export default Stars;
