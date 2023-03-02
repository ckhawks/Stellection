import { useNavigate, useParams, Link } from "react-router-dom";
import { Button, Checkbox, Text, Spacer } from "@geist-ui/core";
import { useEffect } from "react";

import { useState } from "react";

import { useApi, useApi2 } from "../../hooks/useApi";

import useSWRMutation from "swr/mutation";

const SingleStarPage = (_props: any) => {
  const params = useParams();
  let starId: number = 0;
  if (params.starId) {
    starId = parseInt(params.starId, 10);
  }

  // console.log('params.starId', params.starId);
  // console.log("starId", starId);

  const path = "stars/" + starId;

  const { data: starData, isValidating: starValidating } = useApi({
    path: path,
    method: "get",
  });

  // setStar(starData?.data);
  // console.log(starData);

  const star: {
    star_title: string,
    star_id: number,
    next: {
      star_id: number
    } | null,
    prev: {
      star_id: number,
    } | null,
    clusters: Cluster[]
  } = starData?.data || {
    // star_title: "",
    // star_id: 0,
    // next: {
    //   star_id: 1
    // },
    // prev: {
    //   star_id: 1
    // },
    // clusters: [
    //   {
    //     cluster_id: 1,
    //     cluster_name: ""
    //   }
    // ] 
  };

  console.log("star:", star);

  const star_clusters_ids: number[] = [];
  for(const cluster_key in star.clusters){
    star_clusters_ids.push(star.clusters[cluster_key].cluster_id)
  }

  const { data: clustersData, isValidating: clustersValidating } = useApi({
    path: 'clusters',
    method: 'get'
  })

  interface Cluster {
    cluster_id: number,
    cluster_name: string,
    active?: boolean;
  }

  // TODO don't modify the list of clusters that we get from the API
  // instead, change the rendering so that it pulls the check from the star's associated_cluster data
  let clusters: Cluster[] = clustersData?.data || []; 
  // [
  //   {
  //     cluster_id: 1,
  //     cluster_name: "",
  //     active: false
  //   }
  // ];

  // useEffect(() => {
    
  
  //   for (let cluster_key in star.clusters){
  //     let cluster: Cluster = star.clusters[cluster_key];
  
  //     clusters.find((o, i) => {
  //       if (o.cluster_id === cluster.cluster_id) {
  //         clusters[i] = { ...clusters[i], active: true };
  //         return true; // stop searching
  //       }
  //     })
  //   }
  // }, [star])
    
  

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  async function addStarToClusterRequest(url: string, { arg }: any, ) {
    console.log("arg", arg)
    // console.log("url?: ", url);
    console.log("add star to cluster start");
    let path = "clusters/" + arg.cluster_id + "/stars/" + arg.star_id; // http://localhost:5500/v1/clusters/3/stars/2
  
    let urlreal = `${API_BASE_URL}/v1/${path}`;
  
    console.log("body: ", arg);
    const response = await fetch(urlreal, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // DONT FORGET THIS
        // Authorization: `Bearer ${arg}`
      },
      body: JSON.stringify(arg),
    });
  
    return response.json();
  }

  async function deleteStarFromClusterRequest(url: string, { arg}: any, ){
    console.log("delete star from cluster start");
    let path = "clusters/" + arg.cluster_id + "/stars/" + arg.star_id; // http://localhost:5500/v1/clusters/3/stars/2
  
    let urlreal = `${API_BASE_URL}/v1/${path}`;
  
    console.log("body: ", arg);
    const response = await fetch(urlreal, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json", // DONT FORGET THIS
        // Authorization: `Bearer ${arg}`
      },
      body: JSON.stringify(arg),
    });
  
    return response.json();
  }

  const clusterCheckboxChangeHandler = async (cluster_id: number, changedTo: boolean) => {
    
    if(changedTo === true){
      // perform post request
      // await addStarToClusterRequest("", {cluster_id: cluster_id, star_id: star.star_id} );
      try {
        const data = await triggerAddStarToCluster({cluster_id: cluster_id, star_id: star.star_id});
        const result = data?.data || [];

        if(result) {
          console.log("worked LOL");
        }
      } catch (e) {
        console.log(e);
      }
      

    } else {
      // perform delete request
      try {
        const data = await triggerDeleteStarFromCluster({cluster_id: cluster_id, star_id: star.star_id});
        const result: number = data?.data || undefined;

        if(result) {
          console.log("worked LOL");
        }
      } catch (e) {
        console.log(e);
      }     

    }
  }

  const {
    trigger: triggerAddStarToCluster,
    isMutating: isMutatingAddStarToCluster,
    data: addStarToClusterData,
    error: addStarToClusterError,
  } = useSWRMutation("/stars/" + star.star_id, addStarToClusterRequest /* options */);

  const {
    trigger: triggerDeleteStarFromCluster,
    isMutating: isMutatingDeleteStarFromCluster,
    data: deleteStarFromClusterData,
    error: deleteStarFromClusterError
  } = useSWRMutation("/stars/" + star.star_id, deleteStarFromClusterRequest);

  // const [ star, setStar ] = useState<Star | null>({star_id: 0, next: null, prev: null, star_title: ""});
  // const navigate = useNavigate();

  // interface Star {
  //   star_id: number;
  //   next: {
  //     star_id: number;
  //   } | null;
  //   prev: {
  //     star_id: number;
  //   } | null;
  //   star_title: string;
  // }

  // interface NeighboringStars {
  //   prevStarId?: number | undefined,
  //   nextStarId?: number | undefined
  // }

  // const [neighborStarIds, setNeighborStarIds] = useState<NeighboringStars>({});
  // useEffect(() => {
  //   let updatedNeighborStarIds = neighborStarIds;
  //   if(starId === 0){
  //     updatedNeighborStarIds = {...updatedNeighborStarIds, prevStarId: undefined};
  //     console.log("bruh");
  //   } else {
  //     updatedNeighborStarIds = {...updatedNeighborStarIds, prevStarId: (starId - 1)};
  //     console.log("bruh2");
  //   }
    
  //   updatedNeighborStarIds = {...updatedNeighborStarIds, nextStarId: starId + 1};

  //   // we have to do it this way because it batches the changes to the state from this
  //   setNeighborStarIds({...updatedNeighborStarIds});
  //   console.log("neighbors", updatedNeighborStarIds);
  // }, [starId])

  
  console.log('star_clusters_ids', star_clusters_ids)
  return (
    <>
      { star !== undefined && (
        <>
          <Link to="/stars">Return</Link>
          star Page
          <b>STAR PAGE</b>
          StarId search: {params.starId}<br/>
          StarId found: {star?.star_id}<br/>
          <Text h1>Star title: {star?.star_title}</Text><br/>
          {/* <Button onClick={() => {useNavigate()}}>Next</Button> */}
          { star?.prev !== null && (<Link to={"/stars/" + star?.prev?.star_id}>Previous Star</Link> )}<br/>
          { star?.next !== null && (<Link to={"/stars/" + star?.next?.star_id}>Next Star</Link>)}<br/>
          <Text h3>Clusters</Text>
          { clusters.map((cluster) => {

            // set cluster.active value
            // console.log('cluster.cluster_id', cluster.cluster_id, "in ", star_clusters_ids, star_clusters_ids.includes(cluster.cluster_id))
            if(star_clusters_ids.includes(cluster.cluster_id)) {
              cluster.active = true;
              // console.log('cluster', cluster.cluster_name, cluster.cluster_id, ' active ', cluster.active);
            } else {
              cluster.active = false;
            } 

            return (
              <div key={cluster.cluster_id}>
                <Checkbox checked={cluster.active} type="default" scale={1.25} onChange={(e) => {
                  clusterCheckboxChangeHandler(cluster.cluster_id, e.target.checked);
                }}>{cluster.cluster_name}</Checkbox>
                {/* <Spacer h={.5} /> */}
              </div>
            )
          })}
        
        </>
      )}
      { star === undefined && (
        <>
          Star {params.starId} not found.
        </>
      )}
      
    </>
  );
};

export default SingleStarPage;
