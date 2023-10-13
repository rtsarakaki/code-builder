import {Box, Typography} from "@mui/material";

export default function Header() {
    return (
        <Box
            sx={{
                backgroundColor: "#6272A4",
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
                <Typography variant="h5" color={"orange"} letterSpacing={1.5}>
                    {"The"}
                </Typography>
                <Typography variant="h5" color={"white"} letterSpacing={1.5}>
                    {"Code"}
                </Typography>
                <Typography variant="h5" color={"orange"} letterSpacing={1.5}>
                    {"Builder"}
                </Typography>
            </Box>
        </Box>
    );
}
