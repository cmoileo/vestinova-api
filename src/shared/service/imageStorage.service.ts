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
        const id = uuid();
        console.log("file : ", file)
        const { data, error } = await this.supabase.storage
            .from(ImageStorageService.bucketName)
            .upload(id, file.buffer);
        if (error) {
            console.log(error);
            throw error;
        }
        return data.id;
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