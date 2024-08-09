"use client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function SnackbarComponent() {
  const showToastMessage = () => {
    toast.success("Success Notification !", {
      position: "bottom-right",
    });
  };
  return (
    <div>
      <button onClick={showToastMessage}>Notify</button>
      <ToastContainer />
    </div>
  );
}

export default SnackbarComponent;
