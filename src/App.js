import "./App.css";
import { Container, Led, Tier, Code } from "./styles";
import { useState, useEffect } from "react";
import { chunk, forEach, trimStart } from "lodash";

const colors = [
  "red",
  "green",
  "blue",
  "aqua",
  "pink",
  "yellow",
  "orange",
  "purple",
];

function App() {
  const [leds, setLeds] = useState(
    chunk(
      Array(360)
        .fill({ color: null })
        .map((led, index) => {
          return { ...led, index };
        })
        .reverse(),
      30
    ).map((tier, index) => {
      return index % 2 === 0 ? tier : tier.reverse();
    })
  );

  useEffect(() => {
    let newCode = `clear();`;
    leds.forEach((tier) => {
      tier.forEach((led) => {
        if (led.color) {
          newCode = `${newCode} 
          leds[${led.index}] = CHSV(HUE_${led.color.toUpperCase()}, 255,  255);

          `;
        }
      });
    });
    setCode(`${newCode}
    FastLED.show();`);
  }, [leds]);

  const [code, setCode] = useState("");
  const [selectedColor, setSelectedColor] = useState("blue");

  const ledClick = (led, tierIndex) => {
    const clonedLeds = [...leds];
    const tier = clonedLeds[tierIndex];
    let clickedLed = tier.find((l) => l.index === led.index);
    clickedLed.color = clickedLed.color ? null : selectedColor;
    setLeds(clonedLeds);
  };

  return (
    <Container>
      <h1>Selected Color</h1>
      <Tier>
        {colors.map((color) => {
          return (
            <Led
              onClick={() => {
                setSelectedColor(color);
              }}
              selected={selectedColor === color}
              color={color}
            />
          );
        })}
      </Tier>
      <h1>LED Grid</h1>
      {leds.map((tier, tierIndex) => {
        return (
          <Tier key={"tier" + tierIndex}>
            {tier.map((led) => {
              return (
                <Led
                  key={led.index}
                  color={led.color}
                  onClick={() => {
                    ledClick(led, tierIndex);
                  }}
                ></Led>
              );
            })}
          </Tier>
        );
      })}
      <h1>Code</h1>
      <Code>{code}</Code>
    </Container>
  );
}

export default App;
