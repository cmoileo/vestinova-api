import { createClient, SupabaseClient } from "@supabase/supabase-js";
import {uuid} from "uuidv4";
import {extname} from "path";

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
        const { data, error } = await this.supabase.storage
            .from(ImageStorageService.bucketName)
            .upload(`./${Date.now()}_${file.originalname}`, file.buffer, { contentType: file.mimetype });
        if (error) {
            console.log(error);
            throw error;
        }
        return data;
    }

    public async getImageUrl(path: string): Promise<string> {
        const data: any = await this.supabase.storage.from(ImageStorageService.bucketName).getPublicUrl(path);

        return data.data.publicUrl as string;
    }

    public async deleteImage(id: string, fileName: string): Promise<void> {
        const path = `${id}/${fileName}`;
        const { error } = await this.supabase.storage.from(ImageStorageService.bucketName).remove([path]);
        if (error) {
            throw error;
        }
    }
}