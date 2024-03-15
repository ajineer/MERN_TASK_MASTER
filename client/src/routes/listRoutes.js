export const postListReq = async (e, user, listForm) => {
  const response = await fetch(`/api/lists`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${user.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(listForm),
  });

  return response;
};

export const patchListReq = async (list, user, editListForm) => {
  const response = await fetch(`/api/lists/${list._id}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${user.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(editListForm),
  });

  return response;
};

export const deleteListReq = async (list, user) => {
  const response = await fetch(`/api/lists/${list._id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  });

  return response;
};

export const fetchListReq = async (user) => {
  const response = await fetch(`/api/lists/`, {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  });
  return response;
};

export const postTaskReq = async (list, taskForm, user) => {
  const response = await fetch(`/api/lists/${list._id}`, {
    method: "POST",
    headers: {
      Authorization: `Berer ${user.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(taskForm),
  });
  return response;
};
