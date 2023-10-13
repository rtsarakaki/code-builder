import {Grid} from "@mui/material";
import CodeMirror, {Extension} from "@uiw/react-codemirror";
import {useCallback, useState} from "react";

type GridColumnsSize =
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 1.5
    | 2.5
    | 3.5
    | 4.5
    | 5.5
    | 6.5
    | 7.5
    | 8.5
    | 9.5
    | 10.5
    | 11.5;

type ComponentProps = {
    extensions?: Extension[];
    sm?: GridColumnsSize;
    xs?: GridColumnsSize;
    md?: GridColumnsSize;
    height?: string;
    value: string;
    readOnly?: boolean;
    onChange?: (value: string) => void;
};

export default function InputCode(props: ComponentProps) {
    function onChange(val: string) {
        if (props.onChange) {
            props.onChange?.(val);
        }
    }

    return (
        <Grid item sm={props.sm ?? 12} md={props.md} xs={props.xs}>
            <CodeMirror
                value={props.value}
                extensions={props.extensions}
                onChange={(value: string) => {
                    onChange(value);
                }}
                height={props.height ?? "calc(100vh - 50px)"}
                readOnly={props.readOnly ?? false}
            />
        </Grid>
    );
}
