import BaseLayout from "../BaseLayout";

import React, { useEffect, useState } from "react";

import {
  Tabs,
  Grid,
  Card,
  Spacer,
  Text,
  Link,
  Image,
  Note,
  Tag,
  Description,
  Input,
  Button,
  Textarea,
  Divider,
} from "@geist-ui/core";
import { Download as DownloadIcon } from "@geist-ui/icons";

import { useApi, useApi2, swrApi } from "../../hooks/useApi";

import useSWRMutation from "swr/mutation";

import Dropzone from "./Dropzone";
import { mutate } from "swr";

const supportedSources = [
  {
    name: "Archillect",
    link: "https://archillect.com",
    types: ["Post"],
    available: false,
    logo: "https://pbs.twimg.com/profile_images/1045579977067024384/S0luKMwQ_400x400.jpg",
  },
  {
    name: "Twitter",
    link: "https://twitter.com",
    types: ["Tweet", "Tweet Media", "Thread"],
    available: false,
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4n_urpJ9XpwOTdzBVbGvactwHrPagYQrTJPYjxfxLGkSyu7nJZVqRVGAeohnPgKMrnKE&usqp=CAU",
  },
  {
    name: "Instagram",
    link: "https://instagram.com",
    types: ["Post", "Reel", "Profile"],
    available: true,
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/2048px-Instagram_logo_2016.svg.png",
  },
  {
    name: "Pinterest",
    link: "https://pinterest.com",
    types: ["Board", "Pin", "Profile"],
    available: false,
    logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Pinterest-logo.png",
  },
];

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

async function createStar(url, { arg }) {
  // console.log("url?: ", url);
  console.log("create star start");
  let path = "stars";

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

const SubmitLinkSection = (props) => {
  // const linkHandler = (e) => {
  //     setValue(e.)
  // }

  const [noteValue, setNoteValue] = useState("");

  const [collectLinkInputValue, setCollectLinkInputValue] = useState("");

  const onChangeCollectLinkInputValue = (e) => {
    setCollectLinkInputValue(e.target.value);
  };

  const [processingSubmission, setProcessingSubmission] = useState(false);

  const {
    trigger: triggerCreateStar,
    isMutating: isMutatingCreateStar,
    data: createStarData,
    error: createStarError,
  } = useSWRMutation("/stars", createStar /* options */);

  const onClickSubmitLink = async () => {
    console.log("onclicksubmit link start");
    try {
      console.log("collectlinkinputvalue: ", collectLinkInputValue);
      const data = await triggerCreateStar(
        {
          star_title: collectLinkInputValue,
        } /* options */
      );

      const star = data?.data || [];

      if (star.star_id && star.star_title) {
        setNoteValue(`Created star_id ${star.star_id}: '${star.star_title}'`);
      } else {
        setNoteValue(`Failed to create star.`);
      }

      mutate(
        {
          path: "stars",
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
    setCollectLinkInputValue("");
  };

  return (
    <>
      <Text h4>Enter your link</Text>

      <div style={{ display: "flex", flexDirection: "row" }}>
        <Input
          label="https://"
          placeholder="downloadfromhere.com/?i=4683498"
          width="100%"
          height="100%"
          value={collectLinkInputValue}
          onChange={onChangeCollectLinkInputValue}
        ></Input>
        <Spacer inline w={0.5} />

        <Button
          icon={<DownloadIcon />}
          auto
          type="secondary"
          onClick={onClickSubmitLink}
          loading={isMutatingCreateStar}
          disabled={isMutatingCreateStar}
        >
          Collect
        </Button>
      </div>

      {noteValue && (
        <>
          <Spacer h={1} />
          <Note label={false} type="success">
            {noteValue}
          </Note>
        </>
      )}
    </>
  );
};

const SubmitUploadSection = (props) => {
  return (
    <>
      <Text h4>Upload your files</Text>
      {/* https://www.npmjs.com/package/react-use-file-upload */}
      <Dropzone />
    </>
  );
};

const SubmitTextSection = (props) => {
  return (
    <>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Text h4>Enter your text</Text>
        <Textarea
          width="100%"
          height="200px"
          placeholder="Write something interesting."
        />
        <Spacer h={0.5} />

        <Button
          icon={<DownloadIcon />}
          auto
          type="secondary"
          style={{ alignSelf: "flex-end" }}
        >
          Collect
        </Button>
      </div>
    </>
  );
};

const SubmitSectionWrapper = (props) => {
  return (
    <>
      <Spacer h={2} />
      {props.children}
      <Spacer h={3} />
    </>
  );
};

const TemplatePage = () => {
  return (
    <>
      <Text h2>Collect</Text>
      <Tabs initialValue="1">
        <Tabs.Item label="Link" value="1">
          {
            <SubmitSectionWrapper>
              <SubmitLinkSection />
            </SubmitSectionWrapper>
          }
        </Tabs.Item>
        <Tabs.Item label="Upload" value="2">
          {
            <SubmitSectionWrapper>
              <SubmitUploadSection />
            </SubmitSectionWrapper>
          }
        </Tabs.Item>
        <Tabs.Item label="Text" value="3">
          {
            <SubmitSectionWrapper>
              <SubmitTextSection />
            </SubmitSectionWrapper>
          }
        </Tabs.Item>
      </Tabs>
      <Divider />
      <Spacer h={1} />
      <Text h3>Supported Sources</Text>
      <Grid.Container gap={2} justify="">
        {supportedSources.map((source, index) => {
          return (
            <Grid xs={24} sm={12} md={8} lg={6} key={index + source.name}>
              <Card
                shadow
                width="100%"
                style={{ display: "flex", flexDirection: "column" }}
              >
                <Image
                  src={source.logo}
                  draggable={false}
                  style={{ aspectRatio: "1" }}
                  padding={"20px"}
                  width={"100%"}
                />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    height: "28px",
                  }}
                >
                  <Text h4 my={0}>
                    {source.name}
                  </Text>
                  {!source.available && (
                    <Tag type="lite" style={{ marginLeft: "auto" }}>
                      Coming Soon
                    </Tag>
                  )}
                </div>

                <Spacer h={1} />
                <Description
                  title="Supported Items"
                  content={
                    <ul style={{ flex: "1 1", fontWeight: "400" }}>
                      {source.types.map((type, index2) => {
                        return <li key={index2}>{type}</li>;
                      })}
                    </ul>
                  }
                />

                {/* <Text>Introduced in HTTP/1.0, HTTP headers make this protocol easy to extend and experiment with. New functionality can even be introduced by a simple agreement between a client and a server about a new header's semantics.</Text> */}
                <Card.Footer style={{ marginTop: "auto" }}>
                  <Link color target="_blank" href={source.link} icon>
                    Explore {source.name}
                  </Link>
                </Card.Footer>
              </Card>
            </Grid>
          );
        })}
      </Grid.Container>
    </>
  );
};

export default TemplatePage;
