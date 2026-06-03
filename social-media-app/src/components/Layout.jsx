import React, { createContext, useMemo, useState } from "react";
import NavigationBar from "./Navbar";

import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Toaster from "./Toaster";

export const Context = createContext("unknown");

function Layout(props) {
  const navigate = useNavigate();
  const [toaster, setToaster] = useState({
    title: "",
    show: false,
    message: "",
    type: "",
  });

  /** useMemo is a Hook in React that allows you to optimize the performance of your components by memoizing expensive calculations. It works by returning a memoized value that is only recalculated if one of the inputs to the calculation changes. 
   * 
   * In this preceding code, i introduce a new function Hook called useMemo, which helps to memorize the context value (caching the value of the context) and avoid the creation of new objects every time there is a re-rendering of the Layout component. we will then be able to access the toaster state and call the setToaster function from any child component.

   * 
   * 
  */



  const value = useMemo(() => ({ toaster, setToaster }), [toaster]);

  const { hasNavigationBack } = props;

  return (
    <Context.Provider value={value}>  
      <div>
        <NavigationBar />
        {hasNavigationBack && (
          <ArrowLeftOutlined
            style={{
              color: "#0D6EFD",
              fontSize: "24px",
              marginLeft: "5%",
              marginTop: "1%",
            }}
            onClick={() => navigate(-1)}
          />
        )}
        <div className="container my-2">{props.children}</div>
      </div>
      <Toaster
        title={toaster.title}
        message={toaster.message}
        type={toaster.type}
        showToast={toaster.show}
        onClose={() => setToaster({ ...toaster, show: false })}
      />
    </Context.Provider>
  );
  
}

export default Layout;
