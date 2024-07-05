import React from "react";
import { useEffect, useState } from "react";
import { FaEllipsisH, FaPlus } from "react-icons/fa";
import TaskComponent from "../../../reusables/taskscomponent";
import Modal from "../../../reusables/modal";
import { db } from "../../../firebase/firebase.config";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { executeTask, scheduleTask } from "../../../utils";
import cronstrue from "cronstrue";
import { useFetchData } from "../../../hooks";
import { useAppQuery } from "../../../context/AppContext";
import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { FiRefreshCw } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { TaskDataProps } from "../../../types";

function TaskBox() {
  const { tab, filter } = useAppQuery();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [scheduletime, setScheduletime] = useState("");
  const [tasktype, setTasktype] = useState("one-time");
  const [scheduledTime, setScheduledTime] = useState(null);

  const taskcollectionRef = collection(db, "tasks");
  const [open, setOpen] = useState(false);
  const { data: taskdata, reload, loading, error } = useFetchData("tasks");
  const { data: executeddata } = useFetchData("task_log");
  const [edit, setEdit] = useState(false);
  const [selectedTask, setSelectedTask] = useState<TaskDataProps | null>(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [filteredTasks, setFilteredTasks] = useState<any>([]);

  const dataTypes =
    tab === "lists"
      ? taskdata
      : tab === "executed-lists"
      ? executeddata
      : undefined;

  useEffect(() => {
    const applyFilter = () => {
      let sortedTasks = [...dataTypes];

      switch (filter) {
        case "alphabetically":
          sortedTasks.sort((a, b) => a.title.localeCompare(b.title));
          break;
        case "dateCreated":
          sortedTasks.sort(
            // @ts-ignore
            (a, b) => new Date(a.scheduletime) - new Date(b.scheduletime)
          );
          break;
        case "timeExecuted":
          sortedTasks.sort(
            // @ts-ignore
            (a, b) => new Date(a.executedAt) - new Date(b.executedAt)
          );
          break;
        default:
          break;
      }

      setFilteredTasks(sortedTasks);
    };

    applyFilter();
  }, [dataTypes, filter]);

  let scheduletimeValue = scheduletime;
  if (tasktype === "recurring") {
    // Set cron expression for every 3 minutes
    scheduletimeValue = "*/3 * * * *";
  } else if (tasktype === "one-time") {
    // Set execution time 10 seconds from now
    const now = new Date();
    const executeTime = new Date(now.getTime() + 10 * 1000);
    scheduletimeValue = executeTime.toISOString();
  }
  const taskData = {
    title,
    status: "pending",
    description,
    scheduletime: scheduletimeValue,
    tasktype,
  };

  const handleRegisterTask = async () => {
    setLoading(true);
    try {
      const docs = await addDoc(taskcollectionRef, taskData);
      console.log("Task added successfully");

      if (taskData.tasktype === "recurring") {
        // @ts-ignore
        setScheduledTime(cronstrue.toString(taskData.scheduletime));
      } else if (taskData.tasktype === "one-time") {
        // @ts-ignore
        setScheduledTime(new Date(taskData.scheduletime).toLocaleTimeString());
      }

      scheduleTask(
        {
          ...taskData,
          id: docs.id,
          executedtime: "",
          status: "",
        },
        executeTask
      );

      if (docs) {
        toast.success(
          `Task created successfully will be executed at scheduled time`
        );
        // @ts-ignore
        setSelectedTask(docs);
        setScheduletime("");
        setDescription("");
        setTasktype("");
        setTitle("");
        setOpen(false);
        setLoading(false);
      }
    } catch (error) {
      console.log("Error creating task:", error);
      toast.error("error creating task");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectedTask = (task: any) => {
    setSelectedTask(task);
  };

  const handleEdit = async (id: string) => {
    setLoading(true);
    if (id) {
      const taskdoc = doc(db, "tasks", id);

      const newData = {
        title: title || selectedTask?.title,
        status: "pending",
        description: description || selectedTask?.description,
        scheduletime: scheduletimeValue,
        tasktype: tasktype || selectedTask?.tasktype,
      };
      try {
        await updateDoc(taskdoc, newData);
        if (newData.tasktype === "recurring") {
          // @ts-ignore
          setScheduledTime(cronstrue.toString(newData.scheduletime));
        } else if (newData.tasktype === "one-time") {
          setScheduledTime(
            // @ts-ignore
            new Date(taskData.scheduletime).toLocaleTimeString()
          );
        }

        scheduleTask(
          // @ts-ignore
          {
            ...newData,
            id,
            executedtime: "",
          },
          executeTask
        );
        setScheduletime("");
        setDescription("");
        setTasktype("");
        setTitle("");

        toast.success("Task has being updated");
        setOpen(false);
        setLoading(false);
      } catch (error) {
        toast.error("Could not update task");
      } finally {
        setLoading(false);
      }
    }
  };
  const handleView = (id: string) => {
    if (id) {
      navigate(`/viewtask?idref=${id}`);
    }
  };
  const handleDelete = async (id: string) => {
    if (id) {
      const taskdoc = doc(db, "tasks", id);
      const logdoc = doc(db, "task_log", id);
      try {
        if (tab === "lists") {
          await deleteDoc(taskdoc);

          toast.success("Task has being deleted");
          setDeleteModal(false);
        } else if (tab === "executed-lists") {
          await deleteDoc(logdoc);
          toast.success("Executed task deleted");
          setDeleteModal(false);
        }
      } catch (error) {
        toast.error("could not delete task");
      }
    }
  };

  return (
    <main className="bg-[#FBFBFC] w-full max-h-[440px] overflow-y-auto lg:px-10 px-5 py-5 rounded-lg mt-7">
      <div className="flex justify-between">
        <div>
          <span className="lg:text-lg text-sm font-semibold">
            {tab === "lists" ? "To do" : "Executed tasks"}{" "}
          </span>
          <span className="text-gray-400 lg:text-lg text-sm">{`(${
            dataTypes.length < 10 ? `0${dataTypes.length}` : dataTypes.length
          })`}</span>
        </div>
        <div className="flex gap-5 items-center">
          <button
            className="text-sm font-normal text-gray-300 hover:bg-white p-1"
            type="button"
            onClick={() => {
              setOpen(true);
              setEdit(false);
              setLoading(false);
              setSelectedTask(null);
            }}
          >
            <FaPlus />
          </button>

          <Menu>
            <MenuButton className="inline-flex items-center gap-2 rounded-md py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-[#FCFDFE] data-[open]:bg-[#FCFDFE] data-[focus]:outline-1 data-[focus]:outline-white">
              <FaEllipsisH className="lg:size-4 size-2 text-gray-400" />
            </MenuButton>

            <MenuItems
              transition
              anchor="bottom end"
              className="w-52 origin-top-right rounded-xl border border-white/5 bg-[#FCFDFE] p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0 shadow-sm"
            >
              <MenuItem>
                <button
                  className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10 text-blue-500 lg:text-sm text-xs"
                  onClick={reload}
                >
                  <FiRefreshCw className="lg:size-4 size-2 " />
                  Reload
                  <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-[focus]:inline">
                    ⌘E
                  </kbd>
                </button>
              </MenuItem>
            </MenuItems>
          </Menu>
        </div>
      </div>

      <div>
        <TaskComponent
          taskdata={filteredTasks}
          loading={loading}
          error={error}
          handleDeleteModal={() => {
            handleSelectedTask(dataTypes.find((data: any) => data.id));
            setDeleteModal(true);
          }}
          handleEditModal={() => {
            handleSelectedTask(taskdata.find((data: any) => data.id));
            setEdit(true);
            setOpen(true);
          }}
          handleView={handleView}
          selected={selectedTask}
        />
      </div>
      <Modal isOpen={open} isClose={() => setOpen(false)}>
        <div className="flex items-center flex-col">
          <span className="text-xl font-semibold text-gray-800">
            Create Task
          </span>
          <div className="w-full mt-3 flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <label
                htmlFor="Title"
                className="font-medium text-sm  text-gray-500"
              >
                Title
              </label>
              <input
                value={title || selectedTask?.title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                className="w-full text-gray-600 outline-none py-1 border-b placeholder:text-sm"
                placeholder="Task title"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label
                htmlFor="Title"
                className="font-medium text-sm  text-gray-500"
              >
                Description
              </label>
              <textarea
                value={description || selectedTask?.description}
                onChange={(e) => setDescription(e.target.value)}
                className="resize-none overflow-y-hidden w-full outline-none py-1 border-b placeholder:text-sm"
                placeholder="Task description"
              />
            </div>
            {tasktype === "recurring" ? (
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="Title"
                  className="font-medium text-sm  text-gray-500"
                >
                  Schedule time (every 3 minutes)
                </label>
                <input
                  type="text"
                  value={"*/3 * * * *"}
                  onChange={(e) => setScheduletime(e.target.value)}
                  className="w-full outline-none py-1 border-b placeholder:text-sm"
                  placeholder="Cron expression (*/3 * * * *)"
                />
              </div>
            ) : (
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="Title"
                  className="font-medium text-sm  text-gray-500"
                >
                  Execution time (10 seconds from now)
                </label>
                <input
                  type="time"
                  value={scheduletime || selectedTask?.scheduletime}
                  onChange={(e) => setScheduletime(e.target.value)}
                  className="w-full outline-none py-1 border-b placeholder:text-sm"
                  placeholder="Execution time"
                />
              </div>
            )}

            <div className="flex flex-col gap-1">
              <label
                htmlFor="Title"
                className="font-medium text-sm  text-gray-500"
              >
                Task type
              </label>
              <select
                value={tasktype || selectedTask?.tasktype}
                onChange={(e) => setTasktype(e.target.value)}
                className="w-full outline-none py-1 border-b text-sm text-gray-600"
              >
                <option value="select type">Select type</option>
                <option value="one-time">One-time</option>
                <option value="recurring">Recurring</option>
              </select>
            </div>
          </div>
          {!edit ? (
            <button
              className="bg-[#FCFDFE] mt-5 py-2 px-7 shadow-sm text-blue-500 font-medium"
              onClick={handleRegisterTask}
            >
              {Loading ? "please wait ..." : "Create task"}
            </button>
          ) : (
            <button
              className="bg-[#FCFDFE] mt-5 py-2 px-7 shadow-sm text-blue-500 font-medium"
              onClick={() =>
                // @ts-ignore
                handleEdit(selectedTask.id)
              }
            >
              {Loading ? "please wait..." : " Edit task"}
            </button>
          )}
        </div>
      </Modal>
      <Modal isOpen={deleteModal} isClose={() => setDeleteModal(false)}>
        <div className="flex flex-col gap-5 items-center">
          <span className="text-2xl text-red-500">Delete task?</span>
          <hr />
          <div className="max-w-[200px] text-center">
            <span className="text-lg text-[#4C596F]">
              Are you sure you want delete task?
            </span>
          </div>

          <div className="flex justify-between items-center py-5 px-4 w-[300px]">
            <Button
              type="button"
              className={"bg-red-500 text-white px-5 py-1 rounded-md"}
              // @ts-ignore
              onClick={() => handleDelete(selectedTask.id)}
            >
              Delete
            </Button>
            <Button
              type="button"
              className={"bg-[#FBFBFC] text-blue-500 px-5 py-1 rounded-md"}
              onClick={() => setDeleteModal(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </main>
  );
}

export default TaskBox;
