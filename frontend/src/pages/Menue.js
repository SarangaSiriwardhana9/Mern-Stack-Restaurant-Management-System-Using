import React, { useState, useEffect } from "react";

const Menue = () => {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <p>Current date and time:</p>
      <p>{dateTime.toLocaleString()}</p>
    </div>
  );
};

export default Menue;
