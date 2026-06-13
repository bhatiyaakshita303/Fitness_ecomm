const handleLogout = () => {
  localStorage.removeItem("role"); 
  navigate("/login");         
}