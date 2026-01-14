import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Video, VideoDocument } from './schemas/video.schema';

@Injectable()
export class VideosService {
    constructor(@InjectModel(Video.name) private videoModel: Model<VideoDocument>) { }

    // Videos de demostración gratuitos como fallback
    private demoVideos = {
        550: { // Fight Club
            url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            title: 'Big Buck Bunny (Demo)',
            type: 'mp4'
        },
        680: { // Pulp Fiction
            url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
            title: 'Elephants Dream (Demo)',
            type: 'mp4'
        },
        278: { // Shawshank Redemption
            url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
            title: 'Sintel (Demo)',
            type: 'mp4'
        },
        default: {
            url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
            title: 'Sintel (Default)',
            type: 'mp4'
        }
    };

    /**
     * Obtiene la URL o configuración del video.
     * 1. Busca en MongoDB si hay un video real mapeado.
     * 2. Si no, busca en la lista de demos.
     * 3. Si no, devuelve el demo por defecto.
     */
    async getVideoUrl(movieId: number) {
        // 1. Buscar en BD
        const video = await this.videoModel.findOne({ tmdbId: movieId }).exec();

        if (video) {
            console.log(`🎥 Found real video for ${movieId}: ${video.title}`);
            return {
                type: 'bunny',
                videoId: video.bunnyVideoId,
                libraryId: video.libraryId,
                title: video.title
            };
        }

        // 2. Buscar en Demos
        const demo = this.demoVideos[movieId];
        if (demo) {
            console.log(`🎥 Using demo video for ${movieId}`);
            return demo;
        }

        // 3. Fallback
        return this.demoVideos.default;
    }

    async createVideoMapping(tmdbId: number, bunnyVideoId: string, title: string, libraryId: string = "579059") {
        const existing = await this.videoModel.findOne({ tmdbId });
        if (existing) {
            existing.bunnyVideoId = bunnyVideoId;
            existing.title = title;
            existing.libraryId = libraryId;
            return existing.save();
        }

        const newVideo = new this.videoModel({
            tmdbId,
            bunnyVideoId,
            title,
            libraryId
        });
        return newVideo.save();
    }

    getAllDemoVideos() {
        return this.demoVideos;
    }
}
