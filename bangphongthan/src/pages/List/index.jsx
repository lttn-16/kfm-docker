import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const backgroundStyle = {
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const listStyle = {
  width: "300px",
  height: "auto",
  margin: "0 auto",
  padding: "20px",
  borderRadius: "10px",
  textAlign: "center",
  background: "linear-gradient(to bottom, #FFEB3B, #FBC02D)",
};

const headerStyle = {
  fontSize: "24px",
  fontWeight: "bold",
  marginBottom: "20px",
};

const topThreeStyle = {
  display: "flex",
  justifyContent: "space-around",
  marginBottom: "20px",
};

const playerStyle = {
  display: "flex",
  alignItems: "center",
  borderBottom: "1px solid #ccc",
  padding: 10,
};

const playerItemStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "10px 0",
  background: "white",
  height: "20px",
  borderRadius: 10,
  width: "100%",
  padding: 10,
  marginLeft: "10px",
};

const topPlayerStyle = {
  textAlign: "center",
};

const iconStyle = {
  width: "30px",
  height: "30px",
  borderRadius: "50%",
};

const largeIconStyle = {
  width: "40px",
  height: "40px",
  borderRadius: "50%",
};

const rankTopStyle = {
  width: "40px",
  textAlign: "center",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontWeight: "bold",
  marginLeft: "10px",
};

const rankStyle = {
  width: "40px",
  height: "40px",
  background: "white",
  borderRadius: "10px",
  textAlign: "center",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontWeight: "bold",
  color: "#FFA500",
};

const playerNameStyle = {
  flex: "1",
  textAlign: "left",
  paddingLeft: "10px",
};

const pointsStyle = {
  fontSize: "16px",
  fontWeight: "bold",
  color: "#FFA500",
};

const players = [
  { rank: "1", points: 30 },
  { rank: "2", points: 20 },
  { rank: "3", points: 10 },
  { rank: "4", points: 5 },
  { rank: "5", points: 4 },
  { rank: "6", points: 4 },
  { rank: "7", points: 4 },
  { rank: "8", points: 4 },
  { rank: "9", points: 4 },
  { rank: "10", points: 4 },
  { rank: "11", points: 4 },
  { rank: "12", points: 4 },
  { rank: "13", points: 4 },
  { rank: "14", points: 4 },
  { rank: "15", points: 4 },
  { rank: "16", points: 4 },
];

const list = () => {
  const [data, setData] = useState();

  const handleGetData = async () => {
    const res = await axios.get("http://api.localhost/reports", {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("res", res);
  };

  useEffect(() => {
    handleGetData();
  }, []);

  return (
    <div style={backgroundStyle}>
      <div style={listStyle}>
        <div style={headerStyle}>BẢNG PHONG THẦN</div>
        <div style={topThreeStyle}>
          <div style={topPlayerStyle}>
            <div style={rankTopStyle}>
              2<sup>nd</sup>
            </div>
            <img
              src="https://www.iconpacks.net/icons/free-icons-6/free-user-yellow-circle-icon-20550-thumb.png"
              alt="Player Icon"
              style={largeIconStyle}
            />
            <div>PLAYER</div>
            <div style={pointsStyle}>20</div>
          </div>
          <div style={topPlayerStyle}>
            <div style={{ ...rankTopStyle, marginTop: -20 }}>
              1<sup>st</sup>
            </div>
            <img
              src="https://www.iconpacks.net/icons/free-icons-6/free-user-yellow-circle-icon-20550-thumb.png"
              alt="Player Icon"
              style={largeIconStyle}
            />
            <div>PLAYER</div>
            <div style={pointsStyle}>30</div>
          </div>
          <div style={topPlayerStyle}>
            <div style={rankTopStyle}>
              3<sup>rd</sup>
            </div>
            <img
              src="https://www.iconpacks.net/icons/free-icons-6/free-user-yellow-circle-icon-20550-thumb.png"
              alt="Player Icon"
              style={largeIconStyle}
            />
            <div>PLAYER</div>
            <div style={pointsStyle}>10</div>
          </div>
        </div>
        <div
          style={{
            height: `calc(100vh - 250px)`,
            overflowY: "scroll",
          }}
        >
          {players.slice(3).map((player, index) => (
            <div key={index} style={playerStyle}>
              <div style={rankStyle}>{player.rank}</div>
              <div style={playerItemStyle}>
                <img
                  src="https://www.iconpacks.net/icons/free-icons-6/free-user-yellow-circle-icon-20550-thumb.png"
                  alt="Player Icon"
                  style={iconStyle}
                />
                <div style={playerNameStyle}>PLAYER</div>
                <div style={pointsStyle}>{player.points}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default list;
