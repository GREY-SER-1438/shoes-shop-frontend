import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

type RouteGuardProps = {
  isAllowed: boolean;
  redirectTo: string;
  children: ReactNode;
};

export default function RouteGuard({
  isAllowed,
  redirectTo,
  children,
}: RouteGuardProps) {
  if (!isAllowed) {
    return <Navigate to={redirectTo} replace />;
  }
  return <>{children}</>;
}
