import React, { useEffect, useState } from "react";
import { Checkbox, Container, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "../../providers/SnackbarProvider";
import CardDeleteDialog from "../../cards/components/card/CardDeleteDialog";
import PageHeader from "../../components/PageHeader";
import ROUTES from "../../routes/routesModel";
import { deleteUser } from "../services/usersApiService";
import useUsers from "../hooks/useUsers";
import axios from "axios";

const AdminCrm = () => {
    const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8181";
    const { handleGetUsers, users } = useUsers();
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [idForUser, setIdForUser] = useState(null);
    const [isBis, setIsB] = useState(false);

    useEffect(() => {
        handleGetUsers();
    }, [users]);

    const snack = useSnackbar();
    const navigate = useNavigate();

    const handleDeleteUser = () => {
        setDialogOpen(false);
        deleteUser(idForUser);
        navigate(ROUTES.CRM);
        snack("User Delete Success", "success");
    };

    const handleDialog = (term) => {
        if (term === "open") {
            setDialogOpen(true);
        } else {
            setDialogOpen(false);
        }
    };

    const updateUserInDatabase = async (user) => {
        try {
            await axios.patch(`${apiUrl}/users/${user._id}`, user);
            snack('User Status Update', 'success')

        } catch (error) {
            console.error("Failed to update user", error);
            await axios.patch(`${apiUrl}/users/${user._id}`, user);
        }
    };

    const handleIsBusinessChange = async (event, user) => {
        const updatedUser = { ...user, isBusiness: event.target.checked };
        setIsB(event.target.checked);
        if (updatedUser) {
            try {
                const updatedUserFromDatabase = await updateUserInDatabase(updatedUser);
                if (updatedUserFromDatabase && updatedUserFromDatabase.isBusiness !== undefined) {
                    try {
                        event.target.checked = updatedUserFromDatabase.isBusiness;
                    } catch (e) { console.log(e); }
                }
            } catch (error) {
                console.error("Failed to update user:", error);
            }
        };
    }

    return (
        <>
            {users ? (
                <Container key={isBis.toString()} >
                    <PageHeader title="CRM" subtitle="Customer Relationship Management" />
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Phone</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Is Business</TableCell>
                                <TableCell>Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow key={user._id}>
                                    <TableCell>
                                        <Typography>{user.name.first + " " + user.name.last}</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography>{user.phone}</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography>{user.email}</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Checkbox checked={user.isBusiness} color="primary" onChange={(event) => handleIsBusinessChange(event, user)} />
                                    </TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => {
                                            setIdForUser(user._id);
                                            handleDialog("open");
                                        }}>
                                            <Delete />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <CardDeleteDialog isDialogOpen={isDialogOpen} onDelete={handleDeleteUser} onChangeDialog={handleDialog} />
                </Container>
            ) : (
                <Typography>There are no users in your system.</Typography>
            )}
        </>
    );
};

export default AdminCrm;
