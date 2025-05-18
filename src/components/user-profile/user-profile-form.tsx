"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUserProfile } from "@/contexts/user-profile-context";
import { useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import { Loader2, Save } from "lucide-react";

const userProfileSchema = z.object({
  birthDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "请输入有效的日期 (YYYY-MM-DD)。"),
  birthTime: z.string().regex(/^\d{2}:\d{2}$/, "请输入有效的时间 (HH:MM)。"),
  gender: z.enum(["male", "female", "other"]).optional(),
});

type UserProfileFormData = z.infer<typeof userProfileSchema>;

export function UserProfileForm() {
  const { userProfile, setUserProfile, isLoading } = useUserProfile();

  const form = useForm<UserProfileFormData>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: {
      birthDate: "",
      birthTime: "",
      gender: undefined,
    },
  });

  useEffect(() => {
    if (userProfile) {
      form.reset({
        birthDate: userProfile.birthDate,
        birthTime: userProfile.birthTime,
        gender: userProfile.gender,
      });
    }
  }, [userProfile, form]);

  function onSubmit(data: UserProfileFormData) {
    setUserProfile(data);
    toast({
      title: "资料已更新",
      description: "您的信息已成功保存。",
      variant: "default",
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="birthDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>出生日期</FormLabel>
              <FormControl>
                <Input type="date" placeholder="YYYY-MM-DD" {...field} />
              </FormControl>
              <FormDescription>
                输入您的出生日期。
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="birthTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>出生时间</FormLabel>
              <FormControl>
                <Input type="time" placeholder="HH:MM" {...field} />
              </FormControl>
              <FormDescription>
                输入您的出生时间 (24小时格式)。
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>性别 (可选)</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="选择您的性别" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="male">男</SelectItem>
                  <SelectItem value="female">女</SelectItem>
                  <SelectItem value="other">其他 / 不愿透露</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                提供性别信息有助于优化某些命理计算。
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading || form.formState.isSubmitting} className="w-full sm:w-auto">
          {isLoading || form.formState.isSubmitting ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Save className="mr-2 h-4 w-4" />
          )}
          保存资料
        </Button>
      </form>
    </Form>
  );
}
