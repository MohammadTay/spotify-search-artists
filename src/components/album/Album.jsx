import { useEffect } from "react";
import "./album.css";
import * as React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAlbFailure,
  fetchAlbStart,
  fetchAlbSuccess,
} from "../../redux/artistSlice";
import axios from "axios";

export const Album = () => {
  const { albData, token, loading } = useSelector((state) => state);

  const dispatch = useDispatch();
  const { id, name } = useParams();
  console.log(id);
  console.log(token);

  useEffect(() => {
    const fetchAlb = async () => {
      dispatch(fetchAlbStart());
      try {
        const { data } = await axios.get(
          `https://api.spotify.com/v1/artists/${id}/albums?include_groups=album`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        dispatch(fetchAlbSuccess(data.items));
      } catch (err) {
        dispatch(fetchAlbFailure());
      }
    };
    fetchAlb();
  }, [id]);

  return (
    <div className="albumContainer">
      <div>{name}</div>

      <span>albums</span>
      {loading ? (
        "loading"
      ) : (
        <div className="albumCard">
          {albData?.map((item) => (
            <div className="albumList" key={item.id}>
              <img className="albumImage" src={item?.images[0]?.url} alt="" />
              <div className="albumName"> {item?.name}</div>

              <div className="artName">
                {item?.artists?.map((itim) => (
                  <p className="artistName" key={itim.id}>
                    {itim.name}
                  </p>
                ))}
              </div>
              <div className="albumDate"> date:{item?.release_date}</div>
              <div className="albumTracks"> tracks:{item?.total_tracks}</div>
              <Link to={`${item?.external_urls.spotify}`} target="_blank">
                <div className="albumLink">preview in spotify</div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
