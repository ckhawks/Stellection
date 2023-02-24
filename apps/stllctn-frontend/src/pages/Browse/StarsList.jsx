import { useNavigate } from "react-router-dom"; // NavLink, redirect

import React, { useEffect, useState } from "react";

import { useApi, useApi2 } from "../../hooks/useApi";

import {
  Tabs,
  Text,
  Spacer,
  Grid,
  Card,
  Button,
  Divider,
  Tag,
  Modal,
  Input,
  Select,
  Textarea,
} from "@geist-ui/core";

import {
  Tag as TagIcon,
  Star as StarIcon,
  Settings as SettingsIcon,
  Trash2 as Trash2Icon,
  Edit3 as Edit3Icon,
  Plus as PlusIcon,
  EyeOff as EyeOffIcon,
  Eye as EyeIcon,
  Save as SaveIcon,
  X as XIcon,
} from "@geist-ui/icons";

const StarsList = () => {
  const { data: starData, isValidating: variable } = useApi({
    path: "stars",
    method: "get",
  });

  const stars = starData?.data || [];

  console.log(stars);

  let navigate = useNavigate();

  const onClickStarRowHandler = (star_id) => {
    navigate("/stars/" + star_id);
  };

  const onClusterClickHandler = (e, tag_id) => {
    console.log("tag_id", tag_id);
    navigate("/tags/" + tag_id);
  };

  const AddStarButton = () => {
    return (
      <>
        <Button
          auto
          icon={<PlusIcon />}
          type="secondary"
          style={{ marginLeft: "auto", marginRight: "5px" }}
          onClick={() => {
            navigate("/collect");
          }}
        >
          Collect
        </Button>
      </>
    );
  };

  return (
    <>
      <Spacer h={2} />
      <Text h2>Stars</Text>
      <Text mt={0}>
        Collected over time, stars are the individual images or files that
        you've gathered into your solar system.
      </Text>
      <Spacer h={2} />

      <div
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <Text h3>{stars.length} Stars</Text>
        <Spacer inline w={1} />
        <AddStarButton />
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <Divider />
        {stars.map((star) => {
          // const [settingsModalVisible, setSettingsModalVisible] =
          //   useState(false);
          // const settingsModalStateHandler = () => setSettingsModalVisible(true);
          // const settingsModalCloseHandler = (event) => {
          //   setSettingsModalVisible(false);
          //   console.log("closed");
          // };

          return (
            <React.Fragment key={star.star_id}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
                className="browse-tags-list-item"
                onClick={() => {
                  onClickStarRowHandler(star.star_id);
                }}
              >
                <div className="star-id-indicator">{star.star_id}</div>
                <Text>{star.star_title}</Text>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </>
  );
};

export default StarsList;
