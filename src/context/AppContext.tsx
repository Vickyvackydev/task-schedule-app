import React, {
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

interface AppQueryProps {
  // set params types for the context
  filter: string;
  setFilter: React.Dispatch<SetStateAction<string>>;
  tab: string;
  setTab: React.Dispatch<React.SetStateAction<string>>;
}

const AppContext = createContext<AppQueryProps>({
  // define the context state
  tab: "",
  setTab: () => {},
  filter: "",
  setFilter: () => {},
});

export const ContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [tab, setTab] = useState<string>("lists");
  const [filter, setFilter] = useState("");

  return (
    <AppContext.Provider value={{ tab, setTab, filter, setFilter }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppQuery = (): AppQueryProps => useContext(AppContext); // export useSearchQuery as hook to render the state
