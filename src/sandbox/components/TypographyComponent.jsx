import { Typography, Divider, Box, Chip, Button, IconButton, Card, CardHeader } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import DeleteIcon from '@mui/icons-material/Delete';

const TypographyComponent = () => {


    return (
        <>

            <Typography color="error.light" fontWeight={300} variant="h1" component="div">light</Typography>
            <Typography color="error.main" fontWeight={400} variant="h2" component="div">main</Typography>
            <Typography color="error.dark" fontWeight={500} variant="h3" component="div">dark</Typography>

            <Typography align="center" color="success.light" fontWeight={300} variant="h1" component="div">center</Typography>
            <Typography align="left" color="success.main" fontWeight={400} variant="h2" component="div">left</Typography>
            <Typography align="right" color="success.dark" fontWeight={500} variant="h3" component="div">align</Typography>

            <Typography >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita, assumenda veniam itaque enim repellat reiciendis sapiente amet, numquam atque maiores commodi? Expedita nesciunt voluptatum illum voluptas earum ad aliquid quo.</Typography>
            <hr />
            <Typography noWrap >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita, assumenda veniam itaque enim repellat reiciendis sapiente amet, numquam atque maiores commodi? Expedita nesciunt voluptatum illum voluptas earum ad aliquid quo.</Typography>

            <Typography sx={{
                margin: 2,
                backgroundColor: "warning.main",
                padding: 2,
                textAlign: "center",
                color: "warning.contrastText"
            }}>SX</Typography>

            <Box display="flex">
                <Typography p={1} >item 1</Typography>
                <Divider orientation="vertical" flexItem> CENTER</Divider>
                <Typography p={1}>item 2</Typography>
                <Divider orientation="vertical" flexItem> LEFT</Divider>
                <Typography p={1}>item 3</Typography>
                <Divider orientation="vertical" flexItem> RIGHT</Divider>
                <Typography p={1}>item 4</Typography>
            </Box>

            <>
                <Typography p={1} >item 1</Typography>
                <Divider> CENTER</Divider>
                <Typography p={1}>item 2</Typography>
                <Divider textAlign="left" > LEFT</Divider>
                <Typography p={1}>item 3</Typography>
                <Divider textAlign="right" >
                    <Chip label="2" />
                </Divider>
                <Typography p={1}>item 4</Typography>
            </>

            <Box sx={{ "& button": { m: 1 } }}>
                <Button size="large" variant="contained" color="success" endIcon={<SendIcon />}>Send</Button>
                <Button size="medium" variant="outlined" color="warning" endIcon={<AddShoppingCartIcon />}>maybe</Button>
                <Button size="small" variant="text" color="info" startIcon={<DeleteIcon />}>cancel</Button>

                <IconButton size="large" color="success" aria-label="send" >
                    <DeleteIcon />
                </IconButton >
                <IconButton size="large" color="success" aria-label="send" disabled>
                    <SendIcon />
                </IconButton >
                <IconButton size="large" color="success" aria-label="send" disabled>
                    <AddShoppingCartIcon fontSize="large" />
                </IconButton >

            </Box>

            <Card sx={{ width: 200, m: 2 }} variant="outlined">
                <CardHeader title="card header" subheader="card subheader"></CardHeader>
            </Card>
            <Card sx={{ width: 200, m: 2 }} square raised>
                <CardHeader title="card header" subheader="card subheader"></CardHeader>
            </Card>
            {/* 
            <Typography fontWeight={700} variant="h4" component="div">One</Typography>
            <Typography fontWeight={300} variant="h1" component="div">One</Typography>
            <Typography fontWeight={400} variant="h2" component="div">One</Typography>
            <Typography fontWeight={500} variant="h3" component="div">One</Typography>
            <Typography fontWeight={700} variant="h4" component="div">One</Typography> 
            */}
        </>
    );
}

export default TypographyComponent;