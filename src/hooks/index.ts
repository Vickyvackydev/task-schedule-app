import { collection, doc, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/firebase.config";
import { useCallback, useEffect, useState } from "react";

const useFetchData = (collectionName: string) => {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const taskcollectionRef = collection(db, collectionName);

  const fetchData = useCallback(
    async (isManualRefresh = false) => {
      setError(null);
      if (isManualRefresh) setLoading(true);

      try {
        const taskdata = await getDocs(taskcollectionRef);
        const alldata = taskdata.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setData(alldata);
      } catch (error) {
        setError("Could not fetch data");
        console.error(error);
      }
      setLoading(false);
    },
    [taskcollectionRef]
  );

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, reload: () => fetchData(true) };
};

type queryProps = string;
const useMediaQuery = (query: queryProps) => {
  const [match, setMatch] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);

    if (media.matches !== match) {
      setMatch(media.matches);
    }

    const listener = () => {
      setMatch(media.matches);
    };

    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [match, query]);

  return match;
};

export { useFetchData, useMediaQuery };
