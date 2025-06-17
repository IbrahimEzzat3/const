import React, { useState, useEffect } from "react";
import { userService } from "../../shared/services/userService";
import LoadingSpinner from "../common/LoadingSpinner";
import { format } from "date-fns";
import {
  DeleteIcon,
  BlockIcon,
  UnblockIcon,
  HistoryIcon,
  LevelIcon,
} from "../common/icons";

const UserManager = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [blockDialogOpen, setBlockDialogOpen] = useState(false);
  const [unblockDialogOpen, setUnblockDialogOpen] = useState(false);
  const [historyDialogOpen, setHistoryDialogOpen] = useState(false);
  const [levelDialogOpen, setLevelDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [blockReason, setBlockReason] = useState("");
  const [blockDuration, setBlockDuration] = useState("24");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    type: "success",
  });
  const [blockHistory, setBlockHistory] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await userService.getAllUsers();
      setUsers(response.data);
      setError(null);
    } catch (err) {
      setError(err.message || "Error fetching users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDeleteClick = (user) => {
    setSelectedUser(user);
    setDeleteDialogOpen(true);
  };

  const handleBlockClick = (user) => {
    setSelectedUser(user);
    setBlockDialogOpen(true);
  };

  const handleUnblockClick = (user) => {
    setSelectedUser(user);
    setUnblockDialogOpen(true);
  };

  const handleHistoryClick = async (user) => {
    try {
      const response = await userService.getBlockHistory(user._id);
      setBlockHistory(response.data);
      setSelectedUser(user);
      setHistoryDialogOpen(true);
    } catch (err) {
      setSnackbar({
        open: true,
        message: err.message || "Error fetching block history",
        type: "error",
      });
    }
  };

  const handleLevelClick = (user) => {
    setSelectedUser(user);
    setSelectedLevel(user.level || "beginner"); // Default to 'beginner' if level is not set
    setLevelDialogOpen(true);
  };

  const handleDelete = async () => {
    try {
      await userService.deleteUser(selectedUser._id);
      setSnackbar({
        open: true,
        message: "User deleted successfully",
        type: "success",
      });
      fetchUsers();
    } catch (err) {
      setSnackbar({
        open: true,
        message: err.message || "Error deleting user",
        type: "error",
      });
    } finally {
      setDeleteDialogOpen(false);
      setSelectedUser(null);
    }
  };

  const handleBlock = async () => {
    try {
      await userService.blockUser(selectedUser._id, {
        reason: blockReason,
        durationInHours: blockDuration,
      });
      setSnackbar({
        open: true,
        message: "User blocked successfully",
        type: "success",
      });
      fetchUsers();
    } catch (err) {
      setSnackbar({
        open: true,
        message: err.message || "Error blocking user",
        type: "error",
      });
    } finally {
      setBlockDialogOpen(false);
      setSelectedUser(null);
      setBlockReason("");
      setBlockDuration("24");
    }
  };

  const handleUnblock = async () => {
    try {
      await userService.unblockUser(selectedUser._id);
      setSnackbar({
        open: true,
        message: "User unblocked successfully",
        type: "success",
      });
      fetchUsers();
    } catch (err) {
      setSnackbar({
        open: true,
        message: err.message || "Error unblocking user",
        type: "error",
      });
    } finally {
      setUnblockDialogOpen(false);
      setSelectedUser(null);
    }
  };

  const handleUpdateLevel = async () => {
    try {
      await userService.updateUserLevel(selectedUser._id, selectedLevel);
      setSnackbar({
        open: true,
        message: `User level updated to ${selectedLevel} successfully`,
        type: "success",
      });
      fetchUsers();
    } catch (err) {
      setSnackbar({
        open: true,
        message: err.message || "Error updating user level",
        type: "error",
      });
    } finally {
      setLevelDialogOpen(false);
      setSelectedUser(null);
      setSelectedLevel("");
    }
  };

  const getBlockStatus = (user) => {
    if (!user.isBlocked) return null;
    if (!user.blockExpiresAt) return "Permanent";
    const expiresAt = new Date(user.blockExpiresAt);
    if (expiresAt < new Date()) return "Expired";
    return `Until ${format(expiresAt, "MMM dd, yyyy HH:mm")}`;
  };

  if (loading) {
    return (
      <div className="p-6 flex justify-center items-center min-h-[200px]">
        <LoadingSpinner size="lg" variant="primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 text-red-700 p-4 rounded-md">{error}</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-medium text-gray-900 mb-6">
        User Management
      </h1>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Level
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        user.role === "admin"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                      {user.level}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {user.isBlocked ? (
                      <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">
                        {getBlockStatus(user)}
                      </span>
                    ) : (
                      <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                        Active
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 space-x-2">
                    <button
                      className="p-2 rounded-md hover:bg-gray-100 transition-colors"
                      onClick={() => handleHistoryClick(user)}
                      title="Block History"
                    >
                      <HistoryIcon size={20} color="#666" />
                    </button>
                    {user.role !== "admin" && (
                      <>
                        <button
                          className="p-2 rounded-md hover:bg-gray-100 transition-colors"
                          onClick={() => handleLevelClick(user)}
                          title="Change Level"
                        >
                          <LevelIcon size={20} color="#1976d2" />
                        </button>
                        {user.isBlocked ? (
                          <button
                            className="p-2 rounded-md hover:bg-gray-100 transition-colors"
                            onClick={() => handleUnblockClick(user)}
                            title="Unblock User"
                          >
                            <UnblockIcon size={20} color="#2e7d32" />
                          </button>
                        ) : (
                          <button
                            className="p-2 rounded-md hover:bg-gray-100 transition-colors"
                            onClick={() => handleBlockClick(user)}
                            title="Block User"
                          >
                            <BlockIcon size={20} color="#ed6c02" />
                          </button>
                        )}
                        <button
                          className="p-2 rounded-md hover:bg-gray-100 transition-colors"
                          onClick={() => handleDeleteClick(user)}
                          title="Delete User"
                        >
                          <DeleteIcon size={20} color="#d32f2f" />
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Dialog */}
      {deleteDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h2 className="text-xl font-medium text-gray-900 mb-4">
              Delete User
            </h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete {selectedUser?.name}? This action
              cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                onClick={() => setDeleteDialogOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Block Dialog */}
      {blockDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h2 className="text-xl font-medium text-gray-900 mb-4">
              Block User
            </h2>
            <div className="space-y-4">
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Block Reason"
                value={blockReason}
                onChange={(e) => setBlockReason(e.target.value)}
                required
              />
              <select
                className="w-full px-3 py-2 border ltr border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={blockDuration}
                onChange={(e) => setBlockDuration(e.target.value)}
              >
                <option value="1">1 hour</option>
                <option value="24">24 hours</option>
                <option value="72">3 days</option>
                <option value="168">1 week</option>
                <option value="720">30 days</option>
                <option value="permanent">Permanent</option>
              </select>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                onClick={() => setBlockDialogOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleBlock}
                disabled={!blockReason}
              >
                Block
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Unblock Dialog */}
      {unblockDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h2 className="text-xl font-medium text-gray-900 mb-4">
              Unblock User
            </h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to unblock {selectedUser?.name}?
            </p>
            <div className="flex justify-end space-x-3">
              <button
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                onClick={() => setUnblockDialogOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                onClick={handleUnblock}
              >
                Unblock
              </button>
            </div>
          </div>
        </div>
      )}

      {/* History Dialog */}
      {historyDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4">
            <h2 className="text-xl font-medium text-gray-900 mb-4">
              Block History - {selectedUser?.name}
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Blocked At
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Blocked By
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Reason
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Expires At
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Unblocked At
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {blockHistory.map((block, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {format(
                          new Date(block.blockedAt),
                          "MMM dd, yyyy HH:mm"
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {block.blockedBy.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {block.reason}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {block.expiresAt
                          ? format(
                              new Date(block.expiresAt),
                              "MMM dd, yyyy HH:mm"
                            )
                          : "Permanent"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {block.unblockedAt
                          ? format(
                              new Date(block.unblockedAt),
                              "MMM dd, yyyy HH:mm"
                            )
                          : "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-end mt-6">
              <button
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                onClick={() => setHistoryDialogOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Level Dialog */}
      {levelDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h2 className="text-xl font-medium text-gray-900 mb-4">
              Change User Level - {selectedUser?.name}
            </h2>
            <div className="mb-6">
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ltr"
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                onClick={() => setLevelDialogOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                onClick={handleUpdateLevel}
              >
                Update Level
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Snackbar */}
      {snackbar.open && (
        <div
          className={`fixed bottom-6 right-6 px-6 py-3 rounded-md text-white flex items-center space-x-3 shadow-lg transform transition-transform duration-300 ease-out ${
            snackbar.type === "success" ? "bg-green-600" : "bg-red-600"
          }`}
        >
          <span>{snackbar.message}</span>
          <button
            className="text-white hover:text-gray-200 text-xl"
            onClick={() => setSnackbar({ ...snackbar, open: false })}
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
};

export default UserManager;
