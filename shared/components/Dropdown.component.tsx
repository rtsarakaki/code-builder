import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";

export type DropdownItem = {
    value: any;
    label: string;
};

type ComponentProps = {
    height?: string;
    width?: string;
    size?: "small" | "normal" | "medium";
    onChange?: (selectedItem: DropdownItem) => void;
    label: string;
    items: DropdownItem[];
    value: string;
};

export default function Dropdown(props: ComponentProps) {
    const [value, setValue] = useState<string>(props.value);

    function handleChange(value: string) {
        const selectedItem: DropdownItem = props.items.find((item) => item.label === value) as DropdownItem;
        setValue(value);
        if (props.onChange) {
            props.onChange?.(selectedItem);
        }
    }

    return (
        <Box sx={{marginBottom: "1px", width: `${props.width ?? "100%"} `}}>
            <FormControl fullWidth>
                <InputLabel id="select-label" size={props.size ?? ("normal" as any)}>
                    {props.label}
                </InputLabel>
                <Select
                    labelId="select-label"
                    id="select"
                    size={props.size ?? ("normal" as any)}
                    value={value}
                    label={props.label}
                    onChange={(event: any) => handleChange(event.target.value)}
                >
                    {props.items.map((item: DropdownItem) => {
                        return (
                            <MenuItem key={item.label} value={item.label}>
                                {item.label}
                            </MenuItem>
                        );
                    })}
                </Select>
            </FormControl>
        </Box>
    );
}
