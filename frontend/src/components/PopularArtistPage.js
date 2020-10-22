import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "./Header";
import Content from "./Content";
import SongList from "./SongList";
import SongListItem from "./SongListItem";

const PopularArtistPage = () => {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    fetch("/top50/popular-artist")
      .then((res) => res.json())
      .then((json) => {
        setSongs(json.data);
      });
  }, []);

  console.log("PopularArtistPage.js: songs: ", songs);

  return (
    <>
      <Header pageTitle="Most Popular Artist" />
      <SongList songs={songs} />
    </>
  );
};

export default PopularArtistPage;
