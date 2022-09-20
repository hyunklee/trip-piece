import { ReactNode } from "react";

export interface ITrip {
  tripId: number;
  regionId: number;
  title: string;
  startDate: Date;
  endDate: Date;
}

export interface IButtonProps {
  children?: ReactNode;
  text?: string;
  type: "button" | "submit" | "reset" | undefined;
  func?: () => void;
  disabled?: boolean;
  color?: string;
}
