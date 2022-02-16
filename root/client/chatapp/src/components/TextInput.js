import React, { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
import {
	TextField,
	Grid,
	Button,
	Icon,
	IconButton,
	Popper,
	Slide,
	Dialog,
	DialogTitle,
	Typography,
	Badge,
	Toolbar,
	AppBar,
	DialogContentText,
	DialogContent,
	useMediaQuery,
	DialogActions,
} from "@material-ui/core";

import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import SendIcon from "@material-ui/icons/Send";
import CloseIcon from "@material-ui/icons/Close";
import AddIcon from "@material-ui/icons/Add";

import FilesSelected from "./FilesSelected";

const styles = makeStyles((theme) => ({
	root: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		background: "#F0F0F0",
		borderRadius: "10px",
	},
	inputText: {
		marginRight: "5px",
		background: "#DCDCDC",
		borderRadius: "10px",
	},
	noBorder: {
		border: "none",
	},
	input: {
		display: "none",
	},
	dialogContent: {
		width: "500px",
		height: "300px",
		"&::-webkit-scrollbar": {
			width: "10px",
		},
	},
	appBar: {
		position: "relative",
	},
}));

function TextInput(props) {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const theme = useTheme();
	const [dialogOpen, setDialogOpen] = useState(false);
	const handleClick = (event) => {
		setAnchorEl(anchorEl ? null : event.currentTarget);
	};

	const handleKeyPress = (event) => {
		if (event.key === "Enter") {
			console.log("key Pressed");
			props.sendMessage();
		}
	};

	const handleDialogOpen = () => {
		setDialogOpen(true);
	};
	const handleDialogClose = () => {
		setDialogOpen(false);
		props.setFiles([]);
	};

	const handleFileSend = (event) => {
		setDialogOpen(false);
		props.sendMessage();
	};

	const open = Boolean(anchorEl);
	const id = open ? "simple-popper" : undefined;
	const addEmoji = (e) => {
		let sym = e.unified.split("-");
		let codesArray = [];
		sym.forEach((el) => codesArray.push("0x" + el));
		let emoji = String.fromCodePoint(...codesArray);
		props.setMessage(props.message + emoji);
	};
	const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
	const classes = styles();
	return (
		<div className={`${classes.root}`}>
			<Dialog
				fullScreen={fullScreen}
				open={dialogOpen}
				scroll="paper"
				onClose={handleDialogClose}
				className={`${classes.fileUploadContainer}`}
			>
				<AppBar className={classes.appBar}>
					<Toolbar>
						<IconButton
							edge="start"
							color="inherit"
							onClick={handleDialogClose}
							aria-label="close"
						>
							<CloseIcon />
						</IconButton>
					</Toolbar>
				</AppBar>
				<DialogTitle id="max-width-dialog-title">Files Selected</DialogTitle>
				<DialogContent className={`${classes.dialogContent}`}>
					<DialogContentText>
						<Grid container spacing={3}>
							{props.files
								? props.files.map((file, index) => {
										return (
											<Grid item md={6}>
												<FilesSelected fileName={file.name} />
											</Grid>
										);
								  })
								: null}
						</Grid>
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<input
						accept="/*"
						className={classes.input}
						id="icon-button-file-2"
						type="file"
						onChange={props.handleFileChange}
					/>
					<label htmlFor="icon-button-file-2">
						<IconButton
							component="span"
							style={{
								border: "1px solid",
								borderRadius: "10px",
								padding: "3px",
								color: theme.palette.primary.main,
							}}
						>
							<AddIcon style={{ fontSize: 40 }} />
						</IconButton>
					</label>

					<IconButton
						style={{
							borderRadius: "50%",
							background: theme.palette.primary.main,
						}}
						onClick={handleFileSend}
					>
						<Badge
							badgeContent={props.files?.length}
							color="white"
							style={{ color: "white" }}
						>
							<SendIcon style={{ color: "white" }} />
						</Badge>
					</IconButton>
				</DialogActions>
			</Dialog>
			<Popper id={id} open={open} anchorEl={anchorEl} placement="top-start">
				<Picker onSelect={addEmoji} />
			</Popper>
			<IconButton aria-describedby={id} type="button" onClick={handleClick}>
				<InsertEmoticonIcon style={{ fontSize: 30 }} />
			</IconButton>
			<input
				accept="/*"
				className={classes.input}
				id="icon-button-file"
				type="file"
				onChange={props.handleFileChange}
			/>
			<label htmlFor="icon-button-file">
				<IconButton
					aria-label="upload files"
					component="span"
					style={{ marginRight: "10px", transform: "rotate(45deg)" }}
					onClick={handleDialogOpen}
				>
					<AttachFileIcon />
				</IconButton>
			</label>
			<TextField
				id="textInput"
				variant="outlined"
				size="small"
				fullWidth
				placeholder="Enter Your Message"
				value={props.message}
				className={`${classes.inputText}`}
				onChange={props.handleMessageChange}
				onKeyPress={handleKeyPress}
				InputProps={{ classes: { notchedOutline: classes.noBorder } }}
			/>
			<IconButton onClick={props.sendMessage}>
				<SendIcon />
			</IconButton>
		</div>
	);
}

export default TextInput;
