import { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";

interface ApiResponse {
  data: any;
  status: number;
  statusText: string;
  headers: any;
  config: any;
}

const useApiRequest = (
  url: string
): { data: any | null; isLoading: boolean; error: Error | null } => {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: AxiosResponse<ApiResponse> = await axios.get(url);
        setData(response.data);
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, isLoading, error };
};

export default useApiRequest;
