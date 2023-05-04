import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import React from "react";
import CompanyIcon from "../../assets/icons/icon.png";
import ClockIcon from "../../assets/icons/clock.svg";
import FluentIcon from "../../assets/icons/fluent.png";
import PlaceIcon from "../../assets/icons/place.svg";
import SaveIcon from "../../assets/icons/save.svg";
import DocumentIcon from "../../assets/icons/document.svg";

function SectionCard({ evt, highlightSearchQuery }) {
  return (
    <Box {...css.card}>
      <Flex gap="15px" align="baseline">
        <Box>
          <Image w="50px" mt="15px" src={evt.logo} />
        </Box>
        <Box>
          <Heading {...css.title} as="h4" size="md">
            {evt.country} | {evt.organ} | {evt.file_date}
          </Heading>
          <Flex gap="20px">
            <Flex align="center" gap="5px">
              <Image src={ClockIcon} />
              <Text {...css.text}>{evt.file_date}</Text>
            </Flex>
            <Flex align="center" gap="5px">
              <Image src={FluentIcon} />
              <Text {...css.text}>{evt.country}</Text>
            </Flex>
            <Flex align="center" gap="5px">
              <Image src={PlaceIcon} />
              <Text {...css.text}>{evt.region}</Text>
            </Flex>
            <Flex align="center" gap="5px">
              <Image src={PlaceIcon} />
              <Text {...css.text}>{evt.organ}</Text>
            </Flex>
          </Flex>
          <Text w="750px" mt="0" {...css.text}>
            {highlightSearchQuery(evt.about_text)}
          </Text>
          <Flex align="center" justifyContent="space-between">
            <Flex gap="50px" align="center">
              <Flex gap="5px" align="center">
                <Image src={SaveIcon} />
                <Text {...css.text}>{evt.size} Mb</Text>
              </Flex>
              <Flex gap="5px" align="center">
                <Image src={DocumentIcon} />
                <Text {...css.text}>{evt.pages} Sidor</Text>
              </Flex>
            </Flex>
            <ButtonGroup gap="25px">
              <a target="_blank" href={evt.file} without>
                <Button {...css.submit}>Öppna</Button>
              </a>
              <a
                href={evt.file}
                without
                rel="noopener noreferrer"
                target="_blank">
                <Button {...css.button}>Ladda Ner</Button>
              </a>
            </ButtonGroup>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}

export default SectionCard;

const css = {
  title: {
    mt: 0,
    mb: 0,
    fontStyle: "normal",
    fontWeight: 600,
    fontSize: "25px",
    lineHeight: "24px",
  },
  text: {
    fontWeight: 400,
    fontSize: " 14px",
    color: "#858585",
    lineHeight: "18px",
  },
  card: {
    background: "#F2f2f2",
    borderRadius: "15px",
    width: "845px",
    p: "25px",
    m: "15px 0",
  },
  button: {
    background: "#FFDA3A",
    borderRadius: "10px",
    width: "131px",
    height: "34px",
    border: "none",
    cursor: "pointer",
  },
  submit: {
    border: "0.3px solid #333333",
    borderRadius: "10px",
    width: "131px",
    height: "34px",
    cursor: "pointer",
  },
};
