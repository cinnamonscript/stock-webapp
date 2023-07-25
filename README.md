# Stock Information Web App

This repository contains a simple web application built using React that connects to a free QUT API to fetch and display stock information. The purpose of this project is to provide users with an easy-to-access platform to view stock information in an organized manner. The web application allows users to filter the database of stocks based on stock symbol, stock name, and stock industry, and further explore detailed information about a selected stock, including open, high, low, close prices, and volume of trade for each date. Additionally, users can view a graph displaying the closing prices of selected dates and apply date-based filtering.

## Functionality and Implementation

### Web Application

The web application offers the following features:

1. **Filtering**: Users can filter the stocks database using stock symbols, stock names, and stock industries.

2. **Detailed Information**: Users can select a specific stock to view detailed information about it, including open, high, low, and close prices, along with the trading volume for each date.

3. **Graphical Representation**: A graph displaying the closing price of the selected stock for specific dates is available.

4. **Date Filtering**: Users can filter the stock information based on specific dates.

### Data Source

The stock market statistic data is fetched from a free API provided by QUT (Queensland University of Technology). The API endpoint used are as follows:

1. **/all (GET)**: Returns an array of all available stocks.

2. **/all?symbol=xxx (GET)**: Returns information for stocks that have a symbol containing the search term "xxx".

3. **/history?symbol=xxx (GET)**: Returns comprehensive information about a specific stock, including prices, volumes, and dates.

4. **/history?symbol=xxx&from=yyyy-mm-dd (GET)**: Returns information about a particular stock starting from a selected date "yyyy-mm-dd".

## How to Use the Web Application

1. Clone the repository to your local machine.
2. Install the necessary dependencies using npm or yarn.
3. Ensure you have access to the QUT VPN for retrieving the stock market data from the QUT API.
4. Run the web application locally on your preferred web browser.
5. Use the provided search and filter options to explore stock information.
6. Select a stock to view detailed information and use the date filtering feature to narrow down the results.
7. Analyze the graphical representation of the closing prices for specific dates.

## Technologies Used

- React: The web application is developed using React, a popular JavaScript library for building user interfaces.
- QUT API: The stock market data is fetched using the QUT API, accessible through QUT VPN.

## Disclaimer

This web application uses a free API provided by QUT, and the availability and reliability of the data depend on the API's status. The developers are not responsible for any inaccuracies or issues with the stock information displayed on the web application.

Feel free to contribute to the project by opening issues, suggesting improvements, or submitting pull requests.

Happy stock researching! 📈
