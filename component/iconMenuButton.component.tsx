import { Icon, IconButton, Tooltip } from "@mui/material";

type ComponentProps = {
	tooltip?: string
	icon: string
	color?: any
	openAddressInNewWindow?: string
	onClick?: () => void
};

export default function IconMenuButton(props: ComponentProps) {

	function handleClick() {
		if (props.openAddressInNewWindow) {
            window.open(props.openAddressInNewWindow, "_blank");
            return;
        }

		if (props.onClick) {
			props.onClick();
		}
	}

	return (
        <>
            <Tooltip title={props.tooltip ?? ''}>
                <IconButton
                    onClick={() => {
                        handleClick();
                    }}
                >
                    <Icon sx={{color: `${props?.color}`}}>{props.icon}</Icon>
                </IconButton>
            </Tooltip>
        </>
    );
	
}