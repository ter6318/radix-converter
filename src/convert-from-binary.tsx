import { ActionPanel, Action, Icon, List } from "@raycast/api";
import { useState } from "react";

export default function Command() {
  const [searchText, setSearchText] = useState("");

  const number = parseInt(searchText, 2);
  const isValid = !isNaN(number);

  const conversions = isValid
    ? [
        { name: "Octal", value: `0o${number.toString(8)}`, rawValue: number.toString(8), hasPrefix: true },
        { name: "Decimal", value: number.toString(10), rawValue: number.toString(10), hasPrefix: false },
        {
          name: "Hex",
          value: `0x${number.toString(16).toUpperCase()}`,
          rawValue: number.toString(16).toUpperCase(),
          hasPrefix: true,
        },
      ]
    : [];

  return (
    <List onSearchTextChange={setSearchText} searchBarPlaceholder="Input a decimal number" throttle={false}>
      {isValid ? (
        conversions.map((item) => (
          <List.Item
            key={item.name}
            title={item.name}
            subtitle={item.value}
            actions={
              <ActionPanel>
                <Action.CopyToClipboard content={item.value} title={`Copy ${item.name}`} />
                {item.hasPrefix && <Action.CopyToClipboard content={item.rawValue} title="Copy Value Only" />}
              </ActionPanel>
            }
          />
        ))
      ) : (
        <List.EmptyView
          title={searchText === "" ? "Input number" : "Please input a valid number"}
          icon={Icon.ExclamationMark}
        />
      )}
    </List>
  );
}
