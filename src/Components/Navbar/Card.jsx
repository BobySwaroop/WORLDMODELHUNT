import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useFirebase ,db } from "../firebase-config";
import { doc, deleteDoc, collection, getDocs } from "firebase/firestore"
import "../../App.css";

const Card = (props) => {
  const [array, setarray] = useState([]);
  const databse = collection(db, "imageUploads")
  const firebase = useFirebase();

  const [url, setURL] = useState(null);
  useEffect(() => {
    firebase.getImageURL(props.url).then((url) => setURL(url));
    getData();
  
  }, []);
  
  const handleDownloadClick = (url) => {
    window.open(url, "_blank");
  };
  // fetch the data
  const getData = async () =>{
    const data = await getDocs(databse);
    setarray(data.docs.map((item)=> {
      return { ...item.data(), id: item.id }
    }))
  }
  // delete the record
  const handleDeleteClick = (id) => {
    let deletedata = doc(db, "imageUploads", id)
    deleteDoc(deletedata)
    .then(()=> {
      alert("Delete Record");
    })
    .catch((err)=> {
      console.log(err);
    })
  }
  {array.map((item) => {

  
  return (
    
    <div className="container bg-light w-75 main-contianer loadata mt-4">
      <div className="row">
        <div className="col-md-6">
          <img className="img-thumbnail m-3" src={url} />
        </div>
        <div className="col-md-6 userdata">
          <div className="">
            <p className="form-control m-2 deta">
              <b>Name: </b>
              {props.name}
            </p>
            <p className="form-control m-2 deta">
              <span>
                <b>Model:</b>{" "}
              </span>
              {props.model}
            </p>
            <p className="form-control m-2 deta">
              <span>
                <b>Credit:</b>{" "}
              </span>
              {props.credit}
            </p>
            <p className="form-control m-2 deta">
              <span>
                <b>Caption:</b>{" "}
              </span>
              {props.caption}
            </p>
            <Link path="#" className="btn btn-danger m-2 float-end" onClick={ () => handleDeleteClick(item.id)}>
              Delete
            </Link>
            <Link path="#" className="btn btn-success m-2 float-end" onClick={() => handleDownloadClick(props.url)}>
              Download
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
})}
};

export default Card;
