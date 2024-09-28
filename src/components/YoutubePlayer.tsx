export default function YoutubePlayer({ videoId }: { videoId: string }) {
  return (
    <>
      <iframe
        className="w-full aspect-video"
        width="100%"
        height="100%"
        src={`https://www.youtube.com/embed/${videoId}?controls=1&autoplay=0&mute=1&loop=1`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </>
  );
}
