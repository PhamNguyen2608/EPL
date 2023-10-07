// useDeleteUser.tsx
import { useState, useCallback } from 'react';

type UserType = {
  id: string;
  name: string;
};

export const useDeleteUser = () => {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [userToDelete, setUserToDelete] = useState<UserType | null>(null);

  const deleteUser = useCallback((user: UserType) => {
    // Logic để xóa user, ví dụ gọi API
    console.log(`Deleted user: ${user.id}`);
    setPopupVisible(false);
  }, []);

  const confirmDelete = useCallback((user: UserType) => {
    setUserToDelete(user);
    setPopupVisible(true);
  }, []);

  const cancelDelete = useCallback(() => {
    setPopupVisible(false);
  }, []);

  return {
    confirmDelete,
    isPopupVisible,
    cancelDelete,
    userToDelete,
    deleteUser
  };
};
