"use client";

import {Box, Button, ButtonGroup, Grid, Stack} from "@mui/material";

import {LanguageSupport, StreamLanguage} from "@codemirror/language";
import {loadLanguage} from "@uiw/codemirror-extensions-langs";
import {dracula} from "@uiw/codemirror-theme-dracula";
import {Extension} from "@uiw/react-codemirror";
import Handlebars from "handlebars";
import yaml from "js-yaml";
import {useState} from "react";
import {DropdownItem} from "../../component/dropdown.component";
import DropdownLanguages from "../../component/dropdownLanguages.component";
import DropdownThemes from "../../component/dropdownThemes.component";
import Header from "../../component/header.component";
import InputCode from "../../component/inputCode.component";
import InputCodeFormat from "../../component/inputCodeFormat.component";
import SideMenu from "../../component/sideMenu.component";

type ExtensionLanguage = StreamLanguage<unknown> | LanguageSupport | null;

const dataExample = `ClassName: Book
properties:
  - name: id
    primitive_type: string
    value_object: UUID
    initial_value: "''"
    label: Internal ID
  - name: title
    primitive_type: string
    value_object: Title
    initial_value: "''"
    label: Title
  - name: isbn10
    primitive_type: string
    value_object: ISBN10
    initial_value: "''"
    label: ISBN 10
  - name: isbn13
    primitive_type: string
    value_object: ISBN13
    initial_value: "''"
    label: ISBN 13
  - name: pages
    primitive_type: string
    value_object: PositiveNumber
    initial_value: 0
    label: Pages
  - name: language
    primitive_type: string
    value_object: Language
    initial_value: "''"
    label: Language
  - name: publisher
    primitive_type: string
    value_object: CompanyName
    initial_value: "''"
    label: Publisher
  - name: publishedIn
    primitive_type: Date
    value_object: ShortDate
    initial_value: new Date()
    label: Published In
`;

const templateExample = `import { GenericEntity } from 'smart-value-objects/dist/Types';
import { CompanyName, ISBN10, ISBN13, Language, PositiveNumber, SingleWord, Title, UUID, createUUID, ShortDate } from 'smart-value-objects/dist/ValueObjects';

export const {{ClassName}}Initial: {{ClassName}}Model = {
{{#each properties}}
  {{name}}: {{{initial_value}}}{{#unless @last}},{{/unless}}
{{/each}}
};

export type {{ClassName}}Model = {
{{#each properties}}
  {{name}}: {{primitive_type}};
{{/each}}
};

export default class {{ClassName}} extends GenericEntity {
{{#each properties}}
  _{{name}}: {{value_object}};
{{/each}}

  constructor(public props: BookModel) {
    super();
    
{{#each properties}}
    this._{{name}} = this.initProp(this, new {{value_object}}(props?.{{name}}, '{{label}}'));
{{/each}}
  }

  get key() {
    return this.id;
  }
 
{{#each properties}}
  get {{name}}() {
    return this._{{name}}.value;
  }
 
{{/each}}
  toJson() {
    const fields = {
{{#each properties}}
      {{name}}: this.{{name}}, 
{{/each}}
      publishedIn: this.publishedIn,
      key: this.uid,
      sort: this.title,
    };
    return fields;
  }
}`;

export default function Home() {
    const initialCode = generateCode(dataExample, templateExample);
    const [data, setData] = useState<string>(dataExample);
    const [format, _] = useState<string>("yaml");
    const [template, setTemplate] = useState<string>(templateExample);
    const [code, setCode] = useState<string>(initialCode);
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
            <Box sx={{display: "flex"}}>
                <SideMenu />
                <Box>
                    <Grid container sx={{backgroundColor: "#282A0", marginLeft: "10px", width: "98%"}}>
                        <InputCodeFormat
                            value={data}
                            format={format}
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
                </Box>
            </Box>
        </>
    );
}
