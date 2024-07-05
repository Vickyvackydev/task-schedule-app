import React from "react";
import {
  FaCalendar,
  FaCheckCircle,
  FaDotCircle,
  FaEllipsisH,
  FaSyncAlt,
} from "react-icons/fa";
import { FiCalendar } from "react-icons/fi";
import Dropdown from "../dropdown";
import { TaskDataProps } from "../../types";
import { useAppQuery } from "../../../src/context/AppContext";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "../../hooks";
import toast from "react-hot-toast";
import { Skeleton } from "../../components/ui/skeleton";

interface TaskProps {
  taskdata: TaskDataProps[];
  loading: boolean;
  error: string | null;
  handleEditModal: () => void;
  handleView: (id: string) => void;
  handleDeleteModal: () => void;
  selected: any;
}
function TaskComponent(props: TaskProps) {
  const mobilescreen = useMediaQuery("(max-width: 640px)");

  const { tab } = useAppQuery();

  return (
    <main className="flex flex-col gap-5 mt-3 ">
      {props.loading ? (
        <>
          <div className="flex items-center space-x-4">
            <Skeleton className="lg:h-16 h-5 lg:w-16 w-5 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="lg:h-4 h-2 lg:w-[550px] w-[150px]" />
              <Skeleton className="lg:h-4 h-2 lg:w-[500px] w-[100px]" />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Skeleton className="lg:h-16 h-5 lg:w-16 w-5 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="lg:h-4 h-2 lg:w-[550px] w-[150px]" />
              <Skeleton className="lg:h-4 h-2 lg:w-[500px] w-[100px]" />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Skeleton className="lg:h-16 h-5 lg:w-16 w-5 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="lg:h-4 h-2 lg:w-[550px] w-[150px]" />
              <Skeleton className="lg:h-4 h-2 lg:w-[500px] w-[100px]" />
            </div>
          </div>
        </>
      ) : props.error ? (
        <div>There was an error fetching the data</div>
      ) : (
        <>
          {props.taskdata.length > 0 ? (
            props.taskdata.map((data) => (
              <div
                key={data.id}
                className="bg-white rounded-md shadow-sm items-center lg:grid lg:grid-cols-3 flex justify-evenly px-3 py-3 w-full"
              >
                <div className="flex flex-col lg:mr-0 mr-3 ">
                  <span className="font-semibold lg:text-lg text-xs">
                    {mobilescreen ? `${data.title.slice(0, 5)}...` : data.title}
                  </span>
                  {!mobilescreen && (
                    <div className="text-xs text-blue-500 font-semibold flex items-center gap-1">
                      <FaDotCircle />
                      {data.tasktype}
                    </div>
                  )}
                </div>
                <div
                  className={`w-full  lg:text-sm text-xs text-gray-500 ${
                    data.description.length > 10
                      ? "break-words w-full max-w-sm"
                      : ""
                  }`}
                >
                  {data.description.length > 80 && !mobilescreen
                    ? `${data.description.slice(0, 80)}...`
                    : mobilescreen
                    ? `${data.description.slice(0, 20)}...`
                    : `${data.description}.`}
                </div>

                <div className="flex lg:gap-16 lg:ml-32 ml-0 gap-0 items-center">
                  <div className="flex items-center gap-1 text-xs font-semibold text-gray-400 bg-gray-100 p-1 rounded-md">
                    <span
                      className={`${
                        data.status === "executed"
                          ? "text-green-500"
                          : "text-orange-400"
                      }`}
                    >
                      {tab === "lists" ? (
                        <div className="flex items-center gap-1">
                          {data.status === "executed" ? (
                            <FaCheckCircle className="text-green-500 " />
                          ) : (
                            <FaSyncAlt className="text-orange-500" />
                          )}
                          <span>{data.status}</span>
                        </div>
                      ) : (
                        <div className="flex gap-1 items-center">
                          <FaCheckCircle className="text-green-500" />
                          <span className="text-green-500">Successful</span>
                        </div>
                      )}
                    </span>
                  </div>
                  <Dropdown
                    handleEdit={props.handleEditModal}
                    handledelete={props.handleDeleteModal}
                    handleView={() => props.handleView(data.id)}
                  />
                </div>
              </div>
            ))
          ) : (
            <span className="flex justify-center items-center font-medium lg:text-3xl text-lg mt-20s text-gray-500 text-opacity-25">
              No tasks available yet
            </span>
          )}
        </>
      )}
    </main>
  );
}

export default TaskComponent;
