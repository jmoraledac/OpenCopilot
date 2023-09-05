"use client";
import React from "react";
import { Input } from "@/ui/components/inputs/BaseInput";
import CodeBlock from "@/ui/components/CodeBlock";
import { Heading } from "@/ui/components/Heading";
import Banner2 from "@/ui/components/Banner";
import { useBotData } from "@/ui/providers/BotDataProvider";

export default function BotTryAndShare() {
  const { bot } = useBotData();
  return (
    <div>
      <Heading className="font-semibold" level={3}>
        Embed on your product!
      </Heading>
      <div>
        <div className="max-w-full">
          <Banner2 level={2} className="mt-2">
            If your APIs requires authorization then you might need to provide
            the needed headers to enable OpenCopilot from accessing it
          </Banner2>
          <div className="my-5">
            <div className="max-w-full">
              <div>
                <Heading level={5} className="mb-2 text-base">
                  Copy the following code into your website head script
                </Heading>
                <div>
                  <CodeBlock
                    code={`<script src="http://cloud.opencopilot.so/pilot.js"></script>
<script>
    initAiCoPilot({
        initialMessages: "how are you sir ?",
        token: ${bot.token},
        triggerSelector: "#triggerSelector",
        headers: {
            // custom headers will be sent over to your APIs with every message
        },
    });
</script>`}
                  />
                </div>
              </div>
            </div>

            <div className="my-5">
              <Input
                copy
                label="Try your copilot on our example dashboard"
                readOnly
                className="select-text cursor-pointer"
                value={"https://cloud.opencopilot.so/demo/" + bot.token}
                type="text"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}