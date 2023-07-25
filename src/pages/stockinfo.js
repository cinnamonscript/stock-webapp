import "../styles/stocks.css";
import React, { useState, useEffect } from "react";
import { useStockHistory, useStockDates } from "../api/api"; // import from a local file
import { SearchBar } from "../components/search-bar"; // import from a local file
import { SelectCategory } from "../components/select-category"; // import from a local file
import { LineChart } from "../components/chart";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import { Badge } from "reactstrap";
import { useParams, useNavigate } from "react-router-dom";

const columns = [
  { headerName: "Date", field: "timestamp", sortable: true, width: "200px" },
  { headerName: "Open", field: "open", sortable: true, width: "150px" },
  { headerName: "High", field: "high", sortable: true, width: "150px" },
  { headerName: "Low", field: "low", sortable: true, width: "150px" },
  { headerName: "Close", field: "close", sortable: true, width: "150px" },
  { headerName: "Volumes", field: "volumes", sortable: true, width: "150px" },
];

export default function Home() {
  const navigate = useNavigate();
  const { symbol: symbolSearch } = useParams();
  const {
    loading: historyLoading,
    stockNames: historyStockNames,
    error: historyError,
  } = useStockHistory(symbolSearch);

  const [filteredStock, setFilteredStock] = useState([]);
  const [date, setDate] = useState(null); // setting industry list for react-select dropdown

  const {
    loading: datesLoading,
    stockNames: datesStockNames,
    error: datesError,
  } = useStockDates(symbolSearch, date);

  const stockDates = historyStockNames.map((s) => s.timestamp);
  const selectedStockNames = historyStockNames.map((s) => s.name);

  useEffect(() => {
    const data = date ? datesStockNames : historyStockNames;
    const newData = data.map((stock) => {
      stock.timestamp = stock.timestamp.replace("T14:00:00.000Z", "");
      return { ...stock };
    });
    setFilteredStock(newData);
  }, [symbolSearch, historyStockNames, datesStockNames, date]);

  /* --- THIS IS TO DO WITH LINE CHART --- */
  const stockClosingPrice = filteredStock.map((s) => s.close);
  const datesClosingPrice = filteredStock.map((s) => s.timestamp);
  const datesClosingPriceFormat = datesClosingPrice.map((element) => {
    var d = new Date(element);
    return `${d.getDate() - 1}/${d.getMonth() + 1}/${d.getFullYear()}`;
  });
  /* --- END OF LINE CHART --- */

  /* --- THIS IS TO DO WITH SELECT OPTIONS FOR DATES --- */
  const selectOptions = [...stockDates].map((timestamp) => {
    // mapping this back into an array
    return {
      label: timestamp.replace("T14:00:00.000Z", ""),
      value: timestamp,
    };
  });
  /* --- END OF SELECT OPTIONS FOR DATES --- */

  if (historyLoading || datesLoading) {
    // if loading
    return <p>Loading...</p>;
  }

  if (historyError || datesError) {
    // if error
    return <p>Something went wrong: {(historyError ?? datesError).message}</p>; // takes the first not-null value
  }

  return (
    <div>
      <div class="title d-flex justify-content-center">
        <h1>Showing Stocks for {selectedStockNames[0]}</h1>
      </div>

      <div class="row">
        <div class="search-row d-flex justify-content-around">
          <div class="select-industry p-3">
            <p class="select-title-date">
              Show stock information from select date:
            </p>
            <SelectCategory
              options={selectOptions}
              setCategory={setDate}
              placeholder="Choose Date"
            />
          </div>
        </div>
      </div>

      <div class="container-fluid">
        <div class="row">
          <p class="stock-count d-flex justify-content-center">
            Displaying <Badge colour="success">{filteredStock.length}</Badge>{" "}
            {filteredStock.length == 1 ? "Stock" : "Stocks"}
          </p>
        </div>

        <div
          className="ag-theme-balham"
          style={{
            height: "500px",
            width: "953px",
          }}
        >
          <AgGridReact
            domLayout="autoHeight"
            columnDefs={columns}
            rowData={filteredStock}
            pagination={true}
            paginationPageSize={12}
          />
        </div>

        <div class="row">
          <p class="line-chart-title">Closing Price</p>
          <div class="line-chart d-flex justify-content-around">
            <LineChart
              dates={datesClosingPriceFormat.reverse()}
              stockClose={stockClosingPrice.reverse()}
            />
          </div>
        </div>

        <div class="row">
          <p class="search-title-info">
            If you would like look up another stock, enter exact symbol:
          </p>
          <div class="search-row d-flex justify-content-around">
            <SearchBar
              class="search-bar-info"
              placeholder={symbolSearch}
              value={symbolSearch}
              onSearch={(text) => navigate("/stocks/stocksinfo/" + text)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
