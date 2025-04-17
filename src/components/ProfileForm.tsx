import { useForm } from "react-hook-form";
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
    name: z.string().min(2),
    bio: z.string().max(160).optional(),
    website: z.string().url().optional(),
    location: z.string().optional(),
    birth: z.object({
        day: z.string(),
        month: z.string(),
        year: z.string(),
    }),
});

type FormData = z.infer<typeof formSchema>;

export default function ProfileForm() {
    const [avatar, setAvatar] = useState<string | null>(null);
    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            bio: "",
            website: "",
            location: "",
            birth: { day: "", month: "", year: "" },
        },
    });

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setAvatar(url);
        }
    };

    return (
        <div className="max-w-xl mx-auto mt-8 p-6 bg-white rounded-lg shadow">
            <h2 className="text-xl font-bold mb-6">Edit Profile</h2>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit((data) => console.log(data))}
                    className="space-y-4"
                >
                    {/* Avatar Upload */}
                    <div className="flex flex-col items-center">
                        <label htmlFor="avatar" className="cursor-pointer">
                            <img
                                src={
                                    avatar || "https://i.pravatar.cc/150?img=8"
                                }
                                className="w-24 h-24 rounded-full object-cover mb-2"
                                alt="avatar"
                            />
                        </label>
                        <input
                            id="avatar"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleAvatarChange}
                        />
                    </div>

                    {/* Name */}
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Your name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Bio */}
                    <FormField
                        control={form.control}
                        name="bio"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Bio</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Short bio..."
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Location */}
                    <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Location</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="City, Country"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Website */}
                    <FormField
                        control={form.control}
                        name="website"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Website</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="https://example.com"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Birthday */}
                    <div className="flex gap-2">
                        <FormField
                            control={form.control}
                            name="birth.month"
                            render={({ field }) => (
                                <FormItem className="w-1/3">
                                    <FormLabel>Month</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Month" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {[
                                                "January",
                                                "February",
                                                "March",
                                                "April",
                                                "May",
                                                "June",
                                                "July",
                                                "August",
                                                "September",
                                                "October",
                                                "November",
                                                "December",
                                            ].map((m) => (
                                                <SelectItem key={m} value={m}>
                                                    {m}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="birth.day"
                            render={({ field }) => (
                                <FormItem className="w-1/3">
                                    <FormLabel>Day</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Day" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {Array.from(
                                                { length: 31 },
                                                (_, i) => i + 1
                                            ).map((d) => (
                                                <SelectItem
                                                    key={d}
                                                    value={d.toString()}
                                                >
                                                    {d}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="birth.year"
                            render={({ field }) => (
                                <FormItem className="w-1/3">
                                    <FormLabel>Year</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Year" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {Array.from(
                                                { length: 100 },
                                                (_, i) => 2024 - i
                                            ).map((y) => (
                                                <SelectItem
                                                    key={y}
                                                    value={y.toString()}
                                                >
                                                    {y}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <Button type="submit" className="w-full mt-4">
                        Save
                    </Button>
                </form>
            </Form>
        </div>
    );
}
