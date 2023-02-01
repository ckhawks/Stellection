import React, { useEffect, useState } from "react";

import { useLocation, Link, useNavigate, useParams } from "react-router-dom"; // NavLink, redirect

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

const tags = [
  { id: 1, name: "photography", items: 53, public: true },
  { id: 2, name: "design", items: 33, public: false },
  { id: 3, name: "graphic design", items: 13, public: true },
  { id: 4, name: "ux-design", items: 20, public: true },
  { id: 5, name: "memes", items: 443, public: false },
];

const CreateClusterModalButton = (props) => {
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
  const createClusterModalCreateClickHandler = (event) => {
    setCreateClusterModalProcessing(true);
    setTimeout(() => {
      setCreateClusterModalVisible(false);
      setCreateClusterModalProcessing(false);
    }, 1000);
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
              initialValue={"1"}
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

const BrowseClustersList = () => {
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
      <Spacer h={2} />

      <div
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <Text h3>{tags.length} Clusters</Text>
        <Spacer inline w={1} />
        <CreateClusterModalButton />
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <Divider />
        {tags.map((tag) => {
          const [settingsModalVisible, setSettingsModalVisible] =
            useState(false);
          const settingsModalStateHandler = () => setSettingsModalVisible(true);
          const settingsModalCloseHandler = (event) => {
            setSettingsModalVisible(false);
            console.log("closed");
          };

          return (
            <React.Fragment key={tag.id}>
              <div
                key={tag.name}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
                className="browse-tags-list-item"
              >
                <TagIcon size={20} /> <Spacer inline w={0.5} /> {tag.name}
                <Spacer inline w={1} />
                <Text small type="secondary">
                  {tag.items} items
                </Text>
                <Spacer inline w={1} />
                {tag.public && (
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
                {!tag.public && (
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
                  <b>{tag.name}</b>
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
                      placeholder={tag.name}
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
                      initialValue={tag.public ? "1" : "2"}
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
    </>
  );
};

const BrowseStarsList = () => {
  return (
    <>
      <Spacer h={2} />
      <Text h2>Stars</Text>
      <Text mt={0}>
        Collected over time, stars are the individual images or files that
        you've gathered into your solar system.
      </Text>
      <Spacer h={2} />
    </>
  );
};

const BrowsePage = (props) => {
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
          {<BrowseClustersList />}
        </Tabs.Item>
        <Tabs.Item
          label={
            <>
              <StarIcon /> Stars
            </>
          }
          value="stars"
        >
          {<BrowseStarsList />}
        </Tabs.Item>
      </Tabs>
    </>
  );
};

export default BrowsePage;
