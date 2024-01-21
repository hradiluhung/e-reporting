"use client"
import { useRef, useState, useEffect } from "react"

export default function VideoPreview() {
  const [file, setFile] = useState<File | null>(null) // The file state is either a File object or null
  const [videoSrc, setVideoSrc] = useState<string | null>(null) // The videoSrc state is either a string or null
  const videoRef = useRef<HTMLVideoElement | null>(null) // The videoRef is either a HTMLVideoElement or null

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null
    setFile(file)
  }

  // Use useEffect hook to update the videoSrc when the file state changes
  useEffect(() => {
    if (file) {
      setVideoSrc(URL.createObjectURL(file))
    } else {
      setVideoSrc(null)
    }
  }, [file])

  const handleVideoLoad = () => {
    if (videoRef.current) {
      videoRef.current.load()
      videoRef.current.play()
    }
  }

  return (
    <div>
      <input type="file" accept="video/*" onChange={handleFileChange} />
      {videoSrc && (
        <video ref={videoRef} onLoadedData={handleVideoLoad} controls>
          {file && <source src={URL.createObjectURL(file)} type={file.type} />}
        </video>
      )}
    </div>
  )
}
