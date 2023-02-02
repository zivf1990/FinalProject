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
  }, []);

  const getCategories = async () => {
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
  };

  return (
    <div className="categories">
      <MDBRow className="row-cols-1 row-cols-md-4 g-4 gap-5 m-4 justify-content-center">
        {categories && (
          <>
            {categories.map((item) => (
              <MDBCard
                key={Math.random() * Number.MAX_SAFE_INTEGER}
                className="p-0 card"
                onClick={() => {
                  navigate("/category/" + item.category_id);
                }}
              >
                <MDBCardImage
                  src="https://images.pexels.com/photos/40185/mac-freelancer-macintosh-macbook-40185.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  position="top"
                  alt="..."
                />

                <MDBCardTitle>{item.category_name}</MDBCardTitle>
              </MDBCard>
            ))}
          </>
        )}
      </MDBRow>
    </div>
  );
};

export default Shop;
