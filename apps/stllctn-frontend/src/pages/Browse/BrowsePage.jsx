import React, { useEffect, useState } from "react";

import { useLocation, Link, useNavigate, useParams } from "react-router-dom"; // NavLink, redirect

import { useApi, useApi2 } from "../../hooks/useApi";

import StarsList from "./StarsList";
import ClustersList from "./ClustersList";

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

import "./BrowsePage.css";

const BrowseTagsListOld = (props) => {
  let navigate = useNavigate();

  const onClusterClickHandler = (e, tag_id) => {
    console.log("tag_id", tag_id);
    navigate("/tags/" + tag_id);
  };

  return (
    <>
      <Spacer h={2} />
      <Text h2>Clusters</Text>
      <Text mt={0}>
        This is where all of your collections of stars (clusters) are located.
      </Text>

      <Text h3>{tags.length} Clusters</Text>
      <Grid.Container gap={2} justify="center">
        {tags.map((tag) => {
          return (
            <Grid xs={24} key={tag.name}>
              <Card
                width="100%"
                className="tag-list-item"
                onClick={(e) => {
                  onClusterClickHandler(e, tag.id);
                }}
              >
                <Card.Content
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <TagIcon /> <Spacer inline w={0.5} /> {tag.name}
                  <Spacer inline w={1} />
                  <Text small>{tag.items} items</Text>
                  <div style={{ marginLeft: "auto" }}>
                    <Spacer inline w={0.5} />
                    <Button icon={<Trash2Icon />} auto type="error" ghost>
                      Delete
                    </Button>
                    <Spacer inline w={0.5} />
                    <Button icon={<SettingsIcon />} auto>
                      Settings
                    </Button>
                  </div>
                </Card.Content>
              </Card>
            </Grid>
          );
        })}
      </Grid.Container>
    </>
  );
};

const BrowsePage = (props) => {
  // const { setToken, makeRequest } = useApi2();
  // setToken("no token lol");

  // const [clusters, setClusters] = useState([]);
  // let request = {};

  // useEffect(() => {
  //   async () => {
  //     request = await makeRequest({ path: "api/clusters", method: "get" });
  //   };
  // }, []);
  // console.log("request", request);
  // setClusters(request.data);

  // const params = useParams();
  const navigate = useNavigate();
  const [browseNavTabsValue, setBrowseNavTabsValue] = useState("clusters");

  useEffect(() => {
    if (props.viewing === undefined) {
      navigate("/clusters");
    }
    setBrowseNavTabsValue(props.viewing);
  }, [props.viewing]);

  const navTabsChangeHandler = (value) => {
    navigate(value === "clusters" ? "/clusters" : "/stars");
    console.log(value);
  };

  // const { data: companiesGroupedByCategoryResponse, isValidating } = useApi<
  //   GetCompaniesGroupedResponse,
  //   undefined
  // >({
  //   path: GetCompaniesByCategory.getV1Path(),
  //   method: GetCompaniesByCategory.method
  // });

  // const companiesGroupedByCategory =
  //   companiesGroupedByCategoryResponse?.data || {};

  return (
    <>
      <Tabs
        initialValue={browseNavTabsValue}
        align="left"
        leftSpace={0}
        value={browseNavTabsValue}
        onChange={navTabsChangeHandler}
      >
        <Tabs.Item
          label={
            <>
              <TagIcon /> Clusters
            </>
          }
          value="clusters"
        >
          {<ClustersList />}
        </Tabs.Item>
        <Tabs.Item
          label={
            <>
              <StarIcon /> Stars
            </>
          }
          value="stars"
        >
          {<StarsList />}
        </Tabs.Item>
      </Tabs>
    </>
  );
};

export default BrowsePage;
