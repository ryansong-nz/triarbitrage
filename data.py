import requests
from datetime import datetime

supported_symbols = set(['EUR', 'IDR', 'BGN', 'ILS', 
                         'GBP', 'DKK', 'CAD', 'JPY', 
                         'HUF', 'RON', 'MYR', 'SEK', 
                         'SGD', 'HKD', 'AUD', 'CHF', 
                         'KRW', 'CNY', 'TRY', 'HRK', 
                         'NZD', 'THB', 'USD', 'NOK', 
                         'RUB', 'INR', 'MXN', 'CZK', 
                         'BRL', 'PLN', 'PHP', 'ZAR'])
major_currency_symbols = set(['EUR', 'USD', 'GBP', 'JPY', 'AUD', 
                              'CNY', 'CAD', 'SGD', 'HKD', 'NZD'])

class RatesDb:
    """
    A class to interact with currency rates and perform various currency-related operations using Tiingo API.
    """
    def __init__(self):
        """
        Initialize the Tiingo API with the provided API token.
        """
        with open("./API_TOKEN.txt", "r") as f:
            self.API_TOKEN = f.read().strip()
        self.base_url = "https://api.tiingo.com/tiingo/fx"

    def get_headers(self):
        """
        Get the headers required for the Tiingo API requests.

        Returns:
            dict: Headers containing the authorization token.
        """
        return {"Content-Type": "application/json", "Authorization": f"Token {self.API_TOKEN}"}
         

    def get_major_rates(self, timestamp: datetime) -> dict:
        """
        Get the exchange rates for all major currency pairs.

        Args:
            timestamp (datetime): The specific time for which to get the rates.

        Returns:
            dict: A dictionary of exchange rates for major currency pairs.
        """
        res = []
        tickers = []
        for sym1 in major_currency_symbols:
            for sym2 in major_currency_symbols:
                if sym1 != sym2:
                    tickers.append(f"{sym1.lower()}{sym2.lower()}")

        while tickers:
            pass_in_tickers = tickers[:50]
            tickers = tickers[50:]
            endpoint = f"{self.base_url}/top?tickers={','.join(pass_in_tickers)}"
            json = requests.get(endpoint, headers=self.get_headers()).json()
            res += json

        return res
