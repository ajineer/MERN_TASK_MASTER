export const postTaskReq = async (user, taskForm) => {
  const response = await fetch(`/api/tasks`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${user.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(taskForm),
  });

  return response;
};

export const fetchTasksReq = async (user) => {
  const response = await fetch(`/api/tasks`, {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  });
  return response;
};

export const deleteTaskReq = async (task, user) => {
  const response = await fetch(`/api/tasks/${task._id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${user.token}`,
      "Content-Type": "application/json",
    },
  });

  return response;
};

export const patchTaskReq = async (e, task, user) => {
  const response = await fetch(`/api/tasks/${task._id}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${user.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: e.target.name.value,
      status: e.target.checked,
    }),
  });

  return response;
};
