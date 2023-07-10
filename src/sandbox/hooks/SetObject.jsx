import { useState } from "react";

export const SetObject = () => {
  const initialName = {
    name: {
      firstName: "",
      lastName: "",
    },
    email: "",
  };

  const [user, setUser] = useState(initialName);

  return (
    <form>
      <span>
        your name is:{" "}
        <h5>
          {user.name.firstName} {user.name.lastName}
        </h5>
      </span>
      <span>
        your email is: <h5>{user.email}</h5>
      </span>
      <input
        type="text"
        placeholder="Enter first name"
        onChange={(e) =>
          setUser({
            ...user,
            name: {
              ...user.name,
              firstName: e.target.value,
            },
          })
        }
      />
      <input
        type="text"
        placeholder="Enter last name"
        onChange={(e) =>
          setUser({
            ...user,
            name: {
              ...user.name,
              lastName: e.target.value,
            },
          })
        }
      />
      <input
        type="text"
        placeholder="Enter email"
        onChange={(e) =>
          setUser({
            ...user,
            email: e.target.value,
          })
        }
      />
    </form>
  );
};
