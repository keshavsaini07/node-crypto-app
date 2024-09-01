### Testing APIs

- **Fetches list of NORMAL transactions for a user (GET Request)**

    The api endpoint is: 
    > <localhost/domain_name>/api/v1/user/transactions/userAddress
    ```
        api/v1/user/transactions/<userAddress>
    ```

- **Fetches the total expenses and current ether price for a user (GET Request)**

    The api endpoint is: 
    > <localhost/domain_name>/api/v1/user/expenses/userAddress
    ```
        api/v1/user/expenses/<userAddress>
    ```

### Setting up the project locally

- In the root directory create a `.env` file:

- Add the PORT variable
    ```
        PORT=<port number of your choice>
    ```
    ex:
    ```
        PORT=3000
    ```
    
- Add the local mongodb or mongodb atlas string to MONGO_URL variable for connecting to database
  ```
      MONGO_URL=<url of your mongodb>
  ```
  ex:
  ```
      MONGO_URL="mongodb://127.0.0.1:27017/database_name"
  ```

- Add the Etherscan api key to the API_KEY variable

- Add the api string for fetching current ethereum price to ETHEREUM_PRICE_URL variable