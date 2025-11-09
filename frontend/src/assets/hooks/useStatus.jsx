import React from "react";
import { useEffect, useState } from "react";

const useStatus = () => {
  const [status, setStatus] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (status) {
      setVisible(true);
      const fadeTimer = setTimeout(() => {
        setVisible(false);
      }, 4000);

      const removeTimer = setTimeout(() => {
        setStatus(null);
      }, 5000);
      return () => {
        clearTimeout(fadeTimer);
        clearTimeout(removeTimer);
      };
    }
  }, [status]);
  return { status, setStatus, visible };
};

export default useStatus;
