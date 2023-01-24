import { Link } from "react-router-dom";

const Cluster = ({ cluster }) => {
    return (
        <div className="cluster">
            <h4 className="cluster__name">{cluster.cluster_name}</h4>
            <p className="cluster__id">ID: {cluster.cluster_id}</p>
            <p className="cluster__starcount">Star count: {cluster.cluster_starcount}</p>
            <Link to={"/clusters/" + cluster.cluster_id}>LINK HERE</Link>
        </div>
    );
}

export default Cluster;

// https://jasonwatmore.com/post/2020/01/27/react-fetch-http-get-request-examples