import { Box } from "@chakra-ui/react";
import { MdRadioButtonChecked, MdRadioButtonUnchecked } from "react-icons/md";

interface CheckboxIconProps {
  isChecked: boolean;
}

export const CheckboxIcon = ({ isChecked }: CheckboxIconProps) => (
  <Box fontSize="4xl" color={isChecked ? "brand.twitter" : "gray.300"}>
    {isChecked ? <MdRadioButtonChecked /> : <MdRadioButtonUnchecked />}
  </Box>
);
