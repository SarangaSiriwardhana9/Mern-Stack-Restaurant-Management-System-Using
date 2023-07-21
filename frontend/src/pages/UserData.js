import React, { useEffect, useState } from "react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const UserData = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8090/UserData", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "UserData");
        setData(data.data);
      });
  }, []);

  const deleteUser = (id, name) => {
    if (
      window.confirm(
        `Are you sure you want to delete ${name}'s user account from the system?`
      )
    ) {
      fetch("http://localhost:8090/deleteUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userid: id,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "ok") {
            setData((prevData) => prevData.filter((user) => user._id !== id));
            alert(data.data);
          } else {
            alert("Failed to delete user");
          }
        })
        .catch((error) => {
          console.log(error);
          alert("An error occurred while deleting the user");
        });
    }
  };
  return (
    <div className='min-h-screen bg-gray-100 py-6 flex flex-col justify-center '>
      <div className='relative py-3 2xl:max-w-2xl xl:mx-auto'>
        <div className='absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform skew-y-0 rotate-6 xl:rotate-12 :rounded-3xl'></div>
        <div className='relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20'>
          <h1 className='text-3xl font-bold text-center mb-8'>User Data</h1>
          <div className='overflow-x-auto'>
            <table className='mx-auto max-w-2xl w-full whitespace-no-wrap bg-white rounded-lg overflow-hidden sm:shadow-lg'>
              <thead>
                <tr className='text-gray-800'>
                  <th className='px-4 py-2 bg-gray-200 font-semibold text-sm uppercase'>
                    First Name
                  </th>
                  <th className='px-4 py-2 bg-gray-200 font-semibold text-sm uppercase'>
                    Last Name
                  </th>
                  <th className='px-4 py-2 bg-gray-200 font-semibold text-sm uppercase'>
                    E-mail
                  </th>
                  <th className='px-4 py-2 bg-gray-200 font-semibold text-sm uppercase'>
                    Password
                  </th>
                  <th className='px-4 py-2 bg-gray-200 font-semibold text-sm uppercase'>
                    Image
                  </th>
                  <th className='px-4 py-2 bg-gray-200 font-semibold text-sm uppercase'>
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((i) => (
                  <tr key={i.id} className='border-b border-gray-200'>
                    <td className='px-4 py-3 text-sm'>{i.firstName}</td>
                    <td className='px-4 py-3 text-sm'>{i.lastName}</td>
                    <td className='px-4 py-3 text-sm'>{i.email}</td>
                    <td className='px-4 py-3 text-sm'>{i.password}</td>

                    <td className='px-4 py-3 text-sm'>
                      <img
                        src={i.image}
                        alt='User Image'
                        style={{ maxWidth: "50px", maxHeight: "50px" }}
                      />
                    </td>
                    <td class='flex flex-col items-center justify-center pt-7 text-red-500'>
                      <FontAwesomeIcon
                        icon={faTrash}
                        onClick={() => deleteUser(i._id, i.firstName)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserData;
