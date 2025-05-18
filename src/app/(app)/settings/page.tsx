import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { UserProfileForm } from "@/components/user-profile/user-profile-form";
import { UserCog } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-3">
            <UserCog className="h-8 w-8 text-primary" />
            <CardTitle className="text-3xl font-bold">用户资料</CardTitle>
          </div>
          <CardDescription>管理您的出生信息以获得个性化洞察。</CardDescription>
        </CardHeader>
        <CardContent>
          <UserProfileForm />
        </CardContent>
      </Card>
    </div>
  );
}
