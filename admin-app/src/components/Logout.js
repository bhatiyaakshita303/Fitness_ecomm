const handleLogout = () => {
  localStorage.removeItem("role"); // Login remove karo
  navigate("/login");              // Login page redirect
};