import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Loading from './Loading';

const StarDetails = () => {
    const [star, setStar] = useState({});

    let { starId } = useParams();
    console.log("here: " + starId );

    useEffect(() => {
        async function fetchStarData(starId ){
            const res = await fetch('http://127.0.0.1:5000/stars/' + starId);
            const data = await res.json();
            console.log("here3: ");
            console.log(data)
            setStar(data);
        }
        console.log("here2: " + starId );
        fetchStarData(starId );
    }, [star.star_id, starId ]);

    
    
    // https://reactrouter.com/docs/en/v6/getting-started/concepts
    // let star = useFakeFetch('http://127.0.0.1:5000/stars/' + star.star_id);

    
    // return (
    //     <div>bruh</div>
    // );

    // TODO display tags of star
    return star ? (
        <div>
            <div className="star">
                { star.star_id && <img src={"http://127.0.0.1:5000/stars/" + star.star_id + "/resource"} className="star__img" alt=""/> }
                <h4 className="star__name">{star.star_name}</h4>
                <p className="star__id">ID: {star.star_id}</p>
                <p className="star__path">Path: {star.star_path}</p>
            </div>
        </div>
    ) : (
        <Loading/>
    );
}

export default StarDetails;