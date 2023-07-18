import { Avatar, Card, CardContent, Container, Divider, Grid, Typography } from "@mui/material";
import { useUser } from "../providers/UserProvider";
import { getUserApi } from '../services/usersApiService'
import { useEffect, useState } from "react";
import { Box } from "@mui/system";

const UserInfo = () => {
    const { user } = useUser();
    const [userdata, setUserData] = useState(null)

    useEffect(() => {
        getUserApi(user._id).then((result) => {
            setUserData(result)
        })
            .catch((error) => {
                console.error(error);
            });
    }, []);
    console.log(userdata, "userdata");
    return (
        <>
            {userdata ? (
                <Container
                    sx={{
                        width: "100%",
                        paddingTop: 8,
                    }}
                >
                    <Grid container spacing={2} justifyContent="center">
                        {/* <Grid item xs={1} sm={1} md={1}>

                        </Grid> */}
                        <Grid item xs={12} sm={6} md={8}>
                            <Card>
                                <CardContent>
                                    <Avatar
                                        sx={{
                                            width: "3rem",
                                            height: "auto",
                                            marginBottom: 2,
                                        }}
                                        alt="user photo"
                                        src={userdata.image.url}
                                    />
                                    <Typography variant="h4" component="div">
                                        {`User Details`}
                                    </Typography>
                                    <Typography variant="h4">{`${userdata.name.first} ${userdata.name.last}`}</Typography>
                                    <Divider sx={{ width: "100%", paddingTop: 4 }} />
                                    <Box textAlign="left" sx={{ width: "70%", paddingTop: 4 }}>
                                        <Typography variant="body1">ID: {userdata._id}</Typography>
                                        <Typography variant="body1">Email: {userdata.email}</Typography>
                                        <Typography variant="body1">Phone: {userdata.phone}</Typography>
                                        <Typography variant="body1">Business: {userdata.isBusiness ? "Yes" : "No"}</Typography>
                                        <Typography variant="body1">Admin:{userdata.isAdmin ? "Yes" : "No"}</Typography>
                                        {/* וכו' - הוסף פרטים נוספים על המשתמש */}
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} md={8}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h5">Address</Typography>
                                    <Divider sx={{ width: "100%", paddingTop: 1 }} />
                                    <Typography variant="body1">{userdata.address.country}</Typography>
                                    <Typography variant="body1">{userdata.address.city}</Typography>
                                    <Typography variant="body1">{userdata.address.street}</Typography>
                                    <Typography variant="body1">{userdata.address.houseNumber}</Typography>
                                    <Typography variant="body1">{userdata.address.zip}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Container>

            ) : (
                <Typography>There are no users in your system.</Typography>
            )}
        </>
    )
}

export default UserInfo