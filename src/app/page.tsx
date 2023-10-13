"use client";

import {Grid} from "@mui/material";
import {useState} from "react";
import Header from "../../component/header.component";
import InputCode from "../../component/inputCode.component";
import Handlebars from "handlebars";

export default function Home() {
    const [data, setData] = useState<string>("Put your data in JSON or YAML format.");
    const [template, setTemplate] = useState<string>("Build your template.");
    const [code, setCode] = useState<string>("Here is your code!");

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

    function generateCode(data: string, template: string) {
        try {
            const templateCompiled = Handlebars.compile(template);
            const context = JSON.parse(data);
            return templateCompiled(context);
        } catch (err: any) {
            return err.message;
        }
    }

    return (
        <>
            <Header />
            <Grid container columnSpacing={{xs: 1}} sx={{height: "calc(100vh - 50px)", backgroundColor: "gray"}}>
                <InputCode value={data} sm={12} md={3} onChange={(value: string) => handleDataChanged(value)} />
                <InputCode value={template} sm={12} md={4.5} onChange={(value: string) => handleTemplateChanged(value)} />
                <InputCode value={code} sm={12} md={4.5} readOnly />
            </Grid>
        </>
    );
}
