import { useState, useEffect } from "react";

async function getAllStocks() {
  const url = "http://fosapps01.qut.edu.au:3000/all";
  let res = await fetch(url);
  let data = await res.json();
  return makeUnique(data);
}

async function getSymbolStocks(search) {
  if (!search) return [];
  const url = "http://fosapps01.qut.edu.au:3000/" + ("all?symbol=" + search);
  let res = await fetch(url);
  let data = await res.json();
  return makeUnique(data);
}

async function getStockHistory(search) {
  if (!search) return [];
  const url =
    "http://fosapps01.qut.edu.au:3000/" + ("history?symbol=" + search);
  let res = await fetch(url);
  let data = await res.json();
  return data;
}

async function getStockDates(search, date) {
  if (!search) return [];
  const url =
    "http://fosapps01.qut.edu.au:3000/" +
    ("history?symbol=" + search + "&from=" + date);
  let res = await fetch(url);
  let data = await res.json();
  return data;
}

function makeUnique(data) {
  const uniqueStockKeys = {};
  const uniqueStocks = [];

  data.map((stock) => {
    const key = stock.symbol;

    if (key in uniqueStockKeys) return;

    uniqueStockKeys[key] = key;
    uniqueStocks.push(stock);
  });

  return uniqueStocks;
}

function useAllStocks() {
  const [loading, setLoading] = useState(true);
  const [stockNames, setStockNames] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setStockNames(await getAllStocks());
        setLoading(false);
        setError(null);
      } catch (err) {
        setError(error);
        setLoading(false);
      }
    })();
  }, []);

  return {
    loading,
    stockNames, // stockNames is an array of objects
    error,
  };
}

function useSymbolStocks(search) {
  const [loading, setLoading] = useState(true);
  const [stockNames, setStockNames] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    (async () => {
      try {
        setStockNames(await getSymbolStocks(search));
        setLoading(false);
        setError(null);
      } catch (err) {
        setError(error);
        setLoading(false);
      }
    })();
  }, [search]);
  return {
    loading,
    stockNames, // stockNames is an array of objects
    error,
  };
}

function useStockHistory(search) {
  const [loading, setLoading] = useState(true);
  const [stockNames, setStockNames] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    (async () => {
      try {
        setStockNames(await getStockHistory(search));
        setLoading(false);
        setError(null);
      } catch (err) {
        setError(error);
        setLoading(false);
      }
    })();
  }, [search]);
  return {
    loading,
    stockNames, // stockNames is an array of objects
    error,
  };
}

function useStockDates(search, date) {
  const [loading, setLoading] = useState(true);
  const [stockNames, setStockNames] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    (async () => {
      try {
        setStockNames(await getStockDates(search, date));
        setLoading(false);
        setError(null);
      } catch (err) {
        setError(error);
        setLoading(false);
      }
    })();
  }, [search, date]);
  return {
    loading,
    stockNames, // stockNames is an array of objects
    error,
  };
}

export { useAllStocks, useSymbolStocks, useStockHistory, useStockDates };
