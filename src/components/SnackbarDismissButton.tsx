import { Button } from "@material-ui/core";
import { useSnackbar } from "notistack";

export function SnackbarDismissButton(key: string) {
  const { closeSnackbar } = useSnackbar();

  return (
    <>
      <Button variant={"outlined"} onClick={() => closeSnackbar(key)}>
        Dismiss
      </Button>
    </>
  );
}
