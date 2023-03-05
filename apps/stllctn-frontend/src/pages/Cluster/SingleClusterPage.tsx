import { useParams, Link } from "react-router-dom";

import { useApi } from '../../hooks/useApi';

import { Text, Image, Description } from '@geist-ui/core';


const SingleClusterPage = (_props: any) => {
  const params = useParams();

  let clusterId: number = 0;

  if(params.clusterId) {
    clusterId = parseInt(params.clusterId, 10);
  }

  const { data: clusterData, isValidating: clusterValidating } = useApi({
    path: "clusters/" + clusterId,
    method: 'get',
  })

  interface Cluster {
    cluster_id: number,
    cluster_name: string,
    cluster_desc: string,
    stars: Star[];
  }

  interface Star {
    star_id: number,
    star_title: string
  }

  const cluster: Cluster = clusterData;
  console.log(cluster);

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  function getStarResourceUrlFromStarId(starId: number) {
    return API_BASE_URL + "/v1/stars/" + starId + "/resource";
  }

  return (
    <>
      { cluster !== undefined && (
        <>
          <Link to="/clusters">Return to Clusters</Link>
          <Text h1>{cluster.cluster_name}</Text>
          <div style={{display: "flex", flexDirection: "row"}} > 
            <Description title="Description" content={
                <Text>{cluster.cluster_desc}</Text>
            } />
            <Description title="Stars" style={{marginLeft: "10px"}} content={
                <Text>{cluster.stars.length}</Text>
            } />
          </div>
          
          { cluster.stars && cluster?.stars.map((star) => {
            return (
              <div key={star.star_id}>
                <Image src={getStarResourceUrlFromStarId(star.star_id)}></Image>
                {/* <Text>{star.star_title}</Text> */}
              </div>
            )
          })}
          { !cluster.stars && (
            <Text>No stars found in cluster {cluster.cluster_name}.</Text>
          )}
        </>
      )}
      { cluster === undefined && (
        <>
          Cluster {params.clusterId} not found.
        </>
      )}
    </>
  );
};

export default SingleClusterPage;
