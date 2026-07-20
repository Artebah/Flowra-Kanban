import { assignMembers } from "@/services/api/tasksApi";
import type { AssignMembersOptions } from "@/types/api/tasks";
import type { User } from "@/types/api/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAssignMembers = () => {
  const queryClient = useQueryClient();

  return useMutation<User[], Error, AssignMembersOptions>({
    mutationFn: (options) => assignMembers(options),
    onSuccess: (members, { boardId, taskId }) => {
      queryClient.setQueryData(["assigned-members", boardId, taskId], members);
    },
  });
};
