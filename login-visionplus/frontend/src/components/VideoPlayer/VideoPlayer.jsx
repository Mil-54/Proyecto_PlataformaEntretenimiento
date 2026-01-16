import React from 'react';
import Hls from 'hls.js';

const VideoPlayer = ({ videoId, libraryId, title, className }) => {
    // Construir la URL del embed de Bunny.net.
    // Nota: libraryId suele ser necesario si no es parte de la URL por defecto, 
    // pero la estructura básica es: https://iframe.mediadelivery.net/embed/{libraryId}/{videoId}
    // Permitimos pasar libraryId como prop para flexibilidad, o usar uno por defecto si se tiene.

    // Si no se pasa libraryId, asumimos que el usuario lo configurará o lo pasará.
    // Por ahora usaremos un placeholder o props obligatorias.

    // Check if videoId is a direct URL (for demo purposes)
    const isDirectUrl = videoId && (videoId.includes('http') || videoId.includes('.mp4'));

    if (!videoId) {
        return <div className="text-white p-4">Error: Faltan datos del video</div>;
    }



    // HLS Logic
    const isHls = videoId && videoId.includes('.m3u8');
    const videoRef = React.useRef(null);

    React.useEffect(() => {
        if (isHls && videoRef.current) {
            // Importar Hls dinámicamente si es posible, o usar el global si se importó arriba.
            // Asumiremos que Hls está importado.
            if (Hls.isSupported()) {
                const hls = new Hls();
                hls.loadSource(videoId);
                hls.attachMedia(videoRef.current);
                hls.on(Hls.Events.MANIFEST_PARSED, () => {
                    videoRef.current.play().catch(e => console.log("Autoplay prevented", e));
                });
                return () => {
                    hls.destroy();
                };
            } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
                // Safari nativo
                videoRef.current.src = videoId;
                videoRef.current.addEventListener('loadedmetadata', () => {
                    videoRef.current.play();
                });
            }
        }
    }, [videoId, isHls]);

    if (isDirectUrl || isHls) {
        return (
            <div className={`relative w-full h-full bg-black group ${className || ''}`}>
                {title && (
                    <div className="absolute top-0 left-0 w-full p-6 bg-gradient-to-b from-black/80 to-transparent z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                        <h2 className="text-3xl text-white font-bold">{title}</h2>
                    </div>
                )}
                <div className="w-full h-full relative">
                    <video
                        ref={videoRef}
                        src={!isHls ? videoId : undefined}
                        controls
                        autoPlay
                        className="w-full h-full object-cover"
                    >
                        Tu navegador no soporta el elemento de video.
                    </video>
                </div>
            </div>
        );
    }

    if (!libraryId) {
        return <div className="text-white p-4">Error: Falta Library ID para Bunny.net</div>;
    }

    const embedUrl = `https://iframe.mediadelivery.net/embed/${libraryId}/${videoId}?autoplay=true&loop=false&muted=false&preload=true`;

    return (
        <div className={`relative w-full h-full bg-black group ${className || ''}`}>
            {/* Title Overlay (Fade on hover) */}
            {title && (
                <div className="absolute top-0 left-0 w-full p-6 bg-gradient-to-b from-black/80 to-transparent z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <h2 className="text-3xl text-white font-bold">{title}</h2>
                </div>
            )}

            {/* Iframe Container - Full Screen logic */}
            <div className="w-full h-full relative">
                <iframe
                    src={embedUrl}
                    loading="lazy"
                    className="w-full h-full border-0 absolute inset-0"
                    allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
                    allowFullScreen={true}
                    title={title || "Video Player"}
                ></iframe>
            </div>
        </div>
    );
};

export default VideoPlayer;
