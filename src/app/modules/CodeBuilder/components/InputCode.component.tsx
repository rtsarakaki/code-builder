import { Box, Grid, Typography } from "@mui/material";
import CodeMirror, { Extension } from "@uiw/react-codemirror";

type ComponentProps = {
    extensions?: Extension[];
    sm?: number;
    xs?: number;
    md?: number;
    height?: string;
    value: string;
    theme: Extension;
    readOnly?: boolean;
    onChange?: (value: string) => void;
    onPaste?: (value: string) => void;
    children?: any;
    label: string;
};

export default function InputCode(props: ComponentProps) {
    function onChange(val: string) {
        if (props.onChange) {
            props.onChange?.(val);
        }
    }

    function handlePaste(event: any) {
        const clipboardData = event.clipboardData || (window as any).clipboardData;
        const pastedData = clipboardData.getData("text");

        if (props.onPaste) {
            event.preventDefault();
            props.onPaste?.(pastedData);
        }
    }

    return (
        <Grid item margin={"2px"} marginTop={"0px"} sm={props.sm ?? 12} md={props.md} xs={props.xs}>
            <Box
                sx={{
                    height: "30px",
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    alignItems: "end",
                }}
            >
                <Typography
                    variant="overline"
                    display="block"
                    gutterBottom
                    lineHeight={"18px"}
                    fontSize={8}
                    marginLeft={"10px"}
                    color={"white"}
                >
                    {props.label}
                </Typography>
            </Box>
            <Box sx={{ paddingBottom: "2px"}}>
                <CodeMirror
                    value={props.value}
                    
                    extensions={props.extensions}
                    onChange={(value: string) => {
                        onChange(value);
                    }}
                    onPasteCapture={(event) => {
                        handlePaste(event);
                    }}
                    height={props.height ?? `calc(100vh - 200px)`}
                    readOnly={props.readOnly ?? false}
                    theme={props.theme}
                />
            </Box>
            <Box sx={{display: "flex", justifyContent: "flex-start", marginTop: "15px"}}>{props.children}</Box>
        </Grid>
    );
}
