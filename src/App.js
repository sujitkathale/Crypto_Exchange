import "./App.css";
import axios from "axios";
import Coin from "./components/Coin";
import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";

function App() {

  const [icon, setIcon] = useState([]);
  const [search, setSearch] = useState("");
  const apiKey = "3E451530-B17D-42C5-A2F3-D80E32322D16";

  const [pageNumber, setPageNumber] = useState(0);
  const iconPerPage = 10;
  const pagesVisited = pageNumber * iconPerPage;

  // const pageCount = Math.ceil(icon.length / iconPerPage);
  const pageCount = Math.ceil(50 / iconPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  useEffect(() => {
    axios.get(
      `https://rest.coinapi.io/v1/exchanges/icons/32?apikey=${apiKey}`
    )
      .then((res) => {
        axios.get(
          `https://rest.coinapi.io/v1/exchanges?apikey=${apiKey}`
        )
          .then((res2) => {
            console.log(res2.data);
            var iconData = res.data
            var exchangeDetails = res2.data
            var newData = iconData.map((el) => {
              var Index = 0
              var filteredData = exchangeDetails.filter((ele, index) => {
                if (el.exchange_id == ele.exchange_id) {
                  return ele
                }
              })
              var filteredObj = filteredData.length !== 0 ? filteredData[0] : {}
              var newData1 = {
                ...el,
                ...filteredObj
              }
              return newData1
            })
            console.log(newData)
            setIcon(newData)
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));

  }, []);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredCoins = icon.filter((coin) =>
    coin.exchange_id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="coin-app">
      <h2>Top crypto exchange</h2>
      <br />
      <h4 className="coin-Text">Exchange</h4>
      <div className="coin-search">
        <input
          type="search"
          placeholder="Find an exchange"
          className="coin-input"
          onChange={handleChange}
        />
      </div>
      {filteredCoins
        .slice(pagesVisited, pagesVisited + iconPerPage).map((coin) => {
          return (
            <Coin
              key={coin.exchange_id}
              url={coin.url}
              name={coin.exchange_id}
              trade24Volume={coin.volume_1day_usd}
            />
          );
        })}
      <br />
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"paginationBttns"}
        previousLinkClassName={"previousBttn"}
        nextLinkClassName={"nextBttn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
      />
    </div>
  );

}

export default App;
