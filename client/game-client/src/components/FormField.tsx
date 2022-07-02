import { Emoji, HelperText, Input, Label } from "./RegisterAndLogin";

export function FormField(props: any) {
  return (
    <>
      <Label htmlFor={props.name}>
        <b>{props.label}</b>
        <Emoji src={props.iconUrl} alt={props.iconAltText} />
      </Label>
      <br />
      <Input
        type={props.inputType}
        placeholder={props.placeholder}
        name={props.name}
        required
        onChange={props.onChange}
      />
      {props.isDataEntered && !props.isDataValid && (
          <>
            <HelperText>{props.helperText}</HelperText>
          </>
        )}
    </>
  );
}
