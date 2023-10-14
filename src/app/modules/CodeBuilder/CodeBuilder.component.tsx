"use client";

import {Box, Grid} from "@mui/material";

import {LanguageSupport, StreamLanguage} from "@codemirror/language";
import {loadLanguage} from "@uiw/codemirror-extensions-langs";
import {dracula} from "@uiw/codemirror-theme-dracula";
import {Extension} from "@uiw/react-codemirror";
import Handlebars from "handlebars";
import yaml from "js-yaml";
import {useState} from "react";
import {DropdownItem} from "../../../../shared/components/Dropdown.component";
import DropdownLanguages from "./components/DropdownLanguages.component";
import DropdownThemes from "./components/DropdownThemes.component";
import Header from "./components/Header.component";
import InputCode from "./components/InputCode.component";
import InputCodeFormat from "./components/InputCodeFormat.component";
import SideMenu from "./components/SideMenu.component";
import {dataExample, templateExample} from "./constants/InitialState";

type ExtensionLanguage = StreamLanguage<unknown> | LanguageSupport | null;

export default function CodeBuilder() {
    const initialCode = generateCode(dataExample, templateExample);
    const [data, setData] = useState<string>(dataExample);
    const [template, setTemplate] = useState<string>(templateExample);
    const [code, setCode] = useState<string>(initialCode);
    const [languageExtensionToHighlightTemplateEditor, setLanguageExtensionToHighlightTemplateEditor] =
        useState<ExtensionLanguage>(loadLanguage("typescript"));
    const [themeExtensionEditor, setThemeExtensionEditor] = useState<any>(dracula);

    function handleDataChanged(value: string) {
        setData(value);
        const code = generateCode(value, template);
        setCode(code);
    }

    function handleTemplateChanged(value: string) {
        setTemplate(value);
        const code = generateCode(data, value);
        setCode(code);
    }

    function handleLanguageChanged(value: ExtensionLanguage) {
        setLanguageExtensionToHighlightTemplateEditor(value);
    }

    function handleThemeChanged(selectedItem: DropdownItem) {
        setThemeExtensionEditor(selectedItem.value);
    }

    function generateCode(data: string, template: string) {
        try {
            const templateCompiled = Handlebars.compile(template);
            const context = yaml.load(data);
            return templateCompiled(context);
        } catch (err: any) {
            return err.message;
        }
    }

    return (
        <>
            <Header />
            <Box sx={{display: "flex"}}>
                <SideMenu />
                <Box>
                    <Grid container sx={{backgroundColor: "#282A0", marginLeft: "10px", width: "98%"}}>
                        <InputCodeFormat
                            value={data}
                            onDataChange={(value: string) => handleDataChanged(value)}
                            theme={themeExtensionEditor}
                        />
                        <InputCode
                            label="Build your template using expressions in the Handlebars pattern."
                            value={template}
                            sm={12}
                            md={4.5}
                            onChange={(value: string) => handleTemplateChanged(value)}
                            extensions={[languageExtensionToHighlightTemplateEditor as Extension]}
                            theme={themeExtensionEditor}
                        >
                            <DropdownLanguages
                                value="typescript"
                                onChange={(extension: ExtensionLanguage) => {
                                    handleLanguageChanged(extension);
                                }}
                            />
                        </InputCode>
                        <InputCode
                            label="See the code being generated in real time as you build your template. (Readonly)"
                            value={code}
                            sm={12}
                            md={4.5}
                            extensions={[languageExtensionToHighlightTemplateEditor as Extension]}
                            theme={themeExtensionEditor}
                            readOnly
                        >
                            <DropdownThemes
                                onChange={(selectedItem: DropdownItem) => {
                                    handleThemeChanged(selectedItem);
                                }}
                                value="Github Dark"
                            />
                        </InputCode>
                    </Grid>
                </Box>
            </Box>
        </>
    );
}
