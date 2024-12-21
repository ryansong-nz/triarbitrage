from arbitrage_solver import ArbitrageSolver

if __name__ == "__main__":
    solver = ArbitrageSolver()
    res = solver.find_arbitrage_opportunity("NZD", "USD")
    print(res)