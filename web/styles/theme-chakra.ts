import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
  styles: {
    global: {
      body: {
        bgGradient: "linear(to-br, brand.twitter, brand.purple)",
        minH: "100vh",
      },
    },
  },
  colors: {
    brand: {
      twitter: "#1DA1F2",
      purple: "#981ceb",
    },
  },
  components: {
    Heading: {
      defaultProps: {
        size: "lg",
      },
      baseStyle: {
        color: "gray.900",
      },
    },
    Text: {
      baseStyle: {
        fontSize: "lg",
        color: "gray.600",
        textColor: "gray.600",
      },
    },
    Progress: {
      baseStyle: {
        filledTrack: {
          bg: "brand.twitter",
        },
      },
    },
    Button: {
      defaultProps: {
        size: "lg",
      },
    },
  },
});

export default theme;
