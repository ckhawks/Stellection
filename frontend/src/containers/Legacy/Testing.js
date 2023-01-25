import React, { useEffect, useState } from "react";

// bootstrap
import Form from "react-bootstrap/Form";
// import InputGroup from 'react-bootstrap/InputGroup';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

// font awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTag, faTrash, faPaperPlane } from "@fortawesome/free-solid-svg-icons";

const Testing = () => {
  console.log("TESTING");

  const [textvalue, setTextValue] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [starUploadFiles, setStarUploadFiles] = useState(null);

  const [clusters, setClusters] = useState({ clusters: [] });
  const [clusterCheckStates, setClusterCheckStates] = useState({});

  const starFileRef = React.useRef();

  async function fetchClusters() {
    const res = await fetch("http://127.0.0.1:5501/clusters", {
      method: "GET",
    });
    const data = await res.json();
    console.log("clusters: ");
    console.log(data);
    setClusters(data);
  }

  // fetches clusters, populates clusters state
  useEffect(() => {
    fetchClusters();
  }, []); // empty dependency array means this effect will only run once (like componentDidMount in classes)

  // populates checkedstates with the clusters we have
  useEffect(() => {
    console.log("clusters changed, updating clusterCheckStates");
    let updatedCheckedStates = {};
    for (let i = 0; i < clusters["clusters"].length; i++) {
      // console.log("e");
      // eslint-disable-next-line
      if (clusters["clusters"][i]["cluster_id"] in clusterCheckStates) {
        // key already exists (checkbox already on screen)
        // eslint-disable-next-line
        updatedCheckedStates[clusters["clusters"][i]["cluster_id"]] =
        // eslint-disable-next-line
          clusterCheckStates[clusters["clusters"][i]["cluster_id"]];
      } else {
        updatedCheckedStates[clusters["clusters"][i]["cluster_id"]] = false;
      }
    }
    setClusterCheckStates(updatedCheckedStates);
    console.log(updatedCheckedStates);
    // eslint-disable-next-line
  }, [clusters]);

  

  // function handleSubmit(event) {
  //   alert('A new cluster was submitted: ' + textvalue);
  //   event.preventDefault();
  // }

  function handleClick() {
    if (textvalue === "") {
      setStatusMessage("You must enter a cluster name!");
      return;
    }

    let clusterBody = {
      name: textvalue,
    };

    // fetch("http://127.0.0.1:5000/clusters", {
    //   method: "POST",
    //   mode: "cors",
    //   body: JSON.stringify(clusterBody),
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json'
    //   },
    // }).then(() => {
    //   setStatusMessage("Cluster " + textvalue + " created!")
    //   setTextValue("");
    //   fetchClusters(); // update local clusters
    // }).catch((error) => {
    //   setStatusMessage("Error: " + error);
    //   setTextValue("");
    // });

    fetch("http://127.0.0.1:5501/clusters", {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(clusterBody),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then(async (response) => {
        const isJson = response.headers
          .get("content-type")
          ?.includes("application/json");
        const data = isJson ? await response.json() : null;

        // check for error response
        if (!response.ok) {
          // get error message from body or defualt to response status
          const error = (data && data.message) || response.status;
          return Promise.reject(error);
        }

        // response.ok == true
        setStatusMessage("Created cluster " + textvalue + "!");
        setTextValue("");
        await fetchClusters(); // update local clusters list

        // element.innerHTML = JSON.stringify(data, null, 4);
      })
      .catch((error) => {
        // only catches network errors
        setStatusMessage(`Error: ${error}`);
        console.error("Error: ", error);
      });

    // handleSubmit();
  }

  function handleTextFieldChange(event) {
    console.log("handleTextFieldChanged");
    setTextValue(event.target.value);
  }

  async function handleUploadStarClick() {
    console.log("handleUploadStarClick");
    if (!(starUploadFiles === null)) {
      var formData = new FormData();

      for (let i = 0; i < starUploadFiles.length; i++) {
        formData.append("files", starUploadFiles[i]);
      }

      let addToClusters = [];
      for (let key in clusterCheckStates) {
        if (clusterCheckStates[key] === true) {
          addToClusters.push(key);
        }
      }

      formData.append("clusters", addToClusters);

      fetch("http://127.0.0.1:5501/stars", {
        method: "POST",
        body: formData,
      })
        .then(() => {
          setStatusMessage(
            "Uploaded " + starUploadFiles.length + " files as stars"
          );
          // starFileRef.current.files = null;
          starFileRef.current.value = "";
          setStarUploadFiles(null);
        })
        // .then((response) => response.json())
        // .then((result) => {
        //   console.log("Success: ", result);
        //   setStatusMessage("Success: " + result);
        // })
        .catch((error) => {
          console.log("Error: ", error);
          setStatusMessage("Error: " + error);
        });
    } else {
      setStatusMessage("You must select a file to upload!");
      console.log("NO FILE ATTACHED");
    }
  }

  function starFileUploadFieldChanged(event) {
    console.log("starFileUploadFieldChanged");
    setStarUploadFiles(event.target.files); // TODO file[S]
  }

  function handleOnClusterCheckChange(cluster_id) {
    console.log("checkbox " + cluster_id + " changed");

    let updatedCheckedStates = { ...clusterCheckStates };
    updatedCheckedStates[cluster_id] = !clusterCheckStates[cluster_id];

    setClusterCheckStates(updatedCheckedStates);
    console.log("updatedCheckedStates: ");
    console.log(updatedCheckedStates);
  }

  function handleDeleteCluster(cluster_id){
    // console.log("Deleting cluster_id " + cluster_id);

    fetch("http://127.0.0.1:5501/clusters/" + cluster_id, {
      method: "DELETE",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then(async (response) => {
        const isJson = response.headers
          .get("content-type")
          ?.includes("application/json");
        const data = isJson ? await response.json() : null;

        // check for error response
        if (!response.ok) {
          // get error message from body or defualt to response status
          const error = (data && data.message) || response.status;
          return Promise.reject(error);
        }

        // response.ok == true
        setStatusMessage("Deleted cluster " + cluster_id + "!");
        await fetchClusters(); // update local clusters list

        // element.innerHTML = JSON.stringify(data, null, 4);
      })
      .catch((error) => {
        // only catches network errors
        setStatusMessage(`Error: ${error}`);
        console.error("Error: ", error);
      });
  }

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ backgroundColor: "red" }}>{statusMessage}</div>

      <div style={{ backgroundColor: "lightgrey" }}>
        <h1>Create cluster</h1>
        <div style={{ display: "flex", flexDirection: "row", margin: "5px" }}>
          <input
            type="text"
            value={textvalue}
            onChange={handleTextFieldChange}
            placeholder="name"
          />
          <div
            onClick={handleClick}
            style={{
              textAlign: "center",
              width: "100px",
              border: "1px solid gray",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Create new cluster with name
          </div>
        </div>
      </div>

      <div style={{ backgroundColor: "lightgrey" }}>
        <h1>Clusters</h1>
        {clusters["clusters"].map((cluster) => (
          <div key={`cluster-${cluster.cluster_id}`} className="mb-3" style={{backgroundColor: "white", padding: "10px", margin: "5px", width: "200px"}}>
            <FontAwesomeIcon icon={faTag} />{cluster.cluster_id + ": " + cluster.cluster_name} 
            <div>
              <FontAwesomeIcon icon={faTrash} style={{float: "right", cursor: "pointer"}} onClick={() => {handleDeleteCluster(cluster.cluster_id)}}/>
            </div>
          </div>
        ))}
      </div>

      <Container fluid style={{ backgroundColor: "lightgreen", margin: "10px", padding: "10px" }}>
        <h1>Upload Stars</h1>
        <Row style={{flexDirection: "row"}}>
          <Col>
            <h3><FontAwesomeIcon icon={faTag} /> Clusters</h3>
            
            <div>
              {clusters["clusters"].map((cluster) => (
                <div key={`clusterCheckBox-${cluster.cluster_id}`} className="mb-3">
                  <Form.Check
                    type={"checkbox"}
                    id={`cluster-${cluster.cluster_id}`}
                    label={`${cluster.cluster_name}`}
                    onChange={() =>
                      handleOnClusterCheckChange(cluster.cluster_id)
                    }
                  ></Form.Check>
                </div>
              ))}
            </div>
          </Col>
          <Col>
            <label htmlFor="files">Select files</label>
            <input
              type="file"
              id="files"
              name="files"
              onChange={starFileUploadFieldChanged}
              ref={starFileRef}
              multiple
            />
          </Col>
          

          <Col>
            <Button variant="primary"
              onClick={handleUploadStarClick}
              // style={{
              //   textAlign: "center",
              //   width: "100px",
              //   border: "1px solid gray",
              //   borderRadius: "5px",
              //   cursor: "pointer",
              // }}
            >
              Create stars <FontAwesomeIcon icon={ faPaperPlane } />
            </Button>
          </Col>
          
        </Row>
      </Container>
      <div style={{ backgroundColor: "lightblue", padding: "10px" }}>
        <div>
          <input
            type="file"
            onChange={(event) => setStarUploadFiles(event.target.files[0])}
            // ref={starFileRef}
          />
          <button onClick={handleUploadStarClick}>Submit new star</button>
        </div>
      </div>
      <div>
        <Form>
          {["checkbox", "radio"].map((type) => (
            <div key={`default-${type}`} className="mb-3">
              <Form.Check
                type={type}
                id={`default-${type}`}
                label={`default ${type}`}
              />

              <Form.Check
                disabled
                type={type}
                label={`disabled ${type}`}
                id={`disabled-default-${type}`}
              />
            </div>
          ))}
        </Form>
      </div>
    </div>
  );
};

// be able to upload files with a predetermined tag

export default Testing;
