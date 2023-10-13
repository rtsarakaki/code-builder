"use client";

import { Grid } from "@mui/material";

import { LanguageSupport, StreamLanguage } from "@codemirror/language";
import { loadLanguage } from "@uiw/codemirror-extensions-langs";
import { dracula } from "@uiw/codemirror-theme-dracula";
import { Extension } from "@uiw/react-codemirror";
import Handlebars from "handlebars";
import yaml from "js-yaml";
import { useState } from "react";
import { DropdownItem } from "../../component/dropdown.component";
import DropdownLanguages from "../../component/dropdownLanguages.component";
import DropdownThemes from "../../component/dropdownThemes.component";
import Header from "../../component/header.component";
import InputCode from "../../component/inputCode.component";
import InputCodeFormat from "../../component/inputCodeFormat.component";

type ExtensionLanguage = StreamLanguage<unknown> | LanguageSupport | null;

export default function Home() {
    const [data, setData] = useState<string>("");
    const [template, setTemplate] = useState<string>("");
    const [code, setCode] = useState<string>("");
    const [languageExtensionToHighlightTemplateEditor, setLanguageExtensionToHighlightTemplateEditor] =
        useState<ExtensionLanguage>(loadLanguage("typescript"));
    const [formatExtensionToHighlightTemplateEditor, setFormatExtensionToHighlightTemplateEditor] =
        useState<ExtensionLanguage>(loadLanguage("json"));
    const [themeExtensionEditor, setThemeExtensionEditor] = useState<any>(dracula);

    function handleDataChanged(value: string) {
        setData(value);
        const code = generateCode(value, template);
        setCode(code);
    }

    function handleFormatChanged(value: string) {
        setFormatExtensionToHighlightTemplateEditor(loadLanguage(value as any));
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
            <Grid container sx={{backgroundColor: "#282A0", marginLeft: "10px", width: "98%"}}>
                <InputCodeFormat
                    onDataChange={(value: string) => handleDataChanged(value)}
                    onFormatChange={(value: string) => handleFormatChanged(value)}
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
        </>
    );
}
