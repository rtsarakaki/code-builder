import {Box, Typography} from "@mui/material";
import {orange} from "@mui/material/colors";

export default function Header() {
    return (
        <Box
            sx={{
                backgroundColor: "#000",
                height: "50px",
                padding: "5px",
                display: "flex",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    alignItems: "end",
                    marginBottom: "2px",
                    marginLeft: "10px",
                }}
            >
                <Typography variant="h5" color={"white"} lineHeight={1.5} letterSpacing={1.5}>
                    {"</>"}&nbsp;
                </Typography>
                <Typography variant="h5" color={orange[600]} letterSpacing={1.5} fontWeight={"bold"}>
                    {"The"}
                </Typography>
                <Typography variant="h5" color={"white"} letterSpacing={1.5} fontWeight={"bold"}>
                    {"Code"}
                </Typography>
                <Typography variant="h5" color={orange[600]} letterSpacing={1.5} fontWeight={"bold"}>
                    {"Builder"}
                </Typography>
            </Box>
        </Box>
    );
}
