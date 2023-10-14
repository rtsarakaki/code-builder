import { Box, Stack } from "@mui/material";
import IconMenuButton from "../../../../../shared/components/iconMenuButton.component";

type ComponentProps = {};

export default function SideMenu(props: ComponentProps) {
    const color = "white";

    return (
        <>
            <Box sx={{margin: "0px", backgroundColor: "#9d4edd", padding: "10px"}}>
                <Stack direction="column" spacing={1}>
                    <IconMenuButton
                        tooltip="Basic blocks"
                        openAddressInNewWindow="https://handlebarsjs.com/guide/block-helpers.html#basic-blocks"
                        icon="data_array"
                        color={color}
                    />
                    <IconMenuButton
                        tooltip="Simple Iterators"
                        openAddressInNewWindow="https://handlebarsjs.com/guide/block-helpers.html#simple-iterators"
                        icon="settings_ethernet"
                        color={color}
                    />
                    <IconMenuButton
                        tooltip="Conditionals"
                        openAddressInNewWindow="https://handlebarsjs.com/guide/block-helpers.html#conditionals"
                        icon="call_split"
                        color={color}
                    />
                    <IconMenuButton
                        tooltip="Path expressions"
                        openAddressInNewWindow="https://handlebarsjs.com/guide/expressions.html#path-expressions"
                        icon="signpost"
                        color={color}
                    />
                    <IconMenuButton
                        tooltip="Subexpressions"
                        openAddressInNewWindow="https://handlebarsjs.com/guide/expressions.html#subexpressions"
                        icon="code"
                        color={color}
                    />
                    <IconMenuButton
                        tooltip="HTML-escaping"
                        openAddressInNewWindow="https://handlebarsjs.com/guide/expressions.html#html-escaping"
                        icon="html"
                        color={color}
                    />
                    <IconMenuButton
                        tooltip="Data variables"
                        openAddressInNewWindow="https://handlebarsjs.com/api-reference/data-variables.html"
                        icon="alternate_email"
                        color={color}
                    />
                </Stack>
            </Box>
        </>
    );
}
