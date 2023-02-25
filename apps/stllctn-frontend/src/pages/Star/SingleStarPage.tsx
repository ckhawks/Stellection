import { useNavigate, useParams, Link } from "react-router-dom";
import { Button } from "@geist-ui/core";
import { useEffect } from "react";

import { useState } from "react";

import { useApi, useApi2 } from "../../hooks/useApi";

const SingleStarPage = (_props: any) => {
  const params = useParams();
  let starId: number = 0;
  if (params.starId) {
    starId = parseInt(params.starId, 10);
  }

  console.log('params.starId', params.starId);
  console.log("starId", starId);

  const path = "stars/" + starId;

  const { data: starData, isValidating: variable } = useApi({
    path: path,
    method: "get",
  });

  // setStar(starData?.data);
  console.log(starData);

  const star = starData?.data || {
    star_title: "",
    star_id: 0,
    next: {
      star_id: 1
    },
    prev: {
      star_id: 1
    }
  };

  console.log("star:", star);

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

  

  return (
    <>
      { star !== undefined && (
        <>
          <Link to="/stars">Return</Link>
          star Page
          <b>STAR PAGE</b>
          StarId search: {params.starId}<br/>
          StarId found: {star?.star_id}<br/>
          Star title: {star?.star_title}<br/>
          {/* <Button onClick={() => {useNavigate()}}>Next</Button> */}
          { star?.prev !== null && (<Link to={"/stars/" + star?.prev.star_id}>Previous Star</Link> )}<br/>
          { star?.next !== null && (<Link to={"/stars/" + star?.next.star_id}>Next Star</Link>)}<br/>
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
