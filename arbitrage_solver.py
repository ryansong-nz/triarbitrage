from data import RatesDb, major_currency_symbols
from datetime import datetime
import csv
from math import log, exp

def reconstruct_path(prev, start, end):
    path = []
    while end is not None:
        path.append(end)
        end = prev[end]
    return path[::-1]

class ArbitrageSolver:
    def __init__(self, timestamp: datetime = None):
        self.db = RatesDb()
        self.timestamp = timestamp if timestamp else datetime.now()

    def set_time(self, timestamp: datetime) -> None:
        self.timestamp = timestamp

    def set_time_now(self) -> None:
        self.timestamp = datetime.now()
    
    def setup_data_for(self, currencies: list[tuple[str, str]]) -> dict[tuple[str, str], float]:
        # saves dictionary to a csv
        res = self.db.get_major_rates(self.timestamp)
        with open('./currency_rates.csv', mode='w', newline='') as file:
                writer = csv.DictWriter(file, fieldnames=res[0].keys())
                
                # Write the header row
                writer.writeheader()
                
                # Write the data rows
                writer.writerows(res)
                
        return res
    


    def find_arbitrage_opportunity(self, from_currency: str, to_currency: str) -> float:
        if not self.timestamp:
            raise ValueError("Timestamp not set")
    
        data = self.setup_data_for([(from_currency, "FROM"), (to_currency, "TO")])
        es = {(d["index"][:3].upper(), d["index"][3:].upper()) : -log(d["midPrice"])for d in data if d["midPrice"] }
        # find the shortest path from from_currency to to_currency with minimal cost
        # implementation: bellman-ford's algorithm
        # return the cost
        vs = major_currency_symbols
        dist = {v: float('inf') for v in vs}
        prev = {v: None for v in vs}
    
        dist[from_currency] = 0.0

        for i in range(len(vs) - 1):
            for (u, v), w in es.items():
                if dist[u] + w < dist[v]:
                    dist[v] = dist[u] + w
                    prev[v] = u

        path = reconstruct_path(prev, from_currency, to_currency)
            
        return exp(dist[to_currency]), path