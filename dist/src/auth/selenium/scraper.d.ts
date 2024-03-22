type ProfileData = {
    name: string;
    avatar: string;
};
export declare function scrapeProfile(url: string): Promise<ProfileData>;
export {};
