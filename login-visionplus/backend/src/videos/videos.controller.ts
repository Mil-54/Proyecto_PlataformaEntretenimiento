import { Controller, Get, Param, UseGuards, Post, Body, Headers, HttpException, HttpStatus } from '@nestjs/common';
import { VideosService } from './videos.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('videos')
export class VideosController {
    constructor(private videosService: VideosService) { }

    @Get(':id/stream')
    @UseGuards(JwtAuthGuard)
    async getStream(@Param('id') id: string) {
        const videoData = await this.videosService.getVideoUrl(parseInt(id));
        return {
            movieId: parseInt(id),
            ...videoData
        };
    }

    @Post('map')
    async mapVideo(
        @Body() body: { tmdbId: number; bunnyVideoId: string; title: string; libraryId?: string },
        @Headers('x-admin-secret') secret: string
    ) {
        const ADMIN_SECRET = process.env.ADMIN_SECRET || 'visionplus_admin';

        if (secret !== ADMIN_SECRET) {
            console.log(`❌ Unauthorized Admin Access Attempt with secret: ${secret}`);
            throw new HttpException('Unauthorized: Invalid Admin Secret', HttpStatus.FORBIDDEN);
        }

        console.log(`✅ Admin Access Granted for movie: ${body.title}`);
        return this.videosService.createVideoMapping(
            body.tmdbId,
            body.bunnyVideoId,
            body.title,
            body.libraryId
        );
    }

    @Get('demos')
    @UseGuards(JwtAuthGuard)
    getDemos() {
        return this.videosService.getAllDemoVideos();
    }
}
