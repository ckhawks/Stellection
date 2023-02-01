import { useNavigate, useParams, Link } from "react-router-dom";
import { Button } from "@geist-ui/core";
import { useEffect } from "react";

import { useState } from "react";

const SingleStarPage = (_props: any) => {
  const params = useParams();
  let starId: number = 0;
  if (params.starId) {
    starId = parseInt(params.starId, 10);
  }
  const navigate = useNavigate();

  interface NeighboringStars {
    prevStarId?: number | undefined,
    nextStarId?: number | undefined
  }

  const [neighborStarIds, setNeighborStarIds] = useState<NeighboringStars>({});
  useEffect(() => {
    let updatedNeighborStarIds = neighborStarIds;
    if(starId === 0){
      updatedNeighborStarIds = {...updatedNeighborStarIds, prevStarId: undefined};
      console.log("bruh");
    } else {
      updatedNeighborStarIds = {...updatedNeighborStarIds, prevStarId: (starId - 1)};
      console.log("bruh2");
    }
    
    updatedNeighborStarIds = {...updatedNeighborStarIds, nextStarId: starId + 1};

    // we have to do it this way because it batches the changes to the state from this
    setNeighborStarIds({...updatedNeighborStarIds});
    console.log("neighbors", updatedNeighborStarIds);
  }, [starId])

  return (
    <>
      <Link to="/stars">Return</Link>
      star Page
      <b>STAR PAGE</b>
      StarId: {params.starId}
      {/* <Button onClick={() => {useNavigate()}}>Next</Button> */}
      { neighborStarIds.prevStarId !== undefined && (<Link to={"/stars/" + neighborStarIds.prevStarId}>Previous Star</Link> )}
      { neighborStarIds.nextStarId !== undefined && (<Link to={"/stars/" + neighborStarIds.nextStarId}>Next Star</Link>)}
      
    </>
  );
};

export default SingleStarPage;
