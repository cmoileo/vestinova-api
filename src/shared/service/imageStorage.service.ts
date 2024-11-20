import { createClient, SupabaseClient } from "@supabase/supabase-js";
import {uuid} from "uuidv4";

export class ImageStorageService {
    private supabase: SupabaseClient;
    private static bucketName = 'images';

    constructor() {
        if (!process.env.SUPABASE_URL || !process.env.SUPABASE_API_KEY) {
            throw new Error('Supabase credentials not found');
        }
        this.supabase = createClient(
            process.env.SUPABASE_URL,
            process.env.SUPABASE_API_KEY,
        );
    }

    public async uploadImage(file: any): Promise<string> {
        const id = uuid();
        const path = `./${file.originalname + id}`;
        const { data, error } = await this.supabase.storage
            .from(ImageStorageService.bucketName)
            .upload(path, file.buffer);
        if (error) {
            throw error;
        }
        return data.fullPath;
    }

    public async getImageUrl(id: string, fileName: string): Promise<string> {
        const path = `${id}/${fileName}`;
        // @ts-ignore
        const { publicURL, error } = this.supabase.storage.from(ImageStorageService.bucketName).getPublicUrl(path);
        if (error) {
            throw error;
        }
        return publicURL;
    }

    public async deleteImage(id: string, fileName: string): Promise<void> {
        const path = `${id}/${fileName}`;
        const { error } = await this.supabase.storage.from(ImageStorageService.bucketName).remove([path]);
        if (error) {
            throw error;
        }
    }
}