import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface UpgradeCardProps {
  title: string;
  price: string;
  features: string[];
  buttonText: string;
  variant: "free" | "consultation" | "premium";
}

export const UpgradeCard = ({ title, price, features, buttonText, variant }: UpgradeCardProps) => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleAction = () => {
    if (variant === "free") {
      console.log("Email report:", { email, phone });
    } else if (variant === "consultation") {
      window.open("https://calendly.com", "_blank");
    } else {
      console.log("Learn more about premium");
    }
  };

  return (
    <Card className="p-6 flex flex-col h-full hover:shadow-lg transition-shadow">
      <div className="flex-1 space-y-4">
        <div>
          <h3 className="font-bold text-xl text-foreground mb-2">{title}</h3>
          <p className="text-2xl font-bold text-primary">{price}</p>
        </div>

        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
              <span className="text-green-500 mt-0.5">✓</span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        {variant === "free" && (
          <div className="space-y-2 pt-2">
            <Input
              type="tel"
              placeholder="555-123-4567"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <Input
              type="email"
              placeholder="you@hotel.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        )}
      </div>

      <Button onClick={handleAction} className="w-full mt-4">
        {buttonText}
      </Button>
    </Card>
  );
};
