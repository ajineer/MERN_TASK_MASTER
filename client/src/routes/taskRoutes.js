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

export const patchTaskReq = async (editTaskForm, user) => {
  const response = await fetch(`/api/tasks/${editTaskForm._id}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${user.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: editTaskForm.name,
      date: editTaskForm.date,
      status: editTaskForm.status,
    }),
  });

  return response;
};
