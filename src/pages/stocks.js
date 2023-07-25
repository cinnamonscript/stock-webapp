import "../styles/stocks.css";
import React, { useState, useEffect } from "react";
import { useAllStocks, useSymbolStocks } from "../api/api"; // import from a local file
import { SearchBar } from "../components/search-bar"; // import from a local file
import { SelectCategory } from "../components/select-category"; // import from a local file
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import { Badge } from "reactstrap";
import { Link } from "react-router-dom";

export function actionButton(params) {
  console.log(params);
  var stock = params.value;
  console.log(stock);
  return stock;
}

const columns = [
  {
    headerName: "Symbol",
    field: "symbol",
    sortable: true,
    resizable: true,
    width: "205px",
    cellRendererFramework: (params) => (
      <div>
        <p>
          <Link to={"./stocksinfo/" + params.data.symbol}>
            {params.data.symbol}
          </Link>
        </p>
      </div>
    ),
  },
  {
    headerName: "Name",
    field: "name",
    sortable: true,
    resizable: true,
    width: "350px",
  },
  {
    headerName: "Industry",
    field: "industry",
    resizable: true,
    width: "235px",
  },
];

export default function Home() {
  const [symbolSearch, setSymbolSearch] = useState(""); // sets the search input to be filtered
  const [searchContains, setSearchContains] = useState("");
  const {
    loading: allLoading,
    stockNames: allStockNames,
    error: allError,
  } = useAllStocks(); // endpoint #1 to show all stocks
  const [industry, setIndustry] = useState(null); // setting industry list for react-select dropdown
  const {
    loading: symbolLoading,
    stockNames: symbolStockNames,
    error: symbolError,
  } = useSymbolStocks(symbolSearch); // endpoint #2 to search
  const [filteredStock, setFilteredStock] = useState([]);

  useEffect(() => {
    // if there is a search input, to filter by symbol
    const data = symbolSearch ? symbolStockNames : allStockNames; // if have an symbol search, filter symbol stocks, else filter all stocks
    const result = data.filter((stock) =>
      stock.symbol.toLowerCase().includes(symbolSearch)
    );
    const filteredResult = result.filter((stock) =>
      stock.name.toLowerCase().includes(searchContains)
    );
    const industryFilteredResult = industry
      ? filteredResult.filter((stock) => stock.industry.includes(industry))
      : filteredResult;
    setFilteredStock(industryFilteredResult);
  }, [allStockNames, symbolSearch, symbolStockNames, searchContains, industry]);

  const duplicateIndustries = allStockNames.map((s) => s.industry); // result of the map is an array
  const industries = new Set(duplicateIndustries); // creating a unique set of the values in the array
  const selectOptions = [...industries].map((industry) => {
    // mapping this back into an array
    return {
      label: industry,
      value: industry,
    };
  });
  selectOptions.unshift({
    // adding value 'null' back into the start of array to show all stocks
    label: "All Stocks",
    value: null,
  });

  if (allLoading || symbolLoading) {
    // if loading
    return <p>Loading...</p>;
  }

  if (allError || symbolError) {
    // if error
    return <p>Something went wrong: {(allError ?? symbolError).message}</p>; // takes the first not-null value
  }

  return (
    <div>
      <div class="title d-flex justify-content-center">
        <h1>List of Stocks</h1>
      </div>

      <div class="row">
        <div class="search-title-row d-flex justify-content-around">
          <p class="search-title-starts">Symbol contains:</p>
          <p class="search-title-contains">Name contains:</p>
          <p class="select-title-industry">Select industry:</p>
        </div>
      </div>

      <div class="row">
        <div class="search-row d-flex justify-content-around">
          <SearchBar
            class="search-bar-starts"
            placeholder="Enter Symbol"
            onSearch={setSymbolSearch}
          />

          <SearchBar
            class="search-bar-contains"
            placeholder="Search name"
            onSearch={setSearchContains}
          />
          <div class="select-industry p-3">
            <SelectCategory
              options={selectOptions}
              setCategory={setIndustry}
              placeholder="Select Industry"
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
            width: "800px",
          }}
        >
          <AgGridReact
            columnDefs={columns}
            rowData={filteredStock}
            pagination={true}
            paginationPageSize={15}
          />
        </div>
      </div>
    </div>
  );
}
