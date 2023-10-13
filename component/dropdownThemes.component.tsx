import Dropdown, { DropdownItem } from "./dropdown.component";

import {abyss, abyssInit} from "@uiw/codemirror-theme-abyss";
import { dracula } from "@uiw/codemirror-theme-dracula";
import { eclipse } from "@uiw/codemirror-theme-eclipse";
import { githubDark, githubLight } from "@uiw/codemirror-theme-github";
import { materialDark, materialLight } from "@uiw/codemirror-theme-material";
import { monokai } from "@uiw/codemirror-theme-monokai";
import { sublime } from "@uiw/codemirror-theme-sublime";
import { vscodeDark } from '@uiw/codemirror-theme-vscode';


const themes = [
    {label: "Abyss", value: abyss},
    {label: "Dracula", value: dracula},
    {label: "Eclipse", value: eclipse},
    {label: "Github Dark", value: githubDark},
    {label: "Github Light", value: githubLight},
    {label: "Material Dark", value: materialDark},
    {label: "Material Light", value: materialLight},
    {label: "Monokai", value: monokai},
    {label: "Sublime", value: sublime},
    {label: "VSCode Dark", value: vscodeDark},
];

type ComponentProps = {
    width?: string;
    value: string;
    onChange?: (selectedItem: DropdownItem) => void;
};

export default function DropdownThemes(props: ComponentProps) {

    function handleChange(selectedItem: DropdownItem) {
        if (props.onChange) {
            props.onChange?.(selectedItem);
        }
    }

    return (
        <Dropdown
            label="Language"
            items={themes}
            size="small"
            width={props.width}
            value={props.value}
            onChange={(selectedItem) => {
                handleChange(selectedItem);
            }}
        />
    );
}
