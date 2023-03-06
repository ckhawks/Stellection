import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

// Create a new context for the login provider
const AuthContext = createContext();

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

// Define the login provider component
export const AuthProvider = ({ children }) => {
  // Set up state to track whether the user is logged in and the JWT token
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [jwtToken, setJwtToken] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const verifyToken = async () => {
      let token = Cookies.get("token");

      if (token) {
        if (token === "null" || token === "undefined") {
          console.log("FAKE ASS TOKEN!!");
          return;
        }
        // if (token === null) {
        //   console.log("token null");
        //   return;
        // }

        // verify token
        let path = "auth/verifytoken";
        let urlreal = `${API_BASE_URL}/v1/${path}`;

        const response = await fetch(urlreal, {
          method: "POST",
          // body: JSON.stringify({
          //   username,
          //   password,
          // }),
          headers: {
            "Content-Type": "application/json",
            "x-access-token": token,
          },
        });

        console.log("response", response);

        if (response.ok) {
          const { user_id, username, roles, email } = await response.json();
          setUser({
            user_id: user_id,
            username: username,
            email: email,
            roles: roles,
          });
          setJwtToken(token);
          Cookies.set("token", token);
          setIsLoggedIn(true);
          console.log("set");
        } else {
          console.log("response not ok", response.body);
        }
      } else {
        console.log("No token found to verify from.");
      }
    };

    verifyToken();
  }, []);

  // Define a login function that sends credentials to the server and sets the JWT token
  const login = async (username, password) => {
    let path = "auth/signin";
    let urlreal = `${API_BASE_URL}/v1/${path}`;

    const response = await fetch(urlreal, {
      method: "POST",
      body: JSON.stringify({
        username,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const { accessToken, user_id, username, roles, email } =
        await response.json();
      setUser({
        user_id: user_id,
        username: username,
        email: email,
        roles: roles,
      });

      // Store the JWT token in the cookie
      Cookies.set("token", accessToken);
      // document.cookie = `token=${token}; path=/;`;

      // Update the login provider state to indicate that the user is logged in
      setIsLoggedIn(true);
      setJwtToken(accessToken);
    } else {
      // Handle authentication error
      console.log("Login no worky");
      setIsLoggedIn(false);
    }
  };

  const logout = async () => {
    let path = "auth/signout";
    let urlreal = `${API_BASE_URL}/v1/${path}`;

    const response = await fetch(urlreal, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("logout", response);
    if (response.ok) {
      // Remove the JWT token from the cookie
      // Cookies.document.cookie =  "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      Cookies.set("token", null);

      setIsLoggedIn(false);
      setJwtToken(null);
    }
  };

  const value = {
    isLoggedIn,
    jwtToken,
    login,
    logout,
    user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Create a custom hook to access the auth provider state from within a component
export const useAuth = () => {
  return useContext(AuthContext);
};
