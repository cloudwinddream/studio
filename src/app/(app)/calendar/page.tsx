import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Calendar as CalendarIcon, CalendarDays, Construction } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import Image from "next/image";

export default function PerpetualCalendarPage() {
  return (
    <div className="space-y-6">
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-3">
            <CalendarDays className="h-8 w-8 text-primary" />
            <CardTitle className="text-3xl font-bold">Perpetual Calendar (万年历)</CardTitle>
          </div>
          <CardDescription>Explore Gregorian and Lunar calendars, solar terms, and daily guidance.</CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Calendar View</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Calendar
              mode="single"
              selected={new Date()}
              className="rounded-md border shadow-md"
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
               <Construction className="h-6 w-6 text-accent" />
              Daily Details (Coming Soon)
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-muted-foreground">
              This section will display detailed information for the selected date, including:
            </p>
            <ul className="list-disc list-inside text-left text-muted-foreground text-sm">
              <li>Lunar Date & Solar Terms</li>
              <li>Heavenly Stems & Earthly Branches (干支)</li>
              <li>Daily Suitable/Unsuitable Activities (宜忌)</li>
              <li>Auspicious Times & Directions</li>
            </ul>
             <div className="relative w-full max-w-xs mx-auto aspect-[4/3]">
              <Image 
                src="https://placehold.co/400x300.png" 
                alt="Calendar Details Placeholder" 
                layout="fill" 
                objectFit="contain" 
                data-ai-hint="chinese almanac"
                className="rounded-md"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
