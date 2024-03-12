import { Badge, Box, Flex, Heading, HoverCard, Text } from "@radix-ui/themes";
import React from "react";

type Props = {
  name: string;
  author: string;
  title?: string;
  price: number;
  img: string;
  description: string[];
};

export default function PluginCard(props: Props) {
  return (
    <HoverCard.Root>
      <HoverCard.Trigger>
        <div className="w-28 h-28 bg-bg1 rounded-lg flex flex-col items-center gap-3 py-4 cursor-pointer">
          <img className="w-12 h-12 rounded-md" src={props.img} alt="" />
          <div className="flex flex-col text-sm gap-1">
            <span>{props.name}</span>
          </div>
        </div>
      </HoverCard.Trigger>
      <HoverCard.Content>
        <Flex gap="4" style={{ width: 420 }}>
          <img className="w-12 h-12 rounded-md" src={props.img} alt="" />
          <Badge
            className="absolute right-4"
            size="2"
            color={props.price === 0 ? "green" : "indigo"}
          >
            {props.price === 0 ? "Free" : "$" + props.price}
          </Badge>
          <Box>
            <Heading size="3" as="h3">
              {props.title || props.name}
            </Heading>
            <Text as="div" size="2" color="gray">
              @{props.author}
            </Text>
            <Text as="div" size="2" style={{ maxWidth: 300 }} mt="3">
              {props.description[0]}
            </Text>
            <ul className="list-disc text-sm ml-4 mt-3">
              {props.description.slice(1).map((desc) => (
                <li>{desc}</li>
              ))}
            </ul>
          </Box>
        </Flex>
      </HoverCard.Content>
    </HoverCard.Root>
  );
}
