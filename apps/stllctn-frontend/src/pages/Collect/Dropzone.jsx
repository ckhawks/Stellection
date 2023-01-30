//*Dropzone.js*//

import React from "react";
import { useDropzone } from "react-dropzone";

function Dropzone({ open }) {
    const styles = {
        dropzone: {
            border: "1px rgba(0, 0, 0, .3) solid",
            padding: "20px",
            borderRadius: "4px"
        }
    }

  const { getRootProps, getInputProps } = useDropzone({});
  return (
    <div {...getRootProps({ className: "dropzone" })} style={styles.dropzone}>
      <input className="input-zone" {...getInputProps()} />
      <div className="text-center">
        <p className="dropzone-content">
          Drag and drop some files here, or click to select files.
        </p>
        
      </div>
    </div>
  );
}

export default Dropzone;