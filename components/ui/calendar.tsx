"use client";

import * as React from "react";
import { DayPicker } from "react-day-picker";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import "react-day-picker/dist/style.css";

type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({ className, ...props }: CalendarProps) {
  return <DayPicker className={cn("p-3", className)} {...props} />;
}
Calendar.displayName = "Calendar";

export { Calendar };
