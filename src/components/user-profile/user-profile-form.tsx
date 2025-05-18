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
  birthDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Please enter a valid date (YYYY-MM-DD)."),
  birthTime: z.string().regex(/^\d{2}:\d{2}$/, "Please enter a valid time (HH:MM)."),
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
      title: "Profile Updated",
      description: "Your information has been saved successfully.",
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
              <FormLabel>Birth Date</FormLabel>
              <FormControl>
                <Input type="date" placeholder="YYYY-MM-DD" {...field} />
              </FormControl>
              <FormDescription>
                Enter your date of birth.
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
              <FormLabel>Birth Time</FormLabel>
              <FormControl>
                <Input type="time" placeholder="HH:MM" {...field} />
              </FormControl>
              <FormDescription>
                Enter your time of birth (24-hour format).
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
              <FormLabel>Gender (Optional)</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your gender" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other / Prefer not to say</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Providing gender can help refine some astrological calculations.
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
          Save Profile
        </Button>
      </form>
    </Form>
  );
}
