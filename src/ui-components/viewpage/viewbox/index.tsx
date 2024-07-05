import React from "react";
import { LogDataProps, TaskDataProps } from "../../../types";
import { getTaskById, getdataByLogId } from "../../../utils";
import { useEffect, useState } from "react";
import {
  FaAudioDescription,
  FaCheckCircle,
  FaCircle,
  FaClock,
  FaInfoCircle,
  FaSyncAlt,
  FaTimesCircle,
} from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { DONE, PENDING } from "../../../assets";
import { useMediaQuery } from "../../../hooks";

function ViewBox({ taskId }: { taskId: string | null }) {
  const [task, setTask] = useState<any | null>(null);
  const [log, setLog] = useState<LogDataProps[]>([]);
  const mobileScreen = useMediaQuery("(max-width: 640px)");

  useEffect(() => {
    const fetchdatabyId = async () => {
      //@ts-ignore
      const taskdata = await getTaskById("tasks", taskId);
      setTask(taskdata);
      //@ts-ignore
      const logsdata = await getdataByLogId("task_log", taskId);
      //   @ts-ignore
      setLog(logsdata);
    };

    fetchdatabyId();
  }, [taskId]);

  return (
    <main className="bg-[#FBFBFC] pt-9 flex  w-full lg:h-[450px] h-full overflow-y-auto lg:px-10 px-2 py-5 rounded-lg mt-7">
      {/* <span>{task?.title}</span>
      {log.length > 0 ? (
        log.map((data: any) => <span>{data.executedAt}</span>)
      ) : (
        <span>no data </span>
      )} */}
      <div>
        <div className="flex flex-col gap-3">
          <span className="font-semibold lg:text-5xl text-3xl text-gray-700">
            {task?.title}
          </span>
          <div className="flex items-center gap-2">
            <span className="text-blue-500">
              <FaInfoCircle />
            </span>
            <span className="lg:text-lg text-sm">{task?.description}</span>
          </div>
        </div>
        <div className="mt-9 flex flex-col gap-4">
          {task?.status === "executed" ? (
            <div className="flex items-center gap-2">
              <span className="text-green-500">
                <FaCheckCircle />
              </span>
              <span className="lg:text-lg text-sm">
                Task has being Executed
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-orange-500">
                <AiOutlineLoading3Quarters />
              </span>
              <span className="lg:text-lg text-sm">Task pending</span>
            </div>
          )}
          {task?.status === "executed" ? (
            <div className="flex items-center gap-2">
              <span className="text-green-500">
                <FaCheckCircle />
              </span>
              <span className="lg:text-lg text-sm">Done at scheduled time</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-orange-500">
                <AiOutlineLoading3Quarters />
              </span>
              <span className="lg:text-lg text-sm">
                Awaiting scheduled time{" "}
              </span>
            </div>
          )}

          <div className="flex items-center gap-2">
            <span className="text-green-500">
              <FaCheckCircle />
            </span>
            <span className="lg:text-lg text-sm">No subtasks</span>
          </div>
          {task?.tasktype !== "recurring" ? (
            <div className="flex items-center gap-2">
              <span className="text-red-500">
                <FaTimesCircle />
              </span>
              <span className="lg:text-lg text-sm">Re-occured</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-green-500">
                <FaCheckCircle />
              </span>
              <span className="lg:text-lg text-sm">Re-occured</span>
            </div>
          )}
          {task?.tasktype === "one-time" ? (
            <div className="flex items-center gap-2">
              <span className="text-green-500">
                <FaCheckCircle />
              </span>
              <span className="lg:text-lg text-sm">Executed At once</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-red-500">
                <FaTimesCircle />
              </span>
              <span className="lg:text-lg text-sm">Executed At once</span>
            </div>
          )}
        </div>
        <div className="mt-9 flex gap-5 lg:flex-row flex-col">
          {log.length > 0 &&
            log.map((data) => (
              <>
                <div className="flex flex-col gap-1 items-start">
                  <div className="flex gap-2 items-center">
                    <span className="text-orange-500">📆</span>
                    <span className="lg:text-lg text-sm">
                      Time/date scheduled
                    </span>
                  </div>
                  <span className="font-semibold lg:text-lg text-sm">
                    {data.tasktype === "recurring"
                      ? "3 minutes"
                      : data.scheduletime}
                  </span>
                </div>
                <div className="flex flex-col gap-1 items-start">
                  <div className="flex gap-2 items-center">
                    <span className="text-green-500">
                      <FaClock />
                    </span>
                    <span className="lg:text-lg text-sm">Time executed</span>
                  </div>
                  <span className="font-semibold lg:text-lg text-sm">
                    {data.executedAt}
                  </span>
                </div>
                <div className="flex flex-col gap-1 items-start">
                  <div className="flex gap-2 items-center">
                    <span className="text-orange-500">
                      <FaSyncAlt />
                    </span>
                    <span className="lg:text-lg text-sm">Task type</span>
                  </div>
                  <span className="font-semibold lg:text-lg text-sm">
                    {data.tasktype}
                  </span>
                </div>
              </>
            ))}
        </div>
      </div>
      <div className="ml-28 lg:flex items-center flex-col  hidden">
        {task?.status === "executed" ? (
          <>
            <img src={DONE} alt="" width={400} height={400} />
            <span className="text-2xl font-medium text-gray-500">Done 👍</span>
          </>
        ) : (
          <>
            <img src={PENDING} alt="" width={400} height={400} />
            <span className="text-2xl font-medium text-gray-500">Pending</span>
            <span className="text-orange-500">
              <AiOutlineLoading3Quarters />
            </span>
          </>
        )}
      </div>
    </main>
  );
}

export default ViewBox;
