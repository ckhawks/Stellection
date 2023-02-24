import {
  Collapse,
  Text,
  Card,
  Grid,
  Fieldset,
  Button,
  Image,
} from "@geist-ui/core";

import { useApi } from "../../hooks/useApi";

const HomePage = (props) => {
  const { data, error, isLoading } = useApi({
    path: "test/people",
    method: "get",
  });
  console.log("data: " + data);
  if (error) console.log("error: " + error);
  if (isLoading) console.log("loading");

  return (
    <>
      <Text h1>Collect</Text>
      content
      <br />
      content
      <br />
      content
      <br />
      content
      <br />
      <Grid.Container gap={2} justify="center">
        {error && !isLoading && <h2>Error. Failed to fetch users.</h2>}
        {isLoading && <h2>Loading...</h2>}
        {!isLoading &&
          data &&
          data.map((user, index) => {
            return (
              <Grid xs={6} md={6} key={index}>
                <Card shadow width="100%">
                  <Image
                    height="200px"
                    width="400px"
                    draggable={false}
                    src={user.avatar}
                  />
                  <Text h4 my={0}>
                    {user.name}
                  </Text>

                  <Text>Age: {user.age}</Text>
                </Card>
              </Grid>
            );
          })}
      </Grid.Container>
      content
      <br />
      content
      <br />
      content
      <br />
      content
      <br />
      content
      <br />
      content
      <br />
      content
      <br />
      content
      <br />
      content
      <br />
      <br />
      <Card shadow>
        <Text h4 my={0}>
          HTTP is extensible
        </Text>
        <Text>
          Introduced in HTTP/1.0, HTTP headers make this protocol easy to extend
          and experiment with. New functionality can even be introduced by a
          simple agreement between a client and a server about a new header's
          semantics.
        </Text>
      </Card>
      <br />
      <Grid.Container gap={2} justify="center">
        <Grid xs={7}>
          <Card shadow width="100%">
            <Text h3 my={0}>
              Card 1
            </Text>
            <Text>
              Introduced in HTTP/1.0, HTTP headers make this protocol easy to
              extend and experiment with. New functionality can even be
              introduced by a simple agreement between a client and a server
              about a new header's semantics.
            </Text>
          </Card>
        </Grid>
        <Grid xs={12}>
          <Card shadow width="100%">
            <Text h3 my={0}>
              Card 2
            </Text>
            <Text>
              Introduced in HTTP/1.0, HTTP headers make this protocol easy to
              extend and experiment with. New functionality can even be
              introduced by a simple agreement between a client and a server
              about a new header's semantics.
            </Text>
          </Card>
        </Grid>
        <Grid xs={5}>
          <Card shadow width="100%">
            <Text h3 my={0}>
              Card 3
            </Text>
            <Text>
              Introduced in HTTP/1.0, HTTP headers make this protocol easy to
              extend and experiment with. New functionality can even be
              introduced by a simple agreement between a client and a server
              about a new header's semantics.
            </Text>
          </Card>
        </Grid>{" "}
      </Grid.Container>
      <br />
      content
      <br />
      content
      <br />
      <Fieldset>
        <Fieldset.Title>HTTP is simple</Fieldset.Title>
        <Fieldset.Subtitle>
          HTTP is generally designed to be simple and human readable, even with
          the added complexity introduced in HTTP/2 by encapsulating HTTP
          messages into frames. HTTP messages can be read and understood by
          humans, providing easier testing for developers, and reduced
          complexity for newcomers.
        </Fieldset.Subtitle>
        <Fieldset.Footer>
          HTTP Knowledge Base
          <Button auto scale={1 / 3} font="12px">
            OK
          </Button>
        </Fieldset.Footer>
      </Fieldset>
      content
      <br />
      content
      <br />
      <br />
      <Collapse.Group>
        <Collapse title="Question A" className="show">
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.Lorem ipsum dolor sit amet,
            consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat.Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat.Lorem ipsum dolor sit amet,
            consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat.Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat.Lorem ipsum dolor sit amet,
            consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat.Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat.Lorem ipsum dolor sit amet,
            consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat.Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat.Lorem ipsum dolor sit amet,
            consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat.Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat.Lorem ipsum dolor sit amet,
            consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat.Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat.Lorem ipsum dolor sit amet,
            consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat.Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat.
          </Text>
        </Collapse>
        <Collapse title="Question B" className="show">
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </Text>
        </Collapse>
      </Collapse.Group>
    </>
  );
};

export default HomePage;
