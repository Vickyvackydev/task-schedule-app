// scheduler.js
import cronParser from "cron-parser";
import { db } from "../firebase/firebase.config";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { TaskDataProps } from "../types";
import toast from "react-hot-toast";

const executedtaskCollectionRef = collection(db, "task_log");
const tasksCollectionRef = collection(db, "tasks");

const scheduleTask = (task: TaskDataProps, callback: any) => {
  if (task.tasktype === "recurring") {
    const interval = cronParser.parseExpression(task.scheduletime);

    const scheduleNextExecution = () => {
      const nextExecution = interval.next().toDate();
      //   @ts-ignore
      const delay = nextExecution - new Date();

      setTimeout(async () => {
        await callback(task);

        const newtask = { ...task, status: "pending" };

        await addDoc(tasksCollectionRef, newtask);
        scheduleNextExecution();
      }, delay);
    };

    scheduleNextExecution();
  } else if (task.tasktype === "one-time") {
    const executeAt = new Date(task.scheduletime);
    // @ts-ignore
    const delay = executeAt - new Date();

    if (delay > 0) {
      setTimeout(async () => {
        await callback(task);
      }, delay);
    }
  }
};

const executeTask = async (task: TaskDataProps) => {
  const executedAt = new Date();
  const executedTime = `${executedAt.getHours()}:${executedAt.getMinutes()}:${executedAt.getSeconds()}`;
  await addDoc(executedtaskCollectionRef, {
    taskId: task.id,
    executedAt: executedTime,
    title: task.title,
    description: task.description,
    tasktype: task.tasktype,
    scheduletime: task.scheduletime,
  });

  await updateDoc(doc(db, "tasks", task.id), {
    status: "executed",
  });
  toast.success("Task has being executed");
};

// const getdataById = async (collectionName: string, taskId: string) => {
//   const logscollectionref = collection(db, collectionName);
//   const taskquery = query(logscollectionref, where("id", "==", taskId));
//   const taskSnapshot = await getDocs(taskquery);

//   const logs = taskSnapshot.docs.map((doc) => ({
//     id: doc.id,
//     ...doc.data(),
//   }));

//   return logs;
// };

const getTaskById = async (collectionName: string, taskId: string) => {
  const taskRef = doc(db, collectionName, taskId);
  const taskSnap = await getDoc(taskRef);

  if (taskSnap.exists()) {
    return { id: taskSnap.id, ...taskSnap.data() };
  } else {
    console.log("no data");
    return null;
  }
};
const getdataByLogId = async (collectionName: string, taskId: string) => {
  const logscollectionref = collection(db, collectionName);
  const logquery = query(logscollectionref, where("taskId", "==", taskId));
  const logSnapshot = await getDocs(logquery);

  const logs = logSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return logs;
};

export { scheduleTask, executeTask, getTaskById, getdataByLogId };
