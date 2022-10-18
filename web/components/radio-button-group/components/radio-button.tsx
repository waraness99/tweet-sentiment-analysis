import {
  Box,
  Text,
  useRadio,
  UseRadioProps,
  useId,
  Heading,
  Icon,
  Stack,
} from "@chakra-ui/react";
import { CheckboxIcon } from "./checkbox-icon";
import { IconType } from "react-icons";

interface ButtonRadioProps extends UseRadioProps {
  icon: IconType;
  label: string;
  description: string;
}

export const RadioButton = ({
  label,
  icon,
  description,
  ...rest
}: ButtonRadioProps) => {
  const id = useId();
  const { getCheckboxProps, getInputProps, getLabelProps, state } =
    useRadio(rest);
  const { isChecked } = state;
  const colorBasedOnState = isChecked ? "undefined" : "gray.500";

  return (
    <label style={{ width: "100%" }} {...getLabelProps()}>
      <input {...getInputProps()} aria-labelledby={id} />
      <Box
        {...getCheckboxProps()}
        borderWidth="3px"
        borderRadius="xl"
        px="4"
        py="8"
        transition="all 0.2s"
        cursor="pointer"
        _focus={{ shadow: "outline" }}
        _checked={{
          borderColor: "brand.twitter",
        }}
        id={id}
      >
        <Stack spacing="4" alignItems="center">
          <Icon as={icon} boxSize="8" color={colorBasedOnState} />
          <Stack textAlign="center">
            <Heading size="md" color={colorBasedOnState}>
              {label}
            </Heading>
            <Text fontSize="sm" textColor={isChecked ? undefined : "gray.500"}>
              {description}
            </Text>
          </Stack>
          <CheckboxIcon isChecked={isChecked} />
        </Stack>
      </Box>
    </label>
  );
};
