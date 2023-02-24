import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom"; // NavLink, redirect

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

import { useApi, useApi2 } from "../../hooks/useApi";

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

// const tags = [
//   { id: 1, name: "photography", items: 53, public: true },
//   { id: 2, name: "design", items: 33, public: false },
//   { id: 3, name: "graphic design", items: 13, public: true },
//   { id: 4, name: "ux-design", items: 20, public: true },
//   { id: 5, name: "memes", items: 443, public: false },
// ];

import useSWRMutation from "swr/mutation";
import { mutate } from "swr";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

// perform post request
async function createCluster(url, { arg }) {
  // console.log("url?: ", url);
  console.log("create cluster start");
  let path = "clusters";

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

const CreateClusterModalButton = (props) => {
  // modal state/handlers
  const [createClusterModalVisible, setCreateClusterModalVisible] =
    useState(false);
  const createClusterButtonClickHandler = () => {
    setCreateClusterModalVisible(true);
    console.log("opening");
  };
  const createClusterModalCloseHandler = (event) => {
    setCreateClusterModalVisible(false);
    console.log("closed");
  };

  // form fields states and change handlers
  const [createClusterName, setCreateClusterName] = useState("");
  const [createClusterDescription, setCreateClusterDescription] = useState();
  const [createClusterVisibility, setCreateClusterVisibility] =
    useState("public");

  const createClusterNameChanged = (e) => {
    setCreateClusterName(e.target.value);
  };

  const createClusterDescriptionChanged = (e) => {
    setCreateClusterDescription(e.target.value);
  };

  const createClusterVisibilityChanged = (e) => {
    setCreateClusterVisibility(e.target.value);
  };

  // swr mutation
  const {
    trigger: triggerCreateCluster,
    isMutating: isMutatingCreateCluster,
    data: createClusterData,
    error: createClusterError,
  } = useSWRMutation("/clusters", createCluster /* options */);

  const createClusterModalCreateClickHandler = async (event) => {
    // CREATE CLUSTER!!
    setCreateClusterModalProcessing(true);

    try {
      // console.log("collectlinkinputvalue: ", collectLinkInputValue);
      const data = await triggerCreateCluster(
        {
          name: createClusterName,
          public: createClusterVisibility === "public" ? true : false,
          description: createClusterDescription,
        } /* options */
      );

      const cluster = data?.data || [];

      // if (star.star_id && star.star_title) {
      //   setNoteValue(`Created star_id ${star.star_id}: '${star.star_title}'`);
      // } else {
      //   setNoteValue(`Failed to create star.`);
      // }

      mutate(
        {
          path: "clusters",
          method: "get",
        },
        data?.data
      );

      console.log(data);
    } catch (e) {
      // error handling
      console.log(e);
    }
    // const { data: starData, isValidating: validating } = useApi({
    //   path: "stars",
    //   method: "post",
    //   body: { star_title: collectLinkInputValue },
    // });

    // useEffect(() => {
    //   setProcessingSubmission(validating);
    // }, validating);

    setCreateClusterModalVisible(false);
    setCreateClusterModalProcessing(false);

    // reset fields
    setCreateClusterName("");
    setCreateClusterDescription("");
    setCreateClusterVisibility("public");
  };

  const [createClusterModalProcesing, setCreateClusterModalProcessing] =
    useState(false);

  return (
    <>
      <Button
        auto
        icon={<PlusIcon />}
        type="secondary"
        style={{ marginLeft: "auto", marginRight: "5px" }}
        onClick={createClusterButtonClickHandler}
      >
        Create
      </Button>
      <Modal
        visible={createClusterModalVisible}
        onClose={createClusterModalCloseHandler}
      >
        <Modal.Title
          style={{
            justifyContent: "flex-start",
            textTransform: "unset",
          }}
        >
          Create New Cluster
        </Modal.Title>
        <Spacer h={0.35} />
        {/* <Modal.Subtitle style={{ textAlign: "left" }}>
                  This is a modal
                </Modal.Subtitle> */}
        <Modal.Content
          style={{
            display: "flex",
            flexDirection: "column",
            paddingBottom: "0px",
          }}
        >
          <Text small pb={"7px"}>
            Cluster Name
          </Text>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Input
              icon={<TagIcon />}
              placeholder="tag-name"
              width="100%"
              height="40px"
              onChange={createClusterNameChanged}
              value={createClusterName}
            />
            {/* <Spacer inline w={0.5} />
                    <Button type="secondary" width="100px" mb={"4px"}>
                      Rename
                    </Button> */}
          </div>
          <Spacer h={0.5} />
          <Text small pb={"7px"}>
            Cluster Description (optional)
          </Text>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Textarea
              // icon={<TagIcon />}
              placeholder="Describe your cluster..."
              width="100%"
              height="120px"
              value={createClusterDescription}
              onChange={createClusterDescriptionChanged}
            />
            {/* <Spacer inline w={0.5} />
                    <Button type="secondary" width="100px" mb={"4px"}>
                      Rename
                    </Button> */}
          </div>
          <Spacer h={0.5} />
          <Text small pb={"7px"}>
            Cluster Visibility
          </Text>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Spacer inline w={0.5} />
            <EyeIcon />
            <Spacer inline w={1} />
            <Select
              placeholder="Choose one"
              initialValue={"public"}
              onChange={createClusterVisibilityChanged}
              width="100%"
              height="40px"
              // icon={<EyeIcon />}
              value={createClusterVisibility}
            >
              <Select.Option value="public">Public</Select.Option>
              <Select.Option value="private">Private</Select.Option>
            </Select>
          </div>
          <Spacer h={2} />
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Grid.Container gap={1}>
              <Grid xs={12}>
                <Button
                  icon={<XIcon />}
                  width="100%"
                  type="secondary"
                  onClick={createClusterModalCloseHandler}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid xs={12}>
                <Button
                  icon={<PlusIcon />}
                  width="100%"
                  type="success"
                  loading={createClusterModalProcesing}
                  onClick={createClusterModalCreateClickHandler}
                >
                  Create
                </Button>
              </Grid>
            </Grid.Container>
          </div>
        </Modal.Content>
      </Modal>
    </>
  );
};

const ClustersList = () => {
  const { data: clusterData, isValidating: variable } = useApi({
    path: "clusters",
    method: "get",
  });

  const clusters = clusterData?.data || [];

  console.log("clusters:", clusters);

  // let navigate = useNavigate();

  // const onClusterClickHandler = (e, tag_id) => {
  //   console.log("tag_id", tag_id);
  //   navigate("/tags/" + tag_id);
  // };

  /* https://swr.vercel.app/docs/mutation#mutate-based-on-current-data
  USE THIS TO UPDATE DOM ON REQUEST FOR CURRENT DATA
      mutate('/api/todos', async todos => {
        // let's update the todo with ID `1` to be completed,
        // this API returns the updated data
        const updatedTodo = await fetch('/api/todos/1', {
            method: 'PATCH',
            body: JSON.stringify({ completed: true })
        })

        // filter the list, and return it with the updated item
        const filteredTodos = todos.filter(todo => todo.id !== '1')
        return [...filteredTodos, updatedTodo]
        // Since the API already gives us the updated information,
        // we don't need to revalidate here.
        }, { revalidate: false })
    */

  const [settingsModalVisible, setSettingsModalVisible] = useState(false);
  const settingsModalStateHandler = () => setSettingsModalVisible(true);
  const settingsModalCloseHandler = (event) => {
    setSettingsModalVisible(false);
    console.log("closed");
  };

  return (
    <>
      <Spacer h={2} />
      <Text h2>Clusters</Text>
      <Text mt={0}>
        This is where all of your collections of stars (clusters) are located.
      </Text>
      <Spacer h={2} />

      <div
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <Text h3>{clusters.length} Clusters</Text>
        <Spacer inline w={1} />
        <CreateClusterModalButton />
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <Divider />
        {clusters.map((cluster) => {
          return (
            <React.Fragment key={cluster.cluster_id}>
              <div
                key={cluster.cluster_name}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
                className="browse-tags-list-item"
              >
                <TagIcon size={20} /> <Spacer inline w={0.5} />{" "}
                {cluster.cluster_name}
                <Spacer inline w={1} />
                {/* Item count indicator */}
                <Text small type="secondary">
                  {/* {cluster.items} items */}
                </Text>
                <Spacer inline w={1} />
                {/* Visibility indicator */}
                {cluster.public && (
                  <Tag
                    type="secondary"
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <EyeIcon size={16} />
                    <Spacer inline w={0.35} />
                    Public
                  </Tag>
                )}
                {!cluster.public && (
                  <Tag
                    type="secondary"
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <EyeOffIcon size={16} />
                    <Spacer inline w={0.35} />
                    Private
                  </Tag>
                )}
                {/* Right-aligned Icon buttons */}
                <div
                  style={{
                    marginLeft: "auto",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Spacer inline w={0.5} />
                  <Button
                    icon={<Trash2Icon />}
                    auto
                    type="error"
                    ghost
                    px={0.6}
                  >
                    {/* Delete */}
                  </Button>
                  <Spacer inline w={0.5} />
                  <Button
                    icon={<SettingsIcon />}
                    auto
                    onClick={settingsModalStateHandler}
                    type="secondary"
                    ghost
                    px={0.6}
                  >
                    {/* Settings */}
                  </Button>
                </div>
              </div>
              <Divider />
              <Modal
                visible={settingsModalVisible}
                onClose={settingsModalCloseHandler}
              >
                <Modal.Title
                  style={{
                    justifyContent: "flex-start",
                    textTransform: "unset",
                  }}
                >
                  Editing <Spacer inline w={0.35} />
                  <b>{cluster.cluster_name}</b>
                </Modal.Title>
                <Spacer h={0.35} />
                {/* <Modal.Subtitle style={{ textAlign: "left" }}>
                  This is a modal
                </Modal.Subtitle> */}
                <Modal.Content
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    paddingBottom: "0px",
                  }}
                >
                  <Text small pb={"7px"}>
                    Rename Cluster
                  </Text>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Input
                      icon={<TagIcon />}
                      placeholder={cluster.cluster_name}
                      width="100%"
                      height="40px"
                    />
                    {/* <Spacer inline w={0.5} />
                    <Button type="secondary" width="100px" mb={"4px"}>
                      Rename
                    </Button> */}
                  </div>
                  <Spacer h={0.5} />
                  <Text small pb={"7px"}>
                    Change Visibility
                  </Text>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Spacer inline w={0.5} />
                    <EyeIcon />
                    <Spacer inline w={1} />
                    <Select
                      placeholder="Choose one"
                      initialValue={cluster.public ? "1" : "2"}
                      onChange={undefined}
                      width="100%"
                      height="40px"
                      // icon={<EyeIcon />}
                    >
                      <Select.Option value="1">Public</Select.Option>
                      <Select.Option value="2">Private</Select.Option>
                    </Select>
                  </div>
                  <Spacer h={2} />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Grid.Container gap={1}>
                      <Grid xs={12}>
                        <Button icon={<XIcon />} width="100%" type="secondary">
                          Cancel
                        </Button>
                      </Grid>
                      <Grid xs={12}>
                        <Button icon={<SaveIcon />} width="100%" type="success">
                          Save
                        </Button>
                      </Grid>
                    </Grid.Container>
                  </div>
                </Modal.Content>
              </Modal>
            </React.Fragment>
          );
        })}
      </div>
      {/* <Text h1>cluster list temp2</Text>
      {clusters &&
        clusters.map((cluster) => {
          return (
            <div key={cluster.cluster_id}>
              <Text>
                cluster name: {cluster.cluster_name}
                <br />
              </Text>
              <Text>
                cluster id : {cluster.cluster_id}
                <br />
              </Text>
            </div>
          );
        })} */}
    </>
  );
};

export default ClustersList;
