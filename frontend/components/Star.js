import { Link } from "react-router-dom";

const Star = ({ star }) => {
    return (
        <div className="star">
            {star.star_id && <img src={"http://127.0.0.1:5000/stars/" + star.star_id + "/resource"} className="star__img" alt=""/> }
            <h4 className="star__name">{star.star_name}</h4>
            <p className="star__id">ID: {star.star_id}</p>
            <p className="star__path">Path: {star.star_path}</p>
            <Link to={"/stars/" + star.star_id}>LINK HERE</Link>
        </div>
    )
}

export default Star;