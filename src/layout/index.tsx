// project import
import LAYOUT, { Props } from "@/constants";
import MainLayout from "./MainLayout";
import AuthGuard from "@/utils/route-guard/AuthGuard";
import GuestGuard from "@/utils/route-guard/GuestGuard";

// ==============================|| LAYOUTS - STRUCTURE ||============================== //

export default function Layout({ variant = LAYOUT.main, children }: Props) {
  switch (variant) {
    case LAYOUT.noauth:
      return (
        <GuestGuard>
          <MainLayout>{children}</MainLayout>
        </GuestGuard>
      );

    default:
      return (
        <AuthGuard>
          <MainLayout>{children}</MainLayout>
        </AuthGuard>
      );
  }
}
