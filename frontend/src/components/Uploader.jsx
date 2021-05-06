import React, { useEffect, useState } from "react";
import axios from "axios";
import Preview from "./Preview";

const Uploader = ({ logged }) => {
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [success, setSuccess] = useState(false);
  const [url, setUrl] = useState("");
  const [fileFinal, setFileFinal] = useState("");
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState(5);
  const [sizeSelector, setSizeSelector] = useState("");
  const [sizes, setSizes] = useState([]);
  const [product, setProduct] = useState({
    name: "",
    desc: "",
    src: "",
    size: "",
    price: 0,
  });

  //PRICING ARRAYS
  const square = "square";
  const notSquare = "notSquare";

  const squareSizes = [
    {
      display: '16x16"',
      sku: "ART-FAP-SAP-16X16",
      basePrice: (7.5 + price) * 1.3,
    },
    {
      display: '8x8"',
      sku: "ART-FAP-SAP-8X8",
      basePrice: (3 + price) * 1.3,
    },
  ];

  const notSquareSizes = [
    {
      display: '18x24"',
      sku: "ART-FAP-SAP-18X24",
      basePrice: (9.5 + price) * 1.3,
    },
    {
      display: '12x16"',
      sku: "ART-FAP-SAP-12X16",
      basePrice: (6 + price) * 1.3,
    },
    {
      display: '9x12"',
      sku: "ART-FAP-SAP-9X12",
      basePrice: (3.5 + price) * 1.3,
    },
  ];

  //HANDLERS
  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleDesc = (e) => {
    setDesc(e.target.value);
  };
  const handlePrice = (e) => {
    setPrice(parseFloat(e.target.value));
    setSizeSelector("");
  };
  const handleSizes = (e) => {
    setSizeSelector(e.target.value);
  };

  const sizeSetter = () => {
    if (sizeSelector === "square") {
      setSizes(squareSizes);
    }

    if (sizeSelector === "notSquare") {
      setSizes(notSquareSizes);
    }
  };

  useEffect(() => {
    sizeSetter();
  }, [sizeSelector, setSizeSelector]);

  const handleChange = (e) => {
    setFileFinal(e.target.files[0]);
    console.log(fileFinal);
  };

  const handlePreviewSubmit = (e) => {
    e.preventDefault();
    setProduct({
      name: name,
      desc: desc,
      src: url,
      size: sizes,
      price: price,
    });
    console.log(JSON.stringify(product));
  };

  //Handling Upload
  const handleUpload = (e) => {
    e.preventDefault();

    let file = fileFinal;
    //Splitting filename
    let fileParts = fileFinal.name.split(".");
    let fileName = fileParts[0];
    let fileType = fileParts[1];

    console.log("Preparing upload");

    axios
      .post("http://localhost:3001/api/sign_s3", {
        fileName: fileName,
        fileType: fileType,
      })
      .then((response) => {
        let returnData = response.data.data.returnData;
        let signedRequest = returnData.signedRequest;
        let urlnew = returnData.url;
        setUrl(urlnew);
        console.log("Recieved a signed request " + signedRequest);

        const options = {
          headers: {
            "Content-Type": fileType,
          },
        };

        axios
          .put(signedRequest, file, options)
          .then((result) => {
            console.log("Response from s3" + result);
            setUploadSuccess(true);
          })
          .catch((error) => {
            alert("ERROR" + JSON.stringify(error));
            setUploadSuccess(false);
          });
      });
  };

  const handleSubmit = async () => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    };
    try {
      const fetchResponse = await fetch(
        "http://localhost:3001/api/products/new",
        options
      );

      const data = await fetchResponse.json();
      console.log(data);
      setSuccess(true);
    } catch (error) {
      console.log(JSON.stringify(error));
      setSuccess(false);
    }
    if (success === true) {
      setName("");
      setDesc("");
      setPrice(5);
      setSizes("");
      setUrl("");
      setFileFinal("");
    }
  };

  return (
    <div>
      {logged ? (
        <div className="uploader-wrapper">
          <div>
            <form>
              <div className="image-upload">
                <h1>Upload Image</h1>
                <input type="file" onChange={handleChange} />
                <button onClick={handleUpload}>Upload</button>
                <br />
                <a href={url}>File found here</a>
              </div>
              <div className="product-details">
                <label htmlFor="name">Product name:</label>
                <input
                  onChange={handleName}
                  value={name}
                  type="text"
                  name="name"
                />
                <label htmlFor="desc">Description:</label>
                <textarea
                  onChange={handleDesc}
                  value={desc}
                  name="desc"
                  cols="30"
                  rows="5"
                ></textarea>
                <label htmlFor="price">
                  Price(the cost of printing will be added to this value
                  automatically)
                </label>
                <input
                  onChange={handlePrice}
                  value={price}
                  type="number"
                  name="price"
                />
                <label htmlFor="sizes">Sizes: </label>
                <select
                  onChange={handleSizes}
                  value={sizeSelector}
                  name="size"
                  // multiple={true}
                >
                  <option value="" selected>
                    Select sizing options
                  </option>
                  <option value={square}>Square</option>
                  <option value={notSquare}>3x4</option>
                </select>
                <button
                  onClick={handlePreviewSubmit}
                  disabled={
                    sizeSelector === "" ||
                    name === "" ||
                    desc === "" ||
                    uploadSuccess === false
                  }
                  type="submit"
                >
                  Preview
                </button>
              </div>
            </form>
            <Preview item={product} />
            <button onClick={handleSubmit}>Submit product</button>
          </div>
        </div>
      ) : (
        <div className="uploader-wrapper">
          <h1>ACCESS DENIED</h1>
        </div>
      )}
    </div>
  );
};

export default Uploader;
