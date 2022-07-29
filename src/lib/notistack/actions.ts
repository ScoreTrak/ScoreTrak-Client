import {OptionsObject} from "notistack";
import {SnackbarDismissButton} from "../../components/SnackbarDismissButton";

export const defaultSuccess: OptionsObject = {
    variant: "success"
}

export const defaultError: OptionsObject = {
    variant: "error",
    action: SnackbarDismissButton
}