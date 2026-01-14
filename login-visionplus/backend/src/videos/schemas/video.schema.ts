import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type VideoDocument = Video & Document;

@Schema()
export class Video {
    @Prop({ required: true, unique: true })
    tmdbId: number; // ID de la película en TMDB (ej: 550 para Fight Club)

    @Prop({ required: true })
    bunnyVideoId: string; // ID del video en Bunny.net Stream

    @Prop({ required: true })
    libraryId: string; // Library ID de Bunny.net (generalmente 579059)

    @Prop()
    title: string; // Título referencia (opcional)
}

export const VideoSchema = SchemaFactory.createForClass(Video);
