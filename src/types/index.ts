export interface TaskDataProps {
  id: string;
  title: string;
  scheduletime: string;
  executedtime: string;
  description: string;
  tasktype: string;
  status: string;
}

export interface LogDataProps {
  id: string;
  executedAt: string;
  title: string;
  description: string;
  tasktype: string;
  scheduletime: string;
}
