import { useEffect } from "react";

const SampleAuthed = () => {
  const { isLoggedIn, jwtToken } = useLogin();

  useEffect(() => {
    if (isLoggedIn) {
      fetch("/api/my-protected-endpoint", {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }).then((response) => {
        // Handle response
      });
    }
  });
};
