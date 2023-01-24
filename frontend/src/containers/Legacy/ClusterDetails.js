import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Star from '../../components/Legacy/Star';

import Loading from './Loading';

const ClusterDetails = () => {
    const [cluster, setCluster] = useState({});

    let { clusterId } = useParams();

    useEffect(() => {
        async function fetchClusterData(starId ){
            const res = await fetch('http://127.0.0.1:5501/clusters/' + clusterId);
            const data = await res.json();
            console.log(data)
            setCluster(data);
        }
        fetchClusterData(clusterId );
    }, [cluster.cluster_id, clusterId ]);

    // https://reactrouter.com/docs/en/v6/getting-started/concepts
    // let star = useFakeFetch('http://127.0.0.1:5000/stars/' + star.star_id);

    
    // return (
    //     <div>bruh</div>
    // );

    return cluster ? (
        <div>
            <div className="cluster">
                <h4 className="cluster__name">{cluster.cluster_name}</h4>
                <p className="cluster__id">ID: {cluster.cluster_id}</p>
                <p className="cluster__starcount">Star count: {cluster.cluster_starcount}</p>
                <div className="stars">
                    <h2>Stars</h2>
                    {cluster.stars && cluster.stars.length > 0 && cluster.stars.map(star => (
                        <Star key={star.star_id} star={star} />
                    ))}
                </div>
            </div>
        </div>
    ) : (
        <Loading/>
    );

    
}

export default ClusterDetails;