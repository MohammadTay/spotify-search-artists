import { useState, useEffect, useCallback } from "react";
import "./artist.css";
import { Link, useLocation } from "react-router-dom";
import * as React from "react";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchArtist,
  fetchingFailure,
  fetchingStart,
  fetchingSuccess,
  setToken,
} from "../../redux/artistSlice";
import axios from "axios";

export const Artist = () => {
  const { artData, pending } = useSelector((state) => state);

  const dispatch = useDispatch();
  const location = useLocation();
  const token = location.hash.substring(
    location.hash.indexOf("=") + 1,
    location.hash.indexOf("&")
  );
  useEffect(() => {
    dispatch(setToken(token));
  }, []);

  // const handleInput = (e) => setInput(e.target.value);
  const debounce = (fn) => {
    let id;
    return (...args) => {
      const context = this;
      if (id) clearTimeout(id);
      id = setTimeout(() => {
        id = null;
        fn.apply(context, args);
      }, 500);
    };
  };

  // const search = async (value) => {
  //   // dispatch(fetchingStart());
  //   try {
  //     dispatch(fetchArtist({ value, token }));
  //     // dispatch(fetchingSuccess(data.artists.items));
  //   } catch (err) {
  //     // dispatch(fetchingFailure());
  //   }
  // };
  const search = async (value) => {
    dispatch(fetchingStart());
    try {
      const { data } = await axios(
        `https://api.spotify.com/v1/search?q=${value}&type=artist`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      dispatch(fetchingSuccess(data.artists.items));
    } catch (err) {
      dispatch(fetchingFailure());
    }
  };

  const optimizedFn = useCallback(debounce(search, []));

  return (
    <div className="container">
      <div className={!pending ? "searchTop" : "searchBottom"}>
        <div className="searchInput">
          <input
            type="text"
            placeholder="search for an Artist"
            onChange={(e) => optimizedFn(e.target.value)}
          />
        </div>
        <SearchOutlinedIcon className="btn1" onClick={search} />
      </div>

      <div className="card-container">
        {artData?.map((item) => (
          <Link to={`/artist/${item.id}/${item.name}`} key={item.id}>
            <div className="simple-card">
              <p className="card-top">
                <img className="image" src={item?.images[0]?.url} alt="" />
              </p>
              <span className="card-center">
                <p className="card-name">{item.name}</p>
                <p className="card-follower">
                  {item.followers.total} followers
                </p>
              </span>
              <span className="card-bottom">
                <p className="card-stars">
                  <Rating
                    name="text-feedback"
                    value={item?.popularity / 20}
                    readOnly
                    precision={0.5}
                    emptyIcon={
                      <StarIcon
                        style={{
                          opacity: 0.55,
                          color: "green",
                        }}
                        fontSize="inherit"
                      />
                    }
                  />
                </p>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
