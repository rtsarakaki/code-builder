import {LanguageSupport, StreamLanguage} from "@codemirror/language";
import {langNames, loadLanguage} from "@uiw/codemirror-extensions-langs";
import {useEffect, useState} from "react";
import Dropdown, {DropdownItem} from "../../../../../shared/components/Dropdown.component";

type ComponentProps = {
    width?: string;
    value: string;
    onChange?: (value: StreamLanguage<unknown> | LanguageSupport | null) => void;
};

export default function DropdownLanguages(props: ComponentProps) {
    const [languages, seLanguages] = useState<DropdownItem[]>([]);

    function handleChange(selectedItem: DropdownItem) {
        const extension = loadLanguage(selectedItem.value);
        if (!extension) {
            return;
        }
        if (props.onChange) {
            props.onChange?.(extension);
        }
    }

    useEffect(() => {
        const languagesToDropdownItems: DropdownItem[] = langNames
        .sort((a, b) => a.localeCompare(b))
        .map((lang) => {
            return {value: lang, label: lang};
        });
        seLanguages(languagesToDropdownItems);
    }, []);

    return (
        <Dropdown
            label="Language"
            items={languages}
            size="small"
            width={props.width}
            value={props.value}
            onChange={(selectedItem: DropdownItem) => {
                handleChange(selectedItem);
            }}
        />
    );
}
