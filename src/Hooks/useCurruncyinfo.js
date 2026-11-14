import { useEffect, useState } from "react";

function useCurrencyinfo(currency) {
    const [data, setData] = useState({});

    useEffect(() => {
        const controller = new AbortController();

        async function fetchCurrencyInfo() {
            try {
                const response = await fetch(
                    `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`,
                    { signal: controller.signal }
                );

                if (!response.ok) {
                    throw new Error(`Currency API request failed: ${response.status}`);
                }

                const result = await response.json();
                setData(result[currency] ?? {});
            } catch (error) {
                if (error.name !== "AbortError") {
                    console.error("Failed to load currency information:", error);
                    setData({});
                }
            }
        }

        fetchCurrencyInfo();

        return () => controller.abort();
    }, [currency]);

    return data;
}

export default useCurrencyinfo;