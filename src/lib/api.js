/**
 * Centralized API Client for Al-Madina Islamic Academy
 * Connects the Next.js client directly to the Express backend API.
 */

export const API_BASE = (
  process.env.NEXT_PUBLIC_SERVER_API ||
  process.env.NEXT_PUBLIC_SERVER_URL ||
  "http://localhost:5000"
).replace(/\/+$/, "");

/**
 * Core fetch wrapper with centralized error handling and URL formatting
 *
 * @param {string} endpoint e.g. "/api/students" or full URL
 * @param {object} [options={}] fetch options
 * @returns {Promise<any>}
 */
export async function apiFetch(endpoint, options = {}) {
  const isFullUrl =
    endpoint.startsWith("http://") ||
    endpoint.startsWith("https://") ||
    endpoint.startsWith("//");

  const url = isFullUrl
    ? endpoint
    : `${API_BASE}${endpoint.startsWith("/") ? "" : "/"}${endpoint}`;

  const defaultHeaders = {
    Accept: "application/json",
  };

  if (
    options.body &&
    typeof options.body === "object" &&
    !(options.body instanceof FormData)
  ) {
    defaultHeaders["Content-Type"] = "application/json";
    options.body = JSON.stringify(options.body);
  }

  const mergedOptions = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, mergedOptions);
    const contentType = response.headers.get("content-type") || "";

    let data;
    if (contentType.includes("application/json")) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    if (!response.ok) {
      const errorMessage =
        data?.message ||
        data?.error ||
        `HTTP ${response.status}: অনুরোধ ব্যর্থ হয়েছে।`;
      const err = new Error(errorMessage);
      err.status = response.status;
      err.data = data;
      throw err;
    }

    return data;
  } catch (error) {
    if (error.status) throw error;
    console.error(`API Fetch Error [${url}]:`, error);
    throw new Error(
      error.message || "সার্ভারের সাথে সংযোগ স্থাপন করা সম্ভব হয়নি।"
    );
  }
}

/**
 * Convenient REST helpers
 */
export const api = {
  get: (endpoint, query = null, options = {}) => {
    let url = endpoint;
    if (query) {
      const sp = new URLSearchParams();
      Object.entries(query).forEach(([k, v]) => {
        if (v !== undefined && v !== null && v !== "") {
          sp.append(k, String(v));
        }
      });
      const queryString = sp.toString();
      if (queryString) {
        url += (url.includes("?") ? "&" : "?") + queryString;
      }
    }
    return apiFetch(url, { ...options, method: "GET" });
  },

  post: (endpoint, body, options = {}) =>
    apiFetch(endpoint, { ...options, method: "POST", body }),

  put: (endpoint, body, options = {}) =>
    apiFetch(endpoint, { ...options, method: "PUT", body }),

  patch: (endpoint, body, options = {}) =>
    apiFetch(endpoint, { ...options, method: "PATCH", body }),

  delete: (endpoint, options = {}) =>
    apiFetch(endpoint, { ...options, method: "DELETE" }),

  // ---------------- Domain-Specific APIs ----------------

  faculty: {
    getAll: () => api.get("/api/faculty"),
    getProfile: (email) => api.get(`/api/teacher/profile/${encodeURIComponent(email)}`),
    saveProfile: (body) => api.post("/api/teacher/profile", body),
  },

  staff: {
    getAll: () => api.get("/api/staff"),
  },

  attendance: {
    getToday: (email = "") =>
      api.get("/api/attendance/today", email ? { email } : null),
    getHistory: (email = "", limit = 30) =>
      api.get("/api/attendance/history", { email, limit }),
    checkIn: (lat, lng, comment = "") =>
      api.post("/api/attendance/check-in", { lat, lng, comment }),
    checkOut: (lat, lng, comment = "") =>
      api.post("/api/attendance/check-out", { lat, lng, comment }),
  },

  admin: {
    // Teachers & Staff
    getTeachers: (search = "") => api.get("/api/admin/teachers", { search }),
    updateTeacher: (body) => api.patch("/api/admin/teachers", body),
    getStaff: (search = "") => api.get("/api/admin/staff", { search }),
    createStaff: (body) => api.post("/api/admin/staff", body),
    updateStaff: (body) => api.patch("/api/admin/staff", body),
    deleteStaff: (id) => api.delete(`/api/admin/staff?id=${encodeURIComponent(id)}`),

    // Attendance
    getTeachersAttendance: (query) => api.get("/api/admin/teachers-attendance", query),
    getTeachersAttendanceMonthly: (month) =>
      api.get("/api/admin/teachers-attendance/monthly", { month }),
    getStaffAttendance: (query) => api.get("/api/admin/staff-attendance", query),
    saveStaffAttendance: (body) => api.post("/api/admin/staff-attendance", body),

    // Users
    getUsers: (query) => api.get("/api/admin/users", query),
    updateUserRole: (id, role) => api.patch(`/api/admin/users/${id}/role`, { role }),
    updateUserPermissions: (id, permissions) =>
      api.patch(`/api/admin/users/${id}/permissions`, { permissions }),
    updateUserStatus: (id, status) =>
      api.patch(`/api/admin/users/${id}/status`, { status }),
    deleteUser: (id) => api.delete(`/api/admin/users/${id}`),
  },

  ai: {
    chat: (messages) => api.post("/api/chat", { messages }),
    askFatwa: (query) => api.post("/api/fatwa-assistant", { query }),
  },
};

export default api;
