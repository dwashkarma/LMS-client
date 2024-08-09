import { Button } from "@mui/material";

interface ButtonPropTypes {
  handleClick: () => void;
  children: React.ReactNode;
}
const ButtonComponent: React.FC<ButtonPropTypes> = ({
  handleClick,
  children,
}) => {
  return (
    <Button onClick={handleClick} variant="contained">
      {children}
    </Button>
  );
};

export default ButtonComponent;
