import { useEffect, useState } from "react";
import './Clusters.css';
import Cluster from './Cluster';

function Clusters() {
    const [clusters, setClusters] = useState([]);

    useEffect(() => {
        async function fetchData(){
            const res = await fetch("http://127.0.0.1:5501/clusters");
            const data = await res.json();
            console.log("clusters " + data);
            setClusters(data)
        }
        fetchData();
    }, []);


    return (
        <div className="clusters">
            <h2>Clusters</h2>
            {clusters.clusters && clusters.clusters.length > 0 && clusters.clusters.map(cluster => (
                <Cluster key={cluster.cluster_id} cluster={cluster} />
            ))}
        </div>
    );
}



export default Clusters;
