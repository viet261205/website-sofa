
import {  Outlet } from "react-router-dom";
import { useUser } from "../contexts/useContext";
const ClientLayout = () => {
   const { user } = useUser();
  console.log(user);

  return (
<div>
<Outlet />
</div>
  );
};

export default ClientLayout;