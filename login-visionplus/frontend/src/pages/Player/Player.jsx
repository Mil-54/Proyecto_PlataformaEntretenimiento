import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import VideoPlayer from '../../components/VideoPlayer/VideoPlayer';

import API_URL from '../../config';

const Player = () => {
    const [videoData, setVideoData] = useState(null);
    const { videoId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchVideoData = async () => {
            if (!videoId) return;

            try {
                const response = await fetch(`${API_URL}/videos/${videoId}/stream`);
                if (!response.ok) throw new Error('Error loading video');

                const data = await response.json();

                if (data.type === 'bunny') {
                    setVideoData({
                        id: data.videoId,
                        libraryId: data.libraryId,
                        title: data.title || "Película",
                        type: 'bunny'
                    });
                } else {
                    // Demo / MP4 fallback
                    setVideoData({
                        id: data.url, // URL directa para el VideoPlayer
                        libraryId: null,
                        title: data.title || "Video",
                        type: 'mp4'
                    });
                }
            } catch (error) {
                console.error("Error fetching video:", error);
                // Fallback básico si falla el backend
                if (["550", "680"].includes(videoId)) {
                    setVideoData({
                        id: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
                        libraryId: null,
                        title: "Demo Fallback",
                        type: 'mp4'
                    });
                }
            }
        };

        fetchVideoData();
    }, [videoId]);

    if (!videoId) {
        return <div className="text-white text-center mt-20">Video no encontrado.</div>;
    }

    return (
        <div className="min-h-screen bg-black text-white flex flex-col">
            {/* Botón de regreso simple */}
            <div className="p-4">
                <button
                    onClick={() => navigate(-1)}
                    className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition duration-200 flex items-center gap-2"
                >
                    <span>←</span> Volver
                </button>
            </div>

            <div className="flex-grow flex flex-col justify-center px-4">
                {videoData && (
                    <VideoPlayer
                        videoId={videoData.id}
                        libraryId={videoData.libraryId}
                        title={videoData.title}
                    />
                )}

                <div className="max-w-5xl mx-auto w-full mt-4 text-gray-400 text-sm p-2 bg-gray-900 rounded bg-opacity-50">
                    <p className="text-center">Powered by Bunny.net Stream & VisionPlus</p>
                </div>
            </div>
        </div>
    );
};

export default Player;
