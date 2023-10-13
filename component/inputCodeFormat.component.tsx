import {LanguageSupport, StreamLanguage} from "@codemirror/language";
import {loadLanguage} from "@uiw/codemirror-extensions-langs";
import {Extension} from "@uiw/react-codemirror";
import yaml from "js-yaml";
import {useState} from "react";
import Dropdown, {DropdownItem} from "./dropdown.component";
import InputCode from "./inputCode.component";

type ExtensionLanguage = StreamLanguage<unknown> | LanguageSupport | null;

type ComponentProps = {
    theme: Extension;
    onDataChange?: (value: string) => void;
    onFormatChange?: (value: string, data: string) => void;
};

export default function InputCodeFormat(props: ComponentProps) {
    const [data, setData] = useState<string>("");
    const [format, setFormat] = useState<string>("json");

    function handleDataChanged(value: string) {
        setData(value);
        if (props.onDataChange) {
            props.onDataChange?.(value);
        }
    }

    function convertContent(format: string, data: string): string {
        const contentIsJson = isJsonFormat(data);
        const contentIsYaml = isYamlFormat(data);

        if (contentIsJson && format === "yaml") {
            const jsonToString: string = JSON.parse(data);
            const stringToYaml: string = yaml.dump(jsonToString);
            return stringToYaml;
        }

        if (contentIsYaml && format === "json") {
            const yamlToString: string = yaml.load(data) as string;
            const stringToJson: string = JSON.stringify(yamlToString, null, 2);
            return stringToJson;
        }

        return data;
    }

    function handleFormatChanged(selectedItem: DropdownItem, data: string) {
        const dataConverted = convertContent(selectedItem.value, data);

        setFormat(selectedItem.value);
        if (props.onFormatChange) {
            props.onFormatChange?.(format, data);
        }
        handleDataChanged(dataConverted);
    }

    // function handlePaste(value: string) {
    //     const isJson = isJsonFormat(value);
    //     const format = isJson ? "json" : "yaml";

    //     const selectedItem: DropdownItem = {value: format, label: format};

    //     handleFormatChanged(selectedItem, value);
    // }

    const extension: ExtensionLanguage = loadLanguage(format as any);

    return (
        <InputCode
            label="Put the data to be replaced in the template in JSON or YAML format."
            value={data}
            sm={12}
            md={2.8}
            onChange={(value: string) => {
                handleDataChanged(value);
            }}
            // onPaste={(value: string) => {
            //     handlePaste(value);
            // }}
            extensions={[extension as Extension]}
            theme={props.theme}
        >
            <Dropdown
                label="Format"
                items={[
                    {value: "json", label: "JSON"},
                    {value: "yaml", label: "YAML"},
                ]}
                size="small"
                value={format}
                onChange={(selectedItem: DropdownItem) => {
                    handleFormatChanged(selectedItem, data);
                }}
            />
        </InputCode>
    );

    function isYamlFormat(value: string) {
        try {
            const x = yaml.load(value);
            return true;
        } catch (e) {
            return false;
        }
    }

    function isJsonFormat(value: string) {
        try {
            JSON.parse(value);
            return true;
        } catch (e) {
            return false;
        }
    }
}
