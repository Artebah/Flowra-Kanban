import type { ITask } from "./ITask";

export interface ITaskDetails extends ITask {
  description: string;

  // for future
  /* 
    members
    labels
    comments
    pinned images
    endDate
    completed
  */
}
