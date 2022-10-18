import { Stack, useRadioGroup, UseRadioGroupProps } from "@chakra-ui/react";
import { IconType } from "react-icons";
import { RadioButton } from "./components/radio-button";

interface RadioButtonGroupProps extends UseRadioGroupProps {
  options: Array<{
    label: string;
    value: string;
    description: string;
    icon: IconType;
  }>;
}

export const RadioButtonGroup = ({
  options,
  ...rest
}: RadioButtonGroupProps) => {
  const { getRadioProps, getRootProps } = useRadioGroup(rest);

  return (
    <Stack
      justify="center"
      direction={{ base: "column", md: "row" }}
      spacing="3"
      {...getRootProps()}
    >
      {options.map((option) => (
        <RadioButton
          key={option.value}
          icon={option.icon}
          description={option.description}
          label={option.label}
          {...getRadioProps({ value: option.value })}
        />
      ))}
    </Stack>
  );
};
