import useUsers from "../hooks/useUsers";


const AdminCrm = () => {
    const { users, user } = useUsers();

    console.log(users, user);

    return (
        <>
        </>
    )
}

export default AdminCrm;