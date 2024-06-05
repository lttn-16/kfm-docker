import axios from "axios";
import React, { useMemo } from "react";
import { useEffect } from "react";
import { useState } from "react";

const backgroundStyle = {
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const listStyle = {
  width: "500px",
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
  marginLeft: "15px",
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

const List = () => {
  const [data, setData] = useState([]);
  const addCommaToNumber = (number, separator = ",") => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);
  };

  console.log('data', data);

  const formatAmount = (number, option = {}) => {
    const optionDefault = {
      notation: "compact",
      maximumFractionDigits: 3,
    };

    const extendOption = { ...optionDefault, ...option };
    return Intl.NumberFormat("en-US", extendOption).format(number);
  };

  const numberFormat = (value, roundDecimal = 3, separator = ",") => {
    let displayValue = value;
    let integerPart = Math.trunc(value);
    const decimalPart = Number(formatAmount(value - integerPart));
    const decimalPartRounded = +Math.abs(+decimalPart);
    if (decimalPartRounded >= 1) {
      integerPart += decimalPart > 0 ? 1 : -1;
    }
    displayValue = addCommaToNumber(integerPart, separator);
    if (decimalPartRounded > 0 && decimalPartRounded < 1) {
      displayValue += decimalPartRounded.toString().replace("0.", ".");
    }
    if (integerPart == 0 && value < 0) {
      displayValue = -displayValue;
    }

    return displayValue;
  };

  const sortedData = [...data].sort((a, b) => {
    if (b.count !== a.count) {
      return b.count - a.count;
    } else {
      return b.sum_duration - a.sum_duration;
    }
  });

  const topOne = sortedData[0];
  const topTwo = sortedData[1];
  const topThree = sortedData[2];

  const topUserIds = useMemo(() => {
    if (topOne && topTwo && topThree) {
      return new Set([topOne.user_id, topTwo.user_id, topThree.user_id]);
    }
  }, [topOne, topTwo, topThree]);

  const handleGetData = async () => {
    const res = await axios.get("http://api.localhost/reports", {
      headers: {
        "Content-Type": "application/json",
      },
    });

    setData(res.data);
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
            <div>{topTwo?.first_name}</div>
            <div style={pointsStyle}>{topTwo?.count} lần</div>
            <div style={pointsStyle}>
              {numberFormat(topTwo?.sum_duration)} phút
            </div>
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
            <div>{topOne?.first_name}</div>
            <div style={pointsStyle}>{topOne?.count} lần</div>
            <div style={pointsStyle}>
              {numberFormat(topOne?.sum_duration)} phút
            </div>
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
            <div>{topThree?.first_name}</div>
            <div style={pointsStyle}>{topThree?.count} lần</div>
            <div style={pointsStyle}>
              {numberFormat(topThree?.sum_duration)} phút
            </div>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <div
            style={{
              ...playerItemStyle,
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <div style={{ ...pointsStyle, width: "100px" }}>Lần</div>
            <div style={{ ...pointsStyle, width: "100px" }}>Phút</div>
          </div>
        </div>
        <div
          style={{
            height: `calc(100vh - 250px)`,
            overflowY: "scroll",
          }}
        >
          {data
            ?.filter((item) => !topUserIds.has(item?.user_id))
            ?.sort((a, b) => {
              if (b.count !== a.count) {
                return b.count - a.count;
              } else {
                return b.sum_duration - a.sum_duration;
              }
            })
            ?.map((item, index) => (
              <div key={index} style={playerStyle}>
                <div style={rankStyle}>{index + 1 + 3}</div>
                <div style={playerItemStyle}>
                  <img
                    src="https://www.iconpacks.net/icons/free-icons-6/free-user-yellow-circle-icon-20550-thumb.png"
                    alt="Player Icon"
                    style={iconStyle}
                  />
                  <div style={playerNameStyle}>{item.first_name}</div>
                  <div style={{ ...pointsStyle, width: "100px" }}>
                    {item?.count}
                  </div>
                  <div style={{ ...pointsStyle, width: "100px" }}>
                    {numberFormat(item?.sum_duration)}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default List;
