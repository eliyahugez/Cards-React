import { Alert, Snackbar } from "@mui/material";
import { node } from "prop-types";
import { createContext, useCallback, useContext, useState } from "react";

const SnackbarContext = createContext(null);

export const SnackbarProvider = ({ children }) => {
    const [isSnackOpen, setOpenSnack] = useState(false);
    const [snackMessage, setSnackMessage] = useState("in snackbar!");
    const [snackColor, setSnackColor] = useState("success");
    const [snackVariant, setSnackVariant] = useState("filled");

    const setSnack = useCallback((message, color, variant = 'filled') => {
        setOpenSnack(true);
        setSnackColor(color);
        setSnackMessage(message);
        setSnackVariant(variant);
    }, [setOpenSnack, setSnackColor, setSnackMessage, setSnackVariant]);

    return (
        <>
            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                open={isSnackOpen}
                onClose={() => setOpenSnack(false)}
                autoHideDuration={6000}
            >
                <Alert onClose={() => setOpenSnack(false)} severity={snackColor} variant={snackVariant}>
                    {snackMessage}
                </Alert>
            </Snackbar>

            <SnackbarContext.Provider value={setSnack}>
                {children}
            </SnackbarContext.Provider>
        </>
    );

}

SnackbarProvider.propTypes = {
    children: node.isRequired,
}

export const useSnackbar = () => {
    const context = useContext(SnackbarContext);
    if (!context) throw new Error('useSnackbar must be used within a SnackbarProvider');
    return context;
}
