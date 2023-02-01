import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSessionID } from "../context/UserContext";
import "../style/shop.css";
import {
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";

const Shop = () => {
  const { sessionID } = useSessionID();
  const [categories, setCategories] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(sessionID);
    getCategories();
  }, [sessionID]);

  const getCategories = async () => {
    if (sessionID) {
      const res = await fetch(`http://localhost:8000/categories`, {
        method: "GET",
        headers: {
          "x-session-id": sessionID,
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      console.log("data: ", data);
      setCategories(data);
    }
  };

  return (
    <div className="categories">
      <MDBRow className="row-cols-1 row-cols-md-4 g-4 gap-5 m-4 justify-content-center">
        {categories && (
          <>
            {categories.map((item) => (
              <MDBCard
                key={Math.random() * Number.MAX_SAFE_INTEGER}
                className="p-0 bg-black card"
                onClick={() => {
                  navigate("/category/" + item.category_id);
                }}
              >
                <MDBCardImage
                  src="https://mdbootstrap.com/img/new/standard/nature/184.webp"
                  position="top"
                  alt="..."
                />

                <MDBCardTitle>{item.category_name}</MDBCardTitle>
                {/* <MDBCardText>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </MDBCardText> */}
                {/* <MDBBtn href="#">Button</MDBBtn> */}
              </MDBCard>
            ))}
          </>
        )}
      </MDBRow>
    </div>
  );
};

export default Shop;
