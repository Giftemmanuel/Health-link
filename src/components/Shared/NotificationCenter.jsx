// src/components/Shared/NotificationCenter.jsx
import React, { useEffect, useState } from "react";
import { db } from "../../services/firebase";
import { ref, onValue, update } from "firebase/database";
import { useAuth } from "../../context/AuthContext";
import { FiBell } from "react-icons/fi";

export default function NotificationCenter() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!user?.uid) return;

    const notifRef = ref(db, `notifications/${user.uid}`);
    const unsubscribe = onValue(
      notifRef,
      (snapshot) => {
        const data = snapshot.val() || {};
        const list = Object.entries(data).map(([id, value]) => ({
          id,
          ...value,
        }));
        setNotifications(list.reverse());
        setLoading(false);
      },
      (error) => {
        console.error("Firebase error:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user]);

  if (!user) return null;

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Mark individual notification as read
  const markAsRead = (id) => {
    const notifRef = ref(db, `notifications/${user.uid}/${id}`);
    update(notifRef, { read: true });
  };

  const toggleDropdown = () => {
    setOpen(!open);
  };

  return (
    <div className="relative inline-block">
      {/* Bell button */}
      <button
        onClick={toggleDropdown}
        className="relative p-2 text-gray-700 hover:text-gray-900"
      >
        <FiBell size={24} />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-500 rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-72 bg-white shadow-lg rounded-md z-50">
          <div className="p-4 border-b font-semibold">Notifications</div>
          <div className="max-h-64 overflow-y-auto">
            {loading && <div className="p-4 text-gray-500">Loading...</div>}
            {!loading && !notifications.length && (
              <div className="p-4 text-gray-500">No notifications yet.</div>
            )}
            {!loading && notifications.length > 0 && (
              <ul className="divide-y">
                {notifications.map((n) => (
                  <li
                    key={n.id}
                    onClick={() => markAsRead(n.id)}
                    className={`p-3 text-sm cursor-pointer ${
                      n.read ? "bg-white" : "bg-gray-100 font-medium"
                    } hover:bg-gray-200`}
                  >
                    {n.message}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
