import React from "react";
import { FaCheckCircle, FaFilter, FaList } from "react-icons/fa";
import { FiFilter } from "react-icons/fi";
import { useAppQuery } from "../../../context/AppContext";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";

function Header() {
  const { tab, setTab, setFilter } = useAppQuery();
  const handleFilterChange = (value: string) => {
    setFilter(value);
  };
  return (
    <nav className="flex justify-between">
      <div className="flex lg:items-center items-start lg:flex-row flex-col gap-3 text-lg">
        <div
          className={`py-1 cursor-pointer  px-4 rounded-sm flex gap-2 items-center flex-row-reverse ${
            tab === "lists" ? "bg-[#FCFDFE] text-blue-500" : "text-gray-400"
          } `}
          onClick={() => setTab("lists")}
        >
          <span className="lg:text-sm text-xs ">Lists</span>
          <span className="text-xs">
            <FaList />
          </span>
        </div>
        <div
          className={`py-1 px-4 cursor-pointer rounded-md flex gap-2 items-center flex-row-reverse ${
            tab === "executed-lists"
              ? "bg-[#FCFDFE] text-blue-500"
              : "text-gray-400"
          } `}
          onClick={() => setTab("executed-lists")}
        >
          <span className="lg:text-sm text-xs ">Executed task</span>
          <span className="text-xs">
            <FaCheckCircle />
          </span>
        </div>
      </div>
      <div className="flex gap-3 text-lg lg:flex-row flex-col-reverse lg:items-center items-end">
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <span>
            <FiFilter />
          </span>
          <span>Filter</span>
        </div>
        <Select onValueChange={handleFilterChange}>
          <SelectTrigger className="lg:w-[180px] bg-[#FCFDFE] outline-none">
            <SelectValue
              placeholder="Filter by"
              className="placeholder:text-blue-500"
            />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Filters</SelectLabel>
              <SelectItem value="dateCreated">Date created</SelectItem>
              <SelectItem value="timeExecuted">Time executed</SelectItem>
              <SelectItem value="alphabetically">Alphabetically</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </nav>
  );
}

export default Header;
