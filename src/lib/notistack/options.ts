import { OptionsObject } from "notistack";
import { SnackbarDismissButton } from "~/components/SnackbarDismissButton";

export const SuccessOptions: OptionsObject = {
  variant: "success",
  action: SnackbarDismissButton
}

export const ErrorOptions: OptionsObject = {
  variant: "error",
  action: SnackbarDismissButton
}