import {
  Box,
  Code,
  Heading,
  Kbd,
  Text,
  chakra,
  Alert,
  useColorMode,
} from "@chakra-ui/core"
import NextLink from "next/link"
import { forwardRef } from "react"
import CodeBlock from "./CodeBlock"

const Pre = props => <chakra.div my="2em" borderRadius="sm" {...props} />

const Table = props => (
  <chakra.table textAlign="left" mt="32px" width="full" {...props} />
)

const THead = props => {
  const [colorMode] = useColorMode()
  const bg = { light: "gray.50", dark: "whiteAlpha.100" }
  return (
    <chakra.th
      bg={bg[colorMode]}
      fontWeight="semibold"
      p={2}
      fontSize="sm"
      {...props}
    />
  )
}

const TData = props => (
  <chakra.td
    p={2}
    borderTopWidth="1px"
    borderColor="inherit"
    fontSize="sm"
    whiteSpace="normal"
    {...props}
  />
)

const Link = forwardRef((props, ref) => (
  <chakra.a
    as="a"
    ref={ref}
    color="teal.500"
    cursor="pointer"
    textDecoration="underline"
    outline="none"
    _hover={{ opacity: "0.8" }}
    _focus={{ boxShadow: "outline" }}
    {...props}
  />
))

const DocsHeading = props => (
  <Heading
    mb="1em"
    mt="2em"
    css={{
      "&[id]": {
        pointerEvents: "none",
      },
      "&[id]::before": {
        display: "block",
        height: " 6rem",
        marginTop: "-6rem",
        visibility: "hidden",
        content: `""`,
      },
      "&[id]:hover a": { opacity: 1 },
    }}
    {...props}
  >
    <chakra.div pointerEvents="auto">
      {props.children}
      {props.id && (
        <chakra.a
          aria-label="anchor"
          as="a"
          color="teal.500"
          fontWeight="normal"
          outline="none"
          _focus={{ opacity: 1, boxShadow: "outline" }}
          opacity="0"
          ml="0.375rem"
          href={`#${props.id}`}
        >
          #
        </chakra.a>
      )}
    </chakra.div>
  </Heading>
)

const MDXComponents = {
  h1: props => <Heading as="h1" size="xl" my="1em" {...props}></Heading>,
  h2: props => (
    <DocsHeading
      as="h2"
      fontWeight="semibold"
      size="lg"
      {...props}
    ></DocsHeading>
  ),
  h3: props => (
    <DocsHeading as="h3" size="md" fontWeight="medium" {...props}></DocsHeading>
  ),
  inlineCode: props => (
    <Code variantColor="yellow" fontSize="0.84em" {...props} />
  ),
  code: CodeBlock,
  pre: Pre,
  kbd: Kbd,
  br: props => <Box height="24px" {...props} />,
  hr: props => <Box as="hr" borderTopWidth="1px" my={8} {...props} />,
  table: Table,
  th: THead,
  td: TData,
  a: ({ href, ...props }) => (
    <NextLink href={href} passHref>
      <Link {...props} />
    </NextLink>
  ),
  p: props => <Text as="p" mt={4} lineHeight="tall" {...props} />,
  ul: props => <Box as="ul" pt="8px" pl="16px" {...props} />,
  ol: props => <Box as="ol" pt="8px" pl="16px" {...props} />,
  li: props => <Box as="li" pb="4px" {...props} />,
  blockquote: props => (
    <Alert
      role="presentation"
      mt={4}
      variant="left-accent"
      status="warning"
      css={{ "> *:first-of-type": { marginTop: 0 } }}
      {...props}
    />
  ),
}

// const ChakraProvider = ({ children, theme }) => {
//   return (
//     <ThemeProvider theme={theme}>
//       <ColorModeProvider>
//         <CSSReset />
//         {children}
//       </ColorModeProvider>
//     </ThemeProvider>
//   );
// };

export default MDXComponents