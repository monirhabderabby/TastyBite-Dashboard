"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { memo } from "react";

function FoodBasedProfit() {
  return (
    <Card className="shadow-none">
      <CardHeader>
        <CardTitle>Popular Items</CardTitle>
        <CardDescription>Top 5 most ordered items this week</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          <div className="flex items-center">
            <Avatar className="h-9 w-9">
              <AvatarImage src="/placeholder.svg" alt="Pizza" />
              <AvatarFallback>PZ</AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">
                Pepperoni Pizza
              </p>
              <p className="text-sm text-muted-foreground">
                852 orders this week
              </p>
            </div>
            <div className="ml-auto font-medium">+$12,234</div>
          </div>
          <div className="flex items-center">
            <Avatar className="h-9 w-9">
              <AvatarImage src="/placeholder.svg" alt="Burger" />
              <AvatarFallback>BG</AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">Classic Burger</p>
              <p className="text-sm text-muted-foreground">
                654 orders this week
              </p>
            </div>
            <div className="ml-auto font-medium">+$9,456</div>
          </div>
          <div className="flex items-center">
            <Avatar className="h-9 w-9">
              <AvatarImage src="/placeholder.svg" alt="Pasta" />
              <AvatarFallback>PS</AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">Alfredo Pasta</p>
              <p className="text-sm text-muted-foreground">
                432 orders this week
              </p>
            </div>
            <div className="ml-auto font-medium">+$7,523</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default memo(FoodBasedProfit);
